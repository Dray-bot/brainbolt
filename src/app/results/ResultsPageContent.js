'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { MessageCircle, Instagram, Link as LinkIcon } from 'lucide-react'

export default function ResultsPageContent() {
  const params = useSearchParams()
  const router = useRouter()
  const score = Number(params.get('score')) || 0
  const totalQuestions = 20

  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    // Set shareUrl only on client
    setShareUrl(window.location.href)
  }, [])

  const shareText = `I scored ${score} out of ${totalQuestions} on BrainBolt! Can you beat me?`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied! Share it anywhere.')
  }

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  const instagramProfileUrl = 'https://www.instagram.com/yourprofile' // Replace with your IG profile URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white px-6 py-10">
      <h1 className="text-5xl font-extrabold text-red-700 animate-fadeIn mb-4 drop-shadow-md">
        Your Score
      </h1>
      <p className="text-3xl font-semibold text-gray-800 mb-8 animate-slideUp">
        {score} / {totalQuestions}
      </p>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center animate-popIn">
        {score === totalQuestions ? (
          <p className="text-green-600 font-bold text-xl mb-6">Perfect Score! You crushed it 🎉</p>
        ) : score >= totalQuestions * 0.7 ? (
          <p className="text-yellow-600 font-semibold text-lg mb-6">Great job! Almost perfect 👍</p>
        ) : (
          <p className="text-red-600 font-semibold text-lg mb-6">Keep trying, you got this 💪</p>
        )}

        <button
          onClick={() => router.push('/')}
          className="w-full mb-6 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Play Again
        </button>

        <div className="flex justify-center gap-6">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="text-green-500 hover:text-green-700 transition"
          >
            <MessageCircle size={32} />
          </a>
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Instagram profile"
            className="text-pink-500 hover:text-pink-700 transition"
          >
            <Instagram size={32} />
          </a>
          <button
            onClick={handleCopyLink}
            aria-label="Copy link to clipboard"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <LinkIcon size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}
