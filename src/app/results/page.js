'use client'
import { Suspense } from 'react'
import ResultsPageContent from './ResultsPageContent'

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ResultsPageContent />
    </Suspense>
  )
}
