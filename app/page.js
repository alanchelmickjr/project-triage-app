'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'project-triage-data'

export default function ProjectTriage() {
  const [projects, setProjects] = useState([])
  const [showScoring, setShowScoring] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [energyData, setEnergyData] = useState(null)
  const [showEnergyBanner, setShowEnergyBanner] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setProjects(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved projects')
      }
    }
    setLoaded(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (loaded && projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }
  }, [projects, loaded])

  // Fetch energy data on mount and periodically
  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const res = await fetch('/api/tasks/energy')
        const data = await res.json()
        setEnergyData(data)
      } catch (e) {
        console.error('Failed to fetch energy data')
      }
    }
    fetchEnergy()
    const interval = setInterval(fetchEnergy, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const calculateScore = (p) => {
    return ((p.impact * 2) + (p.excitement * 1.5) + (p.revenue * 1.5) + ((10 - p.effort) * 1)) / 6
  }

  const addProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, {
        id: Date.now(),
        name: newProjectName,
        description: '',
        completion: 0,
        impact: 5,
        effort: 5,
        revenue: 5,
        excitement: 5,
        bucket: 'unsorted'
      }])
      setNewProjectName('')
    }
  }

  const updateProject = (id, field, value) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const deleteProject = (id) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const moveToBucket = (id, bucket) => {
    const focusCount = projects.filter(p => p.bucket === 'focus').length
    if (bucket === 'focus' && focusCount >= 3 && projects.find(p => p.id === id)?.bucket !== 'focus') {
      alert('⚠️ Max 3 projects in FOCUS. Move something out first. You are one human.')
      return
    }
    updateProject(id, 'bucket', bucket)
  }

  const autoSort = () => {
    const sorted = [...projects]
      .filter(p => p.name.trim())
      .sort((a, b) => calculateScore(b) - calculateScore(a))

    const updated = sorted.map((p, i) => ({
      ...p,
      bucket: i < 3 ? 'focus' : i < 6 ? 'next' : 'parking'
    }))

    setProjects(updated)
  }

  const energySort = async () => {
    try {
      const res = await fetch('/api/tasks/energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: projects, action: 'sort' })
      })
      const data = await res.json()
      if (data.tasks) {
        // Map back to original structure without extra energy fields
        const updated = data.tasks.map(t => ({
          id: t.id,
          name: t.name,
          description: t.description,
          completion: t.completion,
          impact: t.impact,
          effort: t.effort,
          revenue: t.revenue,
          excitement: t.excitement,
          bucket: t.bucket
        }))
        setProjects(updated)
        setEnergyData(prev => ({
          ...prev,
          currentEnergy: data.currentEnergy,
          energyLevel: data.energyLevel,
          suggestion: data.suggestion
        }))
      }
    } catch (e) {
      console.error('Energy sort failed:', e)
      // Fall back to regular sort
      autoSort()
    }
  }

  const exportData = () => {
    const data = JSON.stringify(projects, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project-triage-backup.json'
    a.click()
  }

  const clearAll = () => {
    if (confirm('Clear ALL projects? This cannot be undone.')) {
      setProjects([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const getBucketProjects = (bucket) => projects.filter(p => p.bucket === bucket && p.name.trim())
  const unsortedProjects = projects.filter(p => p.bucket === 'unsorted' && p.name.trim())

  const bucketColors = {
    focus: 'bg-emerald-900/50 border-emerald-500',
    next: 'bg-amber-900/50 border-amber-500',
    parking: 'bg-slate-800/50 border-slate-500'
  }

  const totalLoad = getBucketProjects('focus').length * 40 + getBucketProjects('next').length * 15
  const loadStatus = totalLoad > 100 ? 'OVERLOAD 🔥' : totalLoad > 80 ? 'Heavy' : totalLoad > 50 ? 'Sustainable' : 'Light'
  const loadColor = totalLoad > 100 ? 'text-red-400' : totalLoad > 80 ? 'text-amber-400' : 'text-emerald-400'

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">TaskForge Triage</h1>
          <p className="text-slate-400 text-sm md:text-base">Forge your focus. Energy-aware task management.</p>
        </div>

        {/* Bandwidth Meter */}
        <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Mental Bandwidth</span>
            <span className={`font-bold ${loadColor}`}>{loadStatus} ({totalLoad}%)</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${totalLoad > 100 ? 'bg-red-500' : totalLoad > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(totalLoad, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Focus = 40% each | Next Up = 15% each | Parking = 0%</p>
        </div>

        {/* Energy Suggestion Banner */}
        {energyData && showEnergyBanner && (
          <div className={`mb-6 p-4 rounded-lg border ${
            energyData.energyLevel === 'peak'
              ? 'bg-emerald-900/30 border-emerald-600'
              : energyData.energyLevel === 'moderate'
                ? 'bg-amber-900/30 border-amber-600'
                : 'bg-blue-900/30 border-blue-600'
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${
                  energyData.energyLevel === 'peak'
                    ? 'animate-pulse'
                    : ''
                }`}>
                  {energyData.energyLevel === 'peak' ? '⚡' : energyData.energyLevel === 'moderate' ? '🔋' : '🌙'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      energyData.energyLevel === 'peak'
                        ? 'text-emerald-400'
                        : energyData.energyLevel === 'moderate'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                    }`}>
                      {energyData.energyLevel === 'peak' ? 'Peak Energy' : energyData.energyLevel === 'moderate' ? 'Moderate Energy' : 'Low Energy'}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({Math.round(energyData.currentEnergy * 100)}%)
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{energyData.suggestion}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEnergyBanner(false)}
                className="text-slate-500 hover:text-slate-300 text-lg leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Add Project */}
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Add a project..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addProject()}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <div className="flex gap-2">
            <button
              onClick={addProject}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition flex-1 sm:flex-none"
            >
              + Add
            </button>
            <button
              onClick={() => setShowScoring(!showScoring)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition"
            >
              {showScoring ? '−' : '+'} Score
            </button>
            <button
              onClick={autoSort}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition"
            >
              ✨ Sort
            </button>
            <button
              onClick={energySort}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-lg font-medium transition"
              title="Sort tasks based on your current energy level"
            >
              ⚡ Energy
            </button>
          </div>
        </div>

        {/* Unsorted Projects */}
        {unsortedProjects.length > 0 && (
          <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-600">
            <h2 className="text-lg font-semibold mb-3 text-slate-300">📥 Unsorted ({unsortedProjects.length})</h2>
            <div className="space-y-2">
              {unsortedProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  showScoring={showScoring}
                  calculateScore={calculateScore}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  moveToBucket={moveToBucket}
                />
              ))}
            </div>
          </div>
        )}

        {/* Buckets */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* FOCUS */}
          <div className={`p-4 rounded-lg border-2 ${bucketColors.focus}`}>
            <h2 className="text-lg font-bold mb-1 text-emerald-400">🎯 FOCUS NOW</h2>
            <p className="text-xs text-emerald-300/70 mb-3">Max 3. These get finished.</p>
            <div className="space-y-2 min-h-24">
              {getBucketProjects('focus').map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  showScoring={showScoring}
                  calculateScore={calculateScore}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  moveToBucket={moveToBucket}
                  compact
                />
              ))}
              {getBucketProjects('focus').length === 0 && (
                <p className="text-slate-500 text-sm italic">Add projects above...</p>
              )}
            </div>
          </div>

          {/* NEXT UP */}
          <div className={`p-4 rounded-lg border-2 ${bucketColors.next}`}>
            <h2 className="text-lg font-bold mb-1 text-amber-400">⏳ NEXT UP</h2>
            <p className="text-xs text-amber-300/70 mb-3">On deck. Light maintenance only.</p>
            <div className="space-y-2 min-h-24">
              {getBucketProjects('next').map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  showScoring={showScoring}
                  calculateScore={calculateScore}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  moveToBucket={moveToBucket}
                  compact
                />
              ))}
              {getBucketProjects('next').length === 0 && (
                <p className="text-slate-500 text-sm italic">Overflow goes here...</p>
              )}
            </div>
          </div>

          {/* PARKING LOT */}
          <div className={`p-4 rounded-lg border-2 ${bucketColors.parking}`}>
            <h2 className="text-lg font-bold mb-1 text-slate-400">🅿️ PARKING LOT</h2>
            <p className="text-xs text-slate-400/70 mb-3">Good ideas. Not now. No guilt.</p>
            <div className="space-y-2 min-h-24">
              {getBucketProjects('parking').map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  showScoring={showScoring}
                  calculateScore={calculateScore}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  moveToBucket={moveToBucket}
                  compact
                />
              ))}
              {getBucketProjects('parking').length === 0 && (
                <p className="text-slate-500 text-sm italic">Park ideas here...</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {getBucketProjects('focus').length > 0 && (
          <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-emerald-700">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">📋 Your Focus Plan</h2>
            <div className="space-y-3">
              {getBucketProjects('focus').map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-emerald-500">#{i + 1}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-xs">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${p.completion}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400">{p.completion}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                <strong className="text-white">Rule:</strong> No new projects enter FOCUS until one ships. 
                You&apos;re not slow — you&apos;re parallel processing 12 threads on a 3-thread brain.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center text-sm">
          <button
            onClick={exportData}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 transition"
          >
            📤 Export JSON
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 bg-slate-800 hover:bg-red-900 rounded text-slate-400 hover:text-red-400 transition"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Credit */}
        <p className="text-center text-slate-600 text-xs mt-8">
          TaskForge Triage — Energy-aware productivity for focused founders
        </p>
      </div>
    </div>
  )
}

function ProjectCard({ project, showScoring, calculateScore, updateProject, deleteProject, moveToBucket, compact }) {
  const score = calculateScore(project)
  
  return (
    <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={project.name}
            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
            className="w-full bg-transparent font-medium focus:outline-none truncate"
            placeholder="Project name..."
          />
          {!compact && (
            <input
              type="text"
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              className="w-full bg-transparent text-sm text-slate-400 focus:outline-none mt-1"
              placeholder="Brief description..."
            />
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs px-2 py-1 bg-slate-700 rounded" title="Priority Score">
            {score.toFixed(1)}
          </span>
          <button
            onClick={() => deleteProject(project.id)}
            className="text-slate-500 hover:text-red-400 px-1 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {/* Completion */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-slate-500 w-10">{project.completion}%</span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={project.completion}
          onChange={(e) => updateProject(project.id, 'completion', parseInt(e.target.value))}
          className="flex-1"
        />
      </div>

      {/* Scoring Sliders */}
      {showScoring && (
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          {[
            { key: 'impact', label: '💥 Impact', color: 'text-blue-400' },
            { key: 'effort', label: '😅 Effort', color: 'text-red-400' },
            { key: 'revenue', label: '💰 Revenue', color: 'text-green-400' },
            { key: 'excitement', label: '🔥 Excite', color: 'text-orange-400' },
          ].map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`${color} w-16 truncate`}>{label}</span>
              <input
                type="range"
                min="1"
                max="10"
                value={project[key]}
                onChange={(e) => updateProject(project.id, key, parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="w-4 text-right text-slate-400">{project[key]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bucket Buttons */}
      <div className="mt-2 flex gap-1">
        <button
          onClick={() => moveToBucket(project.id, 'focus')}
          className={`text-xs px-2 py-1 rounded transition ${project.bucket === 'focus' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-emerald-800 text-slate-300'}`}
        >
          🎯
        </button>
        <button
          onClick={() => moveToBucket(project.id, 'next')}
          className={`text-xs px-2 py-1 rounded transition ${project.bucket === 'next' ? 'bg-amber-600 text-white' : 'bg-slate-700 hover:bg-amber-800 text-slate-300'}`}
        >
          ⏳
        </button>
        <button
          onClick={() => moveToBucket(project.id, 'parking')}
          className={`text-xs px-2 py-1 rounded transition ${project.bucket === 'parking' ? 'bg-slate-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
        >
          🅿️
        </button>
      </div>
    </div>
  )
}
