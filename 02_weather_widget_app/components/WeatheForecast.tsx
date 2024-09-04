"use client"

import React, { useState, ChangeEvent, FormEvent} from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ThermometerIcon, CloudIcon, MapPinIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';


interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
}

interface DailyForecast {
  date: string;
  day: {
    maxTemp: number;
    minTemp: number;
    condition: string;
  };
  hour: HourlyForecast[];
}

interface ForecastData {
  forecastday: DailyForecast[];
}

export default function WeatheForecast() {
    const [location, setLocation] = useState<string>("")
    const [days, setDays] = useState<string>("")
    const [weatherForecast, setWeatherForecast] = useState<ForecastData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(location, days)
        const trimmedLocation = location.trim()

        if (trimmedLocation === "") {
            toast.error("Please eneter a valid location.")
            setWeatherForecast(null)
            return
        }
        if (days === "") {
            toast.error("Please select number of days for foreacst.")
            setWeatherForecast(null)
            return
        }

        setIsLoading(true)
        const toastId = toast.loading('Loading...');

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}&days=${days}`
            )
            if(!response.ok) {
                throw new Error("City not found!")
            }

            const data = await response.json()
            // console.log("Data: ", data)

            const forecastDays = data.forecast.forecastday
            
            const weatherForecastData: ForecastData = {
                forecastday: forecastDays.map((fd: any) => ({
                    date: fd.date,
                    day: {
                        maxTemp: fd.day.maxtemp_c,
                        minTemp: fd.day.mintemp_c,
                        condition: fd.day.condition.text,
                    },
                    hour: fd.hour.map((h: any) => ({
                        time: h.time,
                        temperature: h.temp_c, // Corrected the spelling from 'tempearture'
                        condition: h.condition.text,
                    })),
                })),
            }

            // console.log(weatherForecastData)            

            setWeatherForecast(weatherForecastData)
        } catch (error) {
            // console.error("Error fetching data:", error)
            toast.error("City not found. Please try again.");
            setWeatherForecast(null)
        } finally {
            setIsLoading(false)
            toast.dismiss(toastId);
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
                return `It's pleasent at ${temperature}°C! Enjoy the weather!`;
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
    <div className="bg-blue-300 dark:bg-gray-900 flex justify-center items-center h-screen p-10">
        <Toaster />
        <Card className="w-full max-w-md text-center bg-white/20 shadow-md backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Weather Forecast</CardTitle>
                <CardDescription className="text-gray-500">
                    Search for the weather conditions in your city.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSearch} className="flex flex-col items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Enter your city name"
                        value={location}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setLocation(e.target.value)
                        }}
                    />
                    <Select 
                        onValueChange={(value) => setDays(value)} defaultValue={days}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select number of days for forecast" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Forecast"}
                    </Button>
                </form>

                {weatherForecast && weatherForecast.forecastday.map((dayForecast, dayIndex) => (
                    <div key={dayIndex} className="mt-4 grid gap-4">
                        {/* Day Information */}
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-semibold">Date: {dayForecast.date}</div>
                            <div className="flex items-center gap-2">
                                <ThermometerIcon className="w-6 h-6" />
                                <div>
                                    Max: {dayForecast.day.maxTemp}°C, Min: {dayForecast.day.minTemp}°C
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-6 h-6" />
                                <div>{dayForecast.day.condition}</div>
                            </div>
                        </div>

                        {/* Hourly Forecast */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dayForecast.hour.map((hourForecast, hourIndex) => (
                                <div key={hourIndex} className="flex items-center gap-2 border p-2 rounded-lg">
                                    <div className="text-sm font-semibold">{hourForecast.time.split(" ")[1]}</div>
                                    <div className="flex items-center gap-2">
                                        <ThermometerIcon className="w-4 h-4" />
                                        <div>{hourForecast.temperature}°C</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CloudIcon className="w-4 h-4" />
                                        <div>{hourForecast.condition}</div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                ))}

            </CardContent>
        </Card>
    </div>
  )
}
