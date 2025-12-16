import { NextResponse } from 'next/server'

/**
 * Energy-aware sorting algorithm for TaskForge Triage
 * Considers time of day, user energy levels, and task characteristics
 * to suggest optimal task ordering
 */

// Energy curve throughout the day (0-23 hours)
// Based on typical circadian rhythms
const ENERGY_CURVE = {
  0: 0.2, 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.15, 5: 0.3,
  6: 0.5, 7: 0.7, 8: 0.85, 9: 0.95, 10: 1.0, 11: 0.95,
  12: 0.8, 13: 0.7, 14: 0.65, 15: 0.7, 16: 0.8, 17: 0.85,
  18: 0.8, 19: 0.7, 20: 0.6, 21: 0.5, 22: 0.4, 23: 0.3
}

/**
 * Calculate energy-aware score for a task
 * High effort tasks should be done when energy is high
 * Low effort/high excitement tasks are good for low energy periods
 */
function calculateEnergyScore(task, currentEnergy) {
  const { impact, effort, revenue, excitement } = task

  // Base score (same as standard calculation)
  const baseScore = ((impact * 2) + (excitement * 1.5) + (revenue * 1.5) + ((10 - effort) * 1)) / 6

  // Energy matching factor
  // High energy + high effort = good match
  // Low energy + low effort + high excitement = good match
  const effortMatch = currentEnergy >= 0.7
    ? effort / 10  // Favor high effort when energy is high
    : (10 - effort) / 10  // Favor low effort when energy is low

  const excitementBoost = currentEnergy < 0.7
    ? (excitement / 10) * 0.3  // Excitement helps push through low energy
    : 0

  // Completion factor - nearly done tasks get priority to clear mental load
  const completionBoost = task.completion >= 80 ? 0.5 : task.completion >= 50 ? 0.2 : 0

  // Final energy-aware score
  const energyScore = baseScore * (1 + effortMatch * 0.3 + excitementBoost + completionBoost)

  return {
    ...task,
    energyScore: Math.round(energyScore * 100) / 100,
    energyMatch: effortMatch > 0.5 ? 'optimal' : 'suboptimal',
    suggestion: generateSuggestion(task, currentEnergy)
  }
}

/**
 * Generate human-readable suggestion for task
 */
function generateSuggestion(task, currentEnergy) {
  if (task.completion >= 80) {
    return 'Nearly done - finish it to free mental space!'
  }

  if (currentEnergy >= 0.8 && task.effort >= 7) {
    return 'Peak energy - tackle this challenging task now!'
  }

  if (currentEnergy >= 0.8 && task.effort < 5) {
    return 'Save for later - you can handle harder tasks right now'
  }

  if (currentEnergy < 0.5 && task.effort >= 7) {
    return 'Too demanding for current energy - defer to peak hours'
  }

  if (currentEnergy < 0.5 && task.excitement >= 7) {
    return 'Good choice - excitement will carry you through!'
  }

  if (task.impact >= 8 && task.effort <= 5) {
    return 'Quick win - high impact, low effort!'
  }

  return 'Moderate match for current energy'
}

/**
 * Sort tasks based on energy-aware algorithm
 */
function energyAwareSort(tasks, currentEnergy) {
  const scoredTasks = tasks.map(task => calculateEnergyScore(task, currentEnergy))

  return scoredTasks.sort((a, b) => b.energyScore - a.energyScore)
}

/**
 * Get current energy level based on hour
 */
function getCurrentEnergy(hour = null) {
  const currentHour = hour !== null ? hour : new Date().getHours()
  return ENERGY_CURVE[currentHour] || 0.5
}

/**
 * Find optimal time for a specific task
 */
function findOptimalTime(task) {
  let bestHour = 10
  let bestScore = 0

  for (let hour = 6; hour <= 22; hour++) {
    const energy = ENERGY_CURVE[hour]
    const scored = calculateEnergyScore(task, energy)
    if (scored.energyScore > bestScore) {
      bestScore = scored.energyScore
      bestHour = hour
    }
  }

  return {
    hour: bestHour,
    formatted: `${bestHour}:00`,
    period: bestHour < 12 ? 'morning' : bestHour < 17 ? 'afternoon' : 'evening'
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { tasks, hour, action = 'sort' } = body

    if (!tasks || !Array.isArray(tasks)) {
      return NextResponse.json(
        { error: 'Tasks array is required' },
        { status: 400 }
      )
    }

    const currentEnergy = getCurrentEnergy(hour)

    if (action === 'sort') {
      const sortedTasks = energyAwareSort(tasks, currentEnergy)

      // Assign buckets based on energy-aware sorting
      const assignedTasks = sortedTasks.map((task, index) => ({
        ...task,
        bucket: index < 3 ? 'focus' : index < 6 ? 'next' : 'parking'
      }))

      return NextResponse.json({
        tasks: assignedTasks,
        currentEnergy,
        currentHour: hour !== null ? hour : new Date().getHours(),
        energyLevel: currentEnergy >= 0.8 ? 'peak' : currentEnergy >= 0.5 ? 'moderate' : 'low',
        suggestion: currentEnergy >= 0.8
          ? 'Peak energy! Tackle your hardest tasks now.'
          : currentEnergy >= 0.5
            ? 'Moderate energy. Balance challenging and easier tasks.'
            : 'Low energy period. Focus on exciting or nearly-done tasks.'
      })
    }

    if (action === 'analyze') {
      const analyzed = tasks.map(task => ({
        ...calculateEnergyScore(task, currentEnergy),
        optimalTime: findOptimalTime(task)
      }))

      return NextResponse.json({
        tasks: analyzed,
        currentEnergy,
        energyLevel: currentEnergy >= 0.8 ? 'peak' : currentEnergy >= 0.5 ? 'moderate' : 'low'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "sort" or "analyze".' },
      { status: 400 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  const currentHour = new Date().getHours()
  const currentEnergy = getCurrentEnergy()

  return NextResponse.json({
    currentHour,
    currentEnergy,
    energyLevel: currentEnergy >= 0.8 ? 'peak' : currentEnergy >= 0.5 ? 'moderate' : 'low',
    energyCurve: ENERGY_CURVE,
    suggestion: currentEnergy >= 0.8
      ? 'Peak energy! Tackle your hardest tasks now.'
      : currentEnergy >= 0.5
        ? 'Moderate energy. Balance challenging and easier tasks.'
        : 'Low energy period. Focus on exciting or nearly-done tasks.'
  })
}
