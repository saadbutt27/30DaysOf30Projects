"use client"

import React, { useState, useEffect, ChangeEvent } from 'react'
import { Button }  from "@/components/ui/button"
import { Input }  from "@/components/ui/input"

interface NumberGuesstingState {
    gameStarted: boolean,
    gameOver: boolean,
    paused: boolean,
    targetNumber: number,
    userGuess: string | number,
    attempts: number,
}

export default function NumberGuessing(): JSX.Element {
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [targetNumber, setTargetNumber] = useState<number>(0)
    const [userGuess, setUserGuess]  = useState<string | number>("")
    const [attempts, setAttempts] = useState<number>(0)

    useEffect(() => {
        if (gameStarted && !paused) {
            const randomNumber: number = Math.floor(Math.random() * 10) + 1
            // console.log(randomNumber)
            setTargetNumber(randomNumber)
        }
    }, [gameStarted, paused])

    const handleStartGame = (): void => {
        setGameStarted(true)
        setGameOver(false)
        setAttempts(0)
        setPaused(false)
    }

    const handlePauseGame = (): void => {
        setPaused(true);
    };
      
    const handleResumeGame = (): void => {
        setPaused(false); 
    };

    const handleGuess = (): void => {
        if (typeof userGuess === "number" && userGuess === targetNumber) {
            setGameOver(true)
        } else {
            setAttempts(attempts + 1)
        }   
    }

    const handleTryAgain = (): void => {
        setGameStarted(false)
        setGameOver(false)
        setUserGuess("")
        setAttempts(0)
    }

    const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserGuess(parseInt(e.target.value))
    }
 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-400 to-black p-10">
        <div className="rounded-lg p-8 w-full max-w-md bg-white/50 shadow-lg backdrop-blur-md">
            <h1 className="text-3xl font-bold text-center mb-2 text-black">
                Number Guessing Game
            </h1>
            <p className="text-black text-center mb-4">
                Try to guess the number between 1 and 10!
            </p>
            {!gameStarted && 
                <div className="flex justify-center mb-4">
                    <Button 
                        onClick={handleStartGame}
                        className="bg-black hover:bg-gray-700 duration-300 text-white font-bold py-2 px-4 rounded"
                        >
                        Start Game
                    </Button>
                </div>
            }
            {gameStarted && !gameOver && 
                <div className="flex justify-center mb-4">
                    <Button
                        onClick={paused ? handleResumeGame : handlePauseGame}
                        className="bg-gray-500 hover:bg-gray-600 duration-300 text-white font-bold py-2 px-4 rounded"
                        >
                        {paused ? "Resume" : "Pause"}
                    </Button>
                </div>
            } 

            <div className="flex justify-center mb-4">
                <Input
                    type="number"
                    value={userGuess}
                    onChange={handleUserGuessChange}
                    placeholder="Enter your guess"
                    className="bg-gray-100 border border-gray-300 rounded-lg py-2  px-4 w-full max-w-xs"
                />
                <Button
                    onClick={handleGuess}
                    className="bg-gray-700 hover:bg-gray-800 duration-300 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                    Guess
                </Button>
            </div>

            <div className="text-center text-black">
                <p>Attempts: {attempts}</p>
            </div>

            {gameOver &&
                <div>
                    <div className="text-center mb-4 text-black">
                        <h2 className="text-2xl font-bold">Game Over!</h2>
                        <p>You guessed the number in {attempts} attempt{attempts === 1  ? "" : "s"}.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            onClick={handleTryAgain}
                            className="bg-red-500 hover:bg-red-600 duration-300  text-white font-bold py-2 px-4 rounded"
                            >
                            Try Again
                        </Button>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
