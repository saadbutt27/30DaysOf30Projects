"use client";

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Draggable from "react-draggable"
import html2canvas from "html2canvas"
import ClipLoader from "react-spinners/ClipLoader";

type Meme = {
    id: string,
    name: string,
    url: string,
}

type Position = {
    x: number,
    y:number,
}

export default function MemeGenerator() {
    const [memes, setMemes] = useState<Meme[]>([])
    const [visibleMemes, setVisibleMemes] = useState<Meme[]>([])
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
    const [text, setText] = useState<string>("")
    const [textPosition, setTextPosition] = useState<Position>({ x: 0, y: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const memeRef = useRef<HTMLDivElement>(null);
    const memesPerLoad = 4;

    useEffect(() => {
        const fetchMemes = async () => {
            setLoading(true)
            const response = await fetch("https://api.imgflip.com/get_memes")
            const data = await response.json()
            setMemes(data.data.memes)
            setVisibleMemes(data.data.memes.slice(0, memesPerLoad))
            setLoading(false)
        }
        fetchMemes()
    }, [])

    const loadMoreMemes = (): void => {
        setMoreLoading(true)
        const newVisibleMemes = memes.slice(0, visibleMemes.length + memesPerLoad);
        setVisibleMemes(newVisibleMemes)
        setMoreLoading(false)
    }

    const handleDownload = async (): Promise<void> => {
        if (memeRef.current) {
            const canvas = await html2canvas(memeRef.current)
            const link = document.createElement("a")
            link.href = canvas.toDataURL("image/png")
            link.download = "meme.png"
            link.click()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Meme Generator
                        </h1>
                        <p className="text-muted-foreground">
                            Create custom memes with our easy-to-use generator.
                        </p>
                    </div>
                    {loading ? (
                        <ClipLoader className="w-12 h-12 text-blue-500"/>
                    ): (
                        <>
                            <div className="w-full overflow-x-scroll whitespace-nowrap py-2">
                                {visibleMemes.map((meme) => (
                                    <Card
                                        key={meme.id}
                                        className="inline-block bg-muted rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 mx-2"
                                        onClick={() => setSelectedMeme(meme)}
                                    >
                                        <Image
                                            src={meme.url}
                                            alt={meme.name}
                                            width={300}
                                            height={300}
                                            className="object-cover w-full h-full"
                                        />
                                        <CardContent>
                                            <p className="text-center">{meme.name}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            {visibleMemes.length < memes.length && (
                                <Button
                                    onClick={loadMoreMemes}
                                    className="mt-4"
                                    disabled={moreLoading}
                              >
                                    {moreLoading ? (
                                        <ClipLoader className="w-6 h-6 text-white" />
                                        ) : (
                                        "Load More"
                                    )}
                              </Button>
                            )}
                        </>
                    )}
                    {selectedMeme && (
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Customize Your Meme</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    ref={memeRef}
                                    className="relative bg-muted rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={selectedMeme.url}
                                        alt={selectedMeme.name}
                                        width={300}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                    <Draggable
                                        position={textPosition}
                                        onStop={(_, data) => {
                                            setTextPosition({ x: data.x, y: data.y})
                                        }}
                                    >
                                        <div 
                                            className="absolute text-black text-xl font-bold"
                                            style={{ left: textPosition.x, top: textPosition.y }}
                                        >
                                            {text}
                                        </div>
                                    </Draggable>
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="meme-text">Add your text</Label>
                                    <Textarea
                                        id="meme-text"
                                        placeholder="Enter your meme text"
                                        className="mt-1 w-full"
                                        rows={3}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <Button className="w-full mt-4" onClick={handleDownload}>
                                        Download Meme
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
