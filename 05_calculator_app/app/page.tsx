import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center gap-2 mt-10">
      <Link href={"/calculator"}>
        <Button variant="outline" className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Calculator
        </Button>
      </Link>

      <Link href={"/scientific-calculator"}>
        <Button variant="outline" className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Scientific Calculator
        </Button>
      </Link>
    </main>
  );
}
