import './globals.css'

export const metadata = {
  title: 'Project Triage 🐴',
  description: 'Wrangle wild horses. Pick 3 to ride. Park the rest.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
