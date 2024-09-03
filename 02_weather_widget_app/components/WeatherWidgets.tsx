"use client"

import React, { useState, ChangeEvent, FormEvent} from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ThermometerIcon, CloudIcon, MapPinIcon } from 'lucide-react'

interface WeatherData {
    temperature: number,
    weatherDescription: string,
    location: string,
    unit: string
}

export default function WeatherWidgets() {
    const [location, setLocation] = useState<string>("")
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedLocation = location.trim()

        if (trimmedLocation === "") {
            setError("Please eneter a valid location.")
            setWeather(null)
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
            )
            console.log(response)
            if(!response.ok) {
                throw new Error("City not found!")
            }
            const data = await response.json()
            const weatherData: WeatherData = {
                temperature: data.current.temp_c,
                weatherDescription: data.current.condition.text,
                location: data.location.name,
                unit: "C"
            }
            setWeather(weatherData)
        } catch (error) {
            console.error("Error fetching data:", error)
            setError("City not found. Please try again.")
            setWeather(null)
        } finally {
            setIsLoading(false)
        }
    }

    const getTemperatureMessage = (temperature: number, unit:string):string => {
        if (unit === "C") {
            if (temperature < 0) {
                return `It's freezing at ${temperature}°C! Bundle up!`;
            } else if (temperature < 10) {
                return `It's cold at ${temperature}°C! Wear warm clothest`;
            } else if (temperature < 20) {
                return `The temperature is ${temperature}°C! Comforatble with a light jacket`;
            } else if (temperature < 30) {
                return `It's pleasent at ${temperature}°C! Enojoy the weather!`;
            } else {
                return `It's hot at ${temperature}°C! Stay hydrated! Too hot to handle 😂`;
            }
        } else {
            return `The temperature is ${temperature}°${unit}.`;
        }
    }

    const getWeatherMessage = (weatherDescription: string):string => {
        switch (weatherDescription.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "Expect some clouds and sunshine.";
            case "cloudy":
                return "It's cloudy today.";
            case "overcast":
                return "The sky is overcast.";
            case "rain":
                return "Don't forget your umbrella! It's raining.";
            case "thunderstorm":
                return "Thunderstorms are expected today.";
            case "snow":
                return "Bundle up! It's snowing.";
            case "mist":
                return "It's misty outside.";
            case "fog":
                return "Be careful, there's fog outside.";
            default:
                return weatherDescription;
        }
    }

    const getLocationMessage = (location:string): string => {
        const currentHour = new Date().getHours()
        const isNight = currentHour >= 18 || currentHour < 6 
        return `${location} ${isNight ? "at night." : "during the day."}`
    }

  return (
    <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-lg mx-auto text-center">
            <CardHeader>
                <CardTitle>Weather Widget</CardTitle>
                <CardDescription>
                    Search for the weather conditions in your city.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Enter your city name"
                        value={location}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setLocation(e.target.value)
                        }}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Search"}
                    </Button>
                </form>
                
                {error && 
                    <div className="mt-4 text-red-500">{error}</div>
                }

                {weather &&
                    <div className="mt-4  grid gap-2">
                        <div className="flex items-center gap-2">
                            <ThermometerIcon className="w-6 h-6" />
                            <div>{getTemperatureMessage(weather.temperature, weather.unit)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CloudIcon className="w-6 h-6" />
                            <div>{getWeatherMessage(weather.weatherDescription)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-6 h-6" />
                            <div>{getLocationMessage(weather.location)}</div>
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    </div>
  )
}
