import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Project Triage 🐴',
  description: 'Wrangle your wild horses. Pick 3 to ride. Stable the rest.',
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
