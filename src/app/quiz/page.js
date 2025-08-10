'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/questions'

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (option) => {
    const isCorrect = option === QUESTIONS[currentQuestion].answer
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      router.push(`/results?score=${score + (isCorrect ? 1 : 0)}`)
    }
  }

  const progressPercent = ((currentQuestion + 1) / QUESTIONS.length) * 100

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white px-4">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-red-100 rounded-full">
          <div
            className="h-2 bg-red-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <h1
        key={currentQuestion}
        className="text-3xl font-bold text-red-600 mb-4 animate-fadeIn"
      >
        Question {currentQuestion + 1}
      </h1>
      <p
        key={`q-${currentQuestion}`}
        className="text-lg text-gray-800 mb-6 text-center animate-fadeIn delay-100"
      >
        {QUESTIONS[currentQuestion].question}
      </p>

      {/* Options */}
      <div className="space-y-4 w-full max-w-md">
        {QUESTIONS[currentQuestion].options.map((option, idx) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-red-300 hover:bg-red-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
            style={{ animation: `fadeIn 0.3s ease ${idx * 0.1}s both` }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  )
}
