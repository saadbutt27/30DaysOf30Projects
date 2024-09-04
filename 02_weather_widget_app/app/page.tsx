import WeatheForecast from "@/components/WeatheForecast";
import WeatherWidgets from "@/components/WeatherWidgets";

export default function Home() {
  return (
    <main className="">
        <WeatherWidgets />
        <WeatheForecast />
    </main>
  );
}
