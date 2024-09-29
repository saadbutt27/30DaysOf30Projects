"use client"

import React, { useState, ChangeEvent } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function WordCounter() {
    const [text, setText] = useState<string>("")

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    const clearText = () => {
        setText("")
    }

    const wordCount = text.trim().split(/\s+/).filter((word) => word).length
    const charCount = text.length

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-8">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center justify-center flex flex-col">
                <CardTitle className="text-2xl">Text Analysis</CardTitle>
                <CardDescription>
                    Enter text and see the word and character count.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    id="text-input"
                    placeholder="Enter your input here..."
                    className="h-32 resize-none"
                    value={text}
                    onChange={handleTextChange}
                />
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        <span id="word-count">{wordCount}</span> words,{" "}
                        <span id="word-count">{charCount}</span> characters
                    </div>
                    <Button onClick={clearText}>Clear</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
