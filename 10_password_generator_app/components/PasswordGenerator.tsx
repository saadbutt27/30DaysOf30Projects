"use client"

import React, { useState, ChangeEvent } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function PasswordGenerator() {
    const [length, setLength] = useState<number>(16)
    const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true)
    const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true)
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
    const [password, setPassword] = useState<string>("")
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLength(Number(e.target.value))
    }

    const hnadleCheckboxChange = 
        (setter: (value:boolean) => void) => 
        (checked: CheckedState): void => {
            if (typeof checked === "boolean") {
                setter(checked)
            }
        }

    const generatePassowrd = (): void => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
        const numberChars = "0123456789"
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?"

        let allChars = ""

        if (includeUpperCase) allChars += uppercaseChars
        if (includeLowerCase) allChars += lowercaseChars
        if (includeNumbers) allChars += numberChars
        if (includeSymbols) allChars += symbolChars

        if (allChars === "") {
            alert("Please select at least one character type.")
            return
        }

        let generatedPassword = ""
        for (let i=0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length)
            generatedPassword += allChars[randomIndex]
        }
        setPassword(generatedPassword)
    }

    const copyToClipboard = (): void => {
        navigator.clipboard.writeText(password).then(
            () => {
                setShowSuccessAlert(true)    
                setTimeout(() => setShowSuccessAlert(false), 3000)
            }, (err) => {
                setShowErrorAlert(true)    
                setTimeout(() => setShowErrorAlert(false), 3000)
            }
        )
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
        <div
            className={`transition-opacity duration-500 ease-in-out absolute top-0 left-1/2 transform -translate-x-1/2 ${
                showSuccessAlert || showErrorAlert ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 10 }}
        >
            <Alert className={`shadow-lg 
                ${showSuccessAlert && "bg-green-100 border-green-300"} 
                ${showErrorAlert && "bg-red-100 border-red-300"}`}>
                <Terminal className="h-4 w-4" />
                <AlertTitle>{showSuccessAlert ? "Success!" : showErrorAlert ? "Error!": ""}</AlertTitle>
                <AlertDescription>{showSuccessAlert ? "Password copied to clipboard." : showErrorAlert ? "Password can't be copied to clipboard.": ""}</AlertDescription>
            </Alert>
        </div>
        <Card className="w-full max-w-md p-6 bg-white dark:bg-gary-800 shadow-lg rounded-lg">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-center font-bold">Password Generator</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create a secure password with just a few clicks.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="length">Password Length</Label>
                        <Input
                            id="length"
                            type="number"
                            min="8"
                            max="32"
                            value={length}
                            onChange={handleLengthChange}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Include:</Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="uppercase"
                                checked={includeUpperCase}
                                onCheckedChange={hnadleCheckboxChange(setIncludeUpperCase)}
                            />
                            <Label htmlFor="uppercase">Uppercase Letters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="lowercase"
                                checked={includeLowerCase}
                                onCheckedChange={hnadleCheckboxChange(setIncludeLowerCase)}
                            />
                            <Label htmlFor="lowercase">Lowercase Letters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="numbers"
                                checked={includeNumbers}
                                onCheckedChange={hnadleCheckboxChange(setIncludeNumbers)}
                            />
                            <Label htmlFor="numbers">Numbers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="symbols"
                                checked={includeSymbols}
                                onCheckedChange={hnadleCheckboxChange(setIncludeSymbols)}
                            />
                            <Label htmlFor="symbols">Symbols</Label>
                        </div>
                    </div>
                    <Button 
                        type="button" 
                        className="w-full"
                        onClick={generatePassowrd}
                    >   Generate Password
                    </Button>
                    <div className="space-y-2">
                        <Label htmlFor="password">Generated Password</Label>
                        <Input
                            id="password"
                            type="text"
                            value={password}
                            readOnly
                            className="flex-1"
                        />
                        <Button type="button" onClick={copyToClipboard}>
                            Copy to Clipboard
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  )
}
