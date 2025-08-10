'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { QUESTIONS } from '@/lib/questions'

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function QuizV2() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null))
  const [score, setScore] = useState(0)

  const [shuffledOptions, setShuffledOptions] = useState([])

  useEffect(() => {
    const shuffled = QUESTIONS.map(q => shuffleArray(q.options))
    setShuffledOptions(shuffled)
  }, [])

  const handleAnswer = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)
  }

  const calculateScore = () => {
    let total = 0
    answers.forEach((ans, i) => {
      if (ans === QUESTIONS[i].answer) total++
    })
    return total
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const totalScore = calculateScore()
    setScore(totalScore)
    router.push(`/results?score=${totalScore}`)
  }

  if (shuffledOptions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading quiz...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12 overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      key={currentQuestion}
    >
      <motion.h2
        className="text-2xl font-bold mb-4"
        key={`q-num-${currentQuestion}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Question {currentQuestion + 1} / {QUESTIONS.length}
      </motion.h2>

      <motion.p
        className="mb-6 text-gray-700"
        key={`q-text-${currentQuestion}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {QUESTIONS[currentQuestion].question}
      </motion.p>

      <div className="space-y-4 mb-6">
        <AnimatePresence mode="wait">
          {shuffledOptions[currentQuestion].map((option) => (
            <motion.button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition
                ${
                  answers[currentQuestion] === option
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-100 hover:bg-red-50 border-transparent'
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileTap="tap"
              variants={buttonVariants}
              transition={{ duration: 0.3 }}
            >
              {option}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <motion.button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`px-5 py-2 rounded-lg font-semibold transition
            ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          whileHover={currentQuestion !== 0 ? 'hover' : ''}
          whileTap={currentQuestion !== 0 ? 'tap' : ''}
          variants={buttonVariants}
        >
          Previous
        </motion.button>

        {currentQuestion === QUESTIONS.length - 1 ? (
          <motion.button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Submit
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Next
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
