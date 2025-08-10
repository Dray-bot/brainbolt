'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 overflow-hidden">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-red-600 tracking-tight">
          BrainBolt
        </h1>
        <p className="text-lg text-gray-700">
          Quick quizzes. Instant results.
        </p>

        <button
          onClick={() => router.push('/quiz')}
          className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-200"
        >
          Start Quiz
        </button>

        <p className="text-sm text-gray-500">
          Test your skills in seconds
        </p>
      </div>
    </div>
  )
}
