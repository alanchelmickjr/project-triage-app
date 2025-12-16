import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'TaskForge Triage',
  description: 'Energy-aware task management. Forge your focus with intelligent sorting.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
