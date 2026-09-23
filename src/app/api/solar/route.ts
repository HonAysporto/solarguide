export async  function GET(request: Request) {
    const {searchParams} = new URL(request.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    const solarResponse = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,daylight_duration,sunshine_duration,shortwave_radiation_sum&timezone=auto`
);

const solarData = await solarResponse.json();
const daily = solarData.daily;

const solarForecast = daily.time.map((date: string, index: number) => {
  const daylightSeconds = daily.daylight_duration[index];
  const sunshineSeconds = daily.sunshine_duration[index];

  const daylightHours = Math.floor(daylightSeconds / 3600);
  const daylightMinutes = Math.floor((daylightSeconds % 3600) / 60);

  const sunshineHours = Math.floor(sunshineSeconds / 3600);
  const sunshineMinutes = Math.floor((sunshineSeconds % 3600) / 60);

  return {
    date,
    sunrise: daily.sunrise[index].split("T")[1],
    sunset: daily.sunset[index].split("T")[1],
    daylight: `${daylightHours}h ${daylightMinutes}m`,
    sunshine: `${sunshineHours}h ${sunshineMinutes}m`,
    solarRadiation: daily.shortwave_radiation_sum[index],
  };
});

   

    return Response.json({
        message: "Solar Guide API is working",
        status: 200,
        latitude,
        longitude,
        solar:solarForecast
    })
}   

