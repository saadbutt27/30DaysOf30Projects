"use client"

import React, { useState, ChangeEvent } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  

interface BmiResult {
    bmi: string;
    category: string;
}

export default function BMICalculator() {
    const [height, setHeight] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [heightUnit, setHeightUnit] = useState<string>("cm") // Track height unit
    const [weightUnit, setWeightUnit] = useState<string>("kg") // Track weight unit
    const [result, setResult] = useState<BmiResult | null>(null)
    const [error, setError] = useState<string>("")

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setHeight(e.target.value)
    }
    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setWeight(e.target.value)
    }

    const calculateBMI = (): void => {
        if (!height || !weight) {
            setError("Please enter both height and weight!")
            return
        }

        // Convert height to meters based on the selected unit
        let heightInMeters = 0
        if (heightUnit === "ft" || heightUnit === "in") {
            let totalInches;
            if (heightUnit === "ft") {
                console.log("height: ", height)
                const [feet, inches] = height.split("'").map(Number)
                console.log(feet, inches)
                totalInches = ((feet * 12) + inches).toString()
                console.log(totalInches)
            } else {
                totalInches = height
            } 
            const heightInInches = parseFloat(totalInches)
            heightInMeters = heightInInches * 0.0254 // 1 inch = 0.0254 meters
        } else if (heightUnit === "cm") {
            heightInMeters = parseFloat(height) / 100 // centimeters to meters
            console.log("cm", heightInMeters)
        }
        
        console.log("Ht m: ", heightInMeters)
        if (heightInMeters <= 0){
            setError("Height must be a positive number!")
            return
        }

        // Convert weight to kilograms based on the selected unit
        let weightInKg = 0
        if (weightUnit === "lbs") {
            weightInKg = parseFloat(weight) * 0.453592 // 1 pound = 0.453592 kilograms
        } else if (weightUnit === "kg") {
            weightInKg = parseFloat(weight)
        }

        if (weightInKg <= 0) {
            setError("Weight must be a positive number!")
            return
        }

        const bmi = weightInKg / heightInMeters ** 2
        console.log(weightInKg, heightInMeters, bmi)

        let category = ""

        if (bmi <= 18.5)
            category = "underweight"
        else if (bmi >= 18.5 &&  bmi < 25)
            category = "normal"
        else if (bmi >= 25 && bmi < 30)
            category = "overweight"
        else 
            category = "obese"

        setResult({ bmi: bmi.toFixed(1), category })
        setError("")
    }
  return (
    <div className="flex flex-col justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>
                    <HoverCard>
                        <HoverCardTrigger>BMI Calculator</HoverCardTrigger>
                        <HoverCardContent className="font-normal text-sm">
                            Body mass index is a value derived from the mass and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m², resulting from mass in kilograms and height in metres.
                        </HoverCardContent>
                    </HoverCard>
                </CardTitle>
                <CardDescription>
                    Enter your height and weight to calculate your BMI.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs value={heightUnit} className="w-[400px]" onValueChange={setHeightUnit}>
                    <TabsList>
                        <TabsTrigger value="ft">Feet Inches</TabsTrigger>
                        <TabsTrigger value="in">Inches</TabsTrigger>
                        <TabsTrigger value="cm">Centimeters</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ft">
                        <div className="grid gap-2">
                            <Label htmlFor="height">Height (feet)</Label>
                            <Input 
                                id="height"
                                type="text"
                                placeholder="Enter your height (format: Ft' Inches'')"
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="in">
                        <div className="grid gap-2">
                            <Label htmlFor="height">Height (inches)</Label>
                            <Input 
                                id="height"
                                type="number"
                                placeholder="Enter your height"
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="cm">
                        <div className="grid gap-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input 
                                id="height"
                                type="number"
                                placeholder="Enter your height"
                                value={height}
                                onChange={handleHeightChange}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                <Tabs value={weightUnit} className="w-[400px]" onValueChange={setWeightUnit}>
                    <TabsList>
                        <TabsTrigger value="lbs">Pound</TabsTrigger>
                        <TabsTrigger value="kg">Kilogram</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lbs">
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Weight (lbs)</Label>
                            <Input 
                                id="weight"
                                type="number"
                                placeholder="Enter your weight"
                                value={weight}
                                onChange={handleWeightChange}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="kg">
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input 
                                id="weight"
                                type="number"
                                placeholder="Enter your weight"
                                value={weight}
                                onChange={handleWeightChange}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
                <Button onClick={calculateBMI}>Calculate</Button>
                {error && <div className="text-red-500 text-center">{error}</div>}
                {result && (
                <div className="grid gap-2">
                    <div className="text-center text-2xl font-bold">BMI: {result.bmi}</div>
                    <div className="text-center text-muted-foreground capitalize">
                        Category: {result.category}
                    </div>
                </div>
                )}
            </CardContent>
        </Card>
    </div>
  )
}
