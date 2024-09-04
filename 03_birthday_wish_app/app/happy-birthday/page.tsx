import BirthdayWish from '@/components/BirthdayWish'
import React from 'react'
import { Suspense } from 'react'

export default function page() {
  return (
    <Suspense>
      <BirthdayWish />
    </Suspense>
  )
}
