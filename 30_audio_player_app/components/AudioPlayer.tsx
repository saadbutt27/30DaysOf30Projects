"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ForwardIcon,
  PlayIcon,
  RewindIcon,
  UploadIcon,
  PauseIcon,
} from "lucide-react"
import Image from "next/image"

interface AudioPlayerComponentProps {}

interface Track {
  title: string,
  artist: string, 
  src: string,
}


export default function AudioFile<AudioPlayerComponentProps>() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrackIndex, setcurrentTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newTracks: Track[] = Array.from(files).map((file) => ({
        title: file.name,
        artist: "Unknown Artist",
        src: URL.createObjectURL(file)
      }))
      setTracks((prevTracks) => [...prevTracks, ...newTracks])
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  const handleNextTrack = () => {
    setcurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length)
  }
  const handlePrevTrack = () => {
    setcurrentTrackIndex((prevIndex) => 
      prevIndex == 0 ? tracks.length - 1 : prevIndex - 1 
    )
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = tracks[currentTrackIndex]?.src || ""
      audioRef.current.load()
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setProgress(0)
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrackIndex, tracks, isPlaying])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Audio Player</h1>
          <label className="flex items-center cursor-pointer">
            <UploadIcon className="w-5 h-5 mr-2"/>
            <span>Upload</span>
            <input 
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <Image 
              src="/music.svg"
              alt="Album Cover"
              width={100}
              height={100}
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">
                {tracks[currentTrackIndex]?.title || "Audio Title"}
              </h2>
              <p className="ext-muted-foreground">
                {tracks[currentTrackIndex]?.artist || "Artist Name"}
              </p>
            </div>
            <div className="w-full">
              <Progress value={progress}/>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevTrack}
              >
                <RewindIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
              >
                {isPlaying ? 
                  <PauseIcon className="w-6 h-6"/> 
                :
                  <PlayIcon className="w-6 h-6"/>
                }
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextTrack}
              >
                <ForwardIcon className="w-6 h-6"/>
              </Button>
            </div>
            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
