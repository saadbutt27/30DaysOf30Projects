"use client"

import React , { useState, ChangeEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { predefinedHtml } from "./predefinedHtml"

export default function HtmlPreviewer() {
    const [htmlCode, setHtmlCode] = useState<string>("")
    const [previewHtml, setPreviewHtml] = useState<string>("")

    const handlePreview = (): void => {
        setPreviewHtml(htmlCode)
    }
    const handlePasteHtml = (): void => {
        setHtmlCode(predefinedHtml)
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setHtmlCode(e.target.value)
    }
  return (
    <div className="flex flex-col justify-center items-center h-screen p-10 bg-background text-foreground">
        <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-card">
            <h1 className="text-2xl font-bold mb-4 text-center">HTML Previewwr</h1>
            <p className="text-muted-foreground mb-4 text-center">
                Enter your HTML code and see the preview.
            </p>
            <div className="grid gap-4">
                <Textarea 
                    value={htmlCode}
                    onChange={handleChange}
                    placeholder="Enter your HTML code here"
                    className="p-4 rounded-lg border border-input bg-background text-foreground"
                    rows={8}
                />
                <div className="flex justify-center">
                    <div className="flex gap-2">
                        <Button onClick={handlePreview}>Generate Preview</Button>
                        <Button onClick={handlePasteHtml}>Paste HTML</Button>
                    </div>
                </div>
                <div className="p-4 rounded-lg border border-input bg-background text-foreground">
                    <div dangerouslySetInnerHTML={{ __html: previewHtml }}></div>
                </div>
            </div>
        </div>
    </div>
  )
}
