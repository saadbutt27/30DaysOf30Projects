"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
    Card,
    CardHeader, CardTitle,
    CardDescription, CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import  { FaBirthdayCake, FaGift } from "react-icons/fa"
import  { GiBalloons } from "react-icons/gi"
import type ConfettiProps from 'react-confetti'
import { useSearchParams } from 'next/navigation'

type ConfettiProps = {
    width: number
    height: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']


export default function BirthdayWish() {
    const [candleList, setCandleList] = useState<number>(0)
    const [ballonsPoppedCount, setBallonsPoppedCount] = useState<number>(0)
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 })
    const [celebrating, setCelebrating] = useState<boolean>(false)

    const searchParams = useSearchParams()
 
    const name = searchParams.get('name')
    const dob = searchParams.get('dob')
    const age = searchParams.get('age')

    const totalCandles: number = 5
    const totalBalloons: number = 5

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (candleList === totalCandles && ballonsPoppedCount === totalBalloons) {
            setShowConfetti(true)
        }
    }, [candleList, ballonsPoppedCount])

    const lightCandle = (index: number) => {
        if (index == candleList) {
            setCandleList(prev => prev + 1)
        }
    }
    const popBalloon = (index: number) => {
        if (index == ballonsPoppedCount) {
            setBallonsPoppedCount(prev => prev + 1)
        }
    }

    const celebrate = () => {
        setCelebrating(true)
        setShowConfetti(true)
        document.body.style.overflow = "hidden" // Disable scrolling

        const interval = setInterval(() => {
            setCandleList(prev => {
                if (prev < totalCandles) return prev + 1
                clearInterval(interval)
                return prev
            })
        }, 500)

        const confettiDuration = 5000 // 5 seconds
        setTimeout(() => {
            setCelebrating(false)
            setShowConfetti(false)
            document.body.style.overflow = "" // ENable scrolling
        }, confettiDuration)
    }

  return (
    <div className="h-screen overflow-hidden bg-white flex justify-center items-center p-4 shadow-lg">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-black">Happy {age} Birthday!</CardTitle>
                    <CardDescription className="text-2xl font-semibold text-gray-600">{name}</CardDescription>
                    <p className="text-lg text-gray-500">{dob}</p>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
                        <div className="flex justify-center space-x-2">
                            {[...Array(totalCandles)].map((_, index) => (
                                <AnimatePresence key={index}>
                                    {(celebrating && index <= candleList) || (!celebrating && index < candleList) ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                                        >
                                            <FaBirthdayCake 
                                                className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                                                style={{ color: candleColors[index % candleColors.length] }}
                                                onClick={() => lightCandle(index)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <FaBirthdayCake 
                                            className="w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                                            onClick={() => lightCandle(index)}
                                        />
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
                        <div className="flex justify-center space-x-2">
                            {[...Array(totalBalloons)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: index < ballonsPoppedCount ? 0 : 1 }}
                                    transition={{ duration: 0.3}}
                                >
                                    <GiBalloons 
                                        className="w-8 h-8 cursor-pointer hover:scale-110"
                                        style={{ color: index < ballonsPoppedCount ? "#D1D5DB" : balloonColors[index % balloonColors.length] }}
                                        onClick={() => popBalloon(index)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button 
                        className="bg-black text-white hover:bg-gray-800 rounded-[5px] transition-all duration-300"
                        onClick={celebrate}
                        disabled={celebrating}
                    >
                        <span className="select-none">Celebrate</span> <FaGift className="w-3 h-3 ml-2"/>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
        {showConfetti && (
            <DynamicConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                colors={confettiColors}
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
            />
      )}
    </div>

  )
}
