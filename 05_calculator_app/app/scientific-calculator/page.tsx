"use client"; 

import React, { useState, ChangeEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function page() {
    const [expression, setExpression] = useState<string>("")
    const [num2, setNum2] = useState<string>("")
    const [result, setResult] = useState<string>("")

  const handleExpressionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setExpression(e.target.value);
  };

    const clear = (): void => {
        setExpression("")
        setResult("")
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-10">
        <Card className="w-full max-w-md p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-3xl text-center font-bold">
                    Scientific Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="num1" className="font-semibold">Enter expression</Label>
                        <Input 
                            id="expression"
                            type="text"
                            value={expression}
                            onChange={handleExpressionChange}
                            placeholder="Enter an expression to evaluate"
                            // className="w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            7
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            4
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            1
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            0
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            8
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            5
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            2
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            .
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            9
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            6
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            3
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            * 10^x
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            DEL
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            *
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            +
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            ANS
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            AC
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            /
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            -
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-lg font-semibold text-gray-700 dark:text-gray-300"
                            // onClick={add}
                        >
                            =
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="result" className="font-semibold">Result</Label>
                    <Input 
                        id="result"
                        type="number"
                        value={result}
                        placeholder="Result"
                        readOnly
                    />
                </div>
                <Button variant="outline"  className="w-full font-semibold" onClick={clear}>
                    Clear
                </Button>
            </CardContent>
        </Card>

        <Link href="/">
            <Button variant="outline" className=" mt-10 w-full font-semibold">
                Back to Home
            </Button>    
        </Link>
    </div>
  )
}
