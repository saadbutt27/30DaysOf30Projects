import BirthdayWish from '@/components/BirthdayWish'
import React from 'react'

export default function page(params: {name: string, dob: string, age: number}) {
  return (
    <BirthdayWish />
  )
}
