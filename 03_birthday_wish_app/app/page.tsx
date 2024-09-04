"use client"

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(-1);
  const [dob, setDob] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name:string = formData.get("fullName") as string;
    const dob:string = formData.get("dob") as string;

    if (!name || !dob) {
      alert("Please fill in all required fields.");
      return;
    }

    // Calculate the age based on the date of birth
    const calculatedAge:number = calculateAge(dob);
    const formatedDOB:string = formatDOB(dob)
    setName(name);
    setDob(formatedDOB);
    setAge(calculatedAge);

    console.log({ name, dob: formatedDOB, age: calculatedAge });

    // Additional logic can be added here
  };

  function calculateAge(dateOfBirth: string) {
    const birthDate = new Date(dateOfBirth);
    console.log(birthDate)
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function formatDOB(dobString:string):string {
    // Split the input string into components
    const [year, month, day] = dobString.split("-");

    const months = ["January", "Feburary", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];

    const formattedDOB:string = `${months[+month-1]} ${day}`
  
    return formattedDOB;
  }

  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <h3 className="text-5xl text-center font-bold text-black">Happy Birthday Wisher</h3>
      <Card className="w-[350px] my-5">
        <CardHeader>
          <CardTitle>Wishing Form</CardTitle>
          <CardDescription>Enter birthday person&apos;s details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of person"
                  name="fullName"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="Person&apos;s Date of Birth"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-4 px-6 py-0">
              <Button type="submit">Done</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      {
        name && dob && age && (
          <Link
            href={{
              pathname: "/happy-birthday",
              query: { name: name, dob: dob, age: age }
            }}
          >
            <Button disabled={!name || !dob}>Say Happy Birthday</Button>
          </Link>
        )
      }
    </main>
  );
}
