import './globals.css'

export const metadata = {
  title: 'BrainBolt',
  description: 'Fast quiz app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">{children}</div>
        </main>
      </body>
    </html>
  )
}
