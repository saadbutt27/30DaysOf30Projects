"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface JokeResponse {
    setup: string,
    punchline: string
}

export default function RandomJoke() {
    const [joke, setJoke] = useState<string>("")
    const [type, setType] = useState<string>("general")

    useEffect(() => {
        fetchJoke()
    }, [])

    async function fetchJoke():Promise<void> {
        try {
            const fetchURL = `https://official-joke-api.appspot.com/jokes${type !== "" ? `/${type}` : ""}/random`
            // console.log(fetchURL)
            const response = await fetch(fetchURL)
            const data:JokeResponse[] = await response.json()
            // console.log(data)
            setJoke(`${data[0].setup} - ${data[0].punchline}`)
        } catch (error) {
            console.error("Error fetching joke:", error)
            setJoke("Failed to fetch a joke. Please try again.")
        }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b66] p-4">
        <div className="bg-white rounded-2xl shadown-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold  mb-4 text-[#333]">😂 Random Joke 👈</h1>
            <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
                {joke || "Loading..."}
            </div>
            <div>
            <p className="text-xl font-semibold mb-4 text-[#333]">Select Joke type 😂</p>
            <RadioGroup 
                defaultValue="general" 
                className="mb-4 flex justify-around"
                onValueChange={(value) => setType(value)}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="r1" />
                    <Label htmlFor="r1">General</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="programming" id="r2" />
                    <Label htmlFor="r2">Programming</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="knock-knock" id="r3" />
                    <Label htmlFor="r3">Konck Knock</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dad" id="r3" />
                    <Label htmlFor="r3">Dad</Label>
                </div>
                </RadioGroup>
            </div>
            <Button
                onClick={fetchJoke}
                className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
                😂 Get a New Joke 😂
            </Button>
        </div>
    </div>
  )
}
