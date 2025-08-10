'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'

export default function ResultsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const scoreParam = parseInt(params.get('score') || 0)
  const totalQuestions = 10 // Update to your quiz length

  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    // Animate score counting up
    let current = 0
    const interval = setInterval(() => {
      if (current < scoreParam) {
        current++
        setDisplayScore(current)
      } else {
        clearInterval(interval)
      }
    }, 100)

    // Confetti for high scores
    if (scoreParam >= totalQuestions * 0.7) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [scoreParam])

  const getMessage = () => {
    const ratio = scoreParam / totalQuestions
    if (ratio === 1) return 'Perfect! You nailed it!'
    if (ratio >= 0.7) return 'Great job! You did awesome!'
    if (ratio >= 0.4) return 'Not bad! Keep practicing.'
    return 'Better luck next time!'
  }

  const handleShare = (platform) => {
    const shareText = `I scored ${scoreParam}/${totalQuestions} on BrainBolt! Think you can beat me?`
    const quizLink = typeof window !== 'undefined' ? window.location.origin : ''

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${quizLink}`, '_blank')
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${quizLink}`)}`, '_blank')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${shareText} ${quizLink}`)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 animate-fadeIn">Your Score</h1>

      <p className="text-6xl font-extrabold text-gray-800 mt-4 animate-fadeIn delay-100">
        {displayScore} <span className="text-2xl text-gray-500">/ {totalQuestions}</span>
      </p>

      <p className="mt-4 text-lg text-gray-700 animate-fadeIn delay-200">{getMessage()}</p>

      <button
        onClick={() => router.push('/')}
        className="mt-8 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-transform hover:scale-105 active:scale-95 animate-fadeIn delay-300"
      >
        Play Again
      </button>

      <div className="flex gap-4 mt-6 animate-fadeIn delay-400">
        <button
          onClick={() => handleShare('twitter')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Share on X
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Share on WhatsApp
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Copy Link
        </button>
      </div>

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
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
