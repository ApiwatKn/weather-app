export async function getWeatherData(city) {
    // ตัวอย่างการเรียก API (ปรับตาม API ที่คุณใช้)
    const apiKey = "7f6bb03a93dccf5a804079b7c129a368";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return response.json();
  }