"use client";

import { useState, useEffect, useRef } from "react";
import provinces from "../../data/provinces";
import { getWeatherData } from "../../utils/weatherApi";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("ขอนแก่น");
  const [weather, setWeather] = useState(null);
  const weatherContainerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWeatherData(selectedCity);
        console.log("Weather data:", data);
        setWeather(data);
      } catch (error) {
        console.error("โหลดข้อมูลล้มเหลว:", error.message);
        setWeather(null);
      }
    }
    fetchData();
  }, [selectedCity]);

  useEffect(() => {
    const handleScroll = () => {
      if (weatherContainerRef.current) {
        const scrollY = window.scrollY;
        // Subtle parallax effect: move container up/down by 10% of scroll distance
        const offset = scrollY * 0.1;
        // Shift right by adjusting translate-x (base centering is handled by left-[60%])
        weatherContainerRef.current.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ ใช้ภาพพื้นหลังเดียวสำหรับทุกจังหวัด ควรเป็นภาพความละเอียดสูง (เช่น 1920x1080)
  function getProvinceImage() {
    const url = `/images/provinces/common-background.jpg`;
    console.log("Background URL:", url);
    return url;
  }

  // ✅ แปลคำอธิบายสภาพอากาศเป็นภาษาไทย
  function translateWeatherDescription(description) {
    const translations = {
      "clear sky": "ท้องฟ้าแจ่มใส",
      "few clouds": "มีเมฆบางส่วน",
      "scattered clouds": "เมฆกระจาย",
      "broken clouds": "เมฆครึ้ม",
      "overcast clouds": "เมฆเต็มท้องฟ้า",
      "light rain": "ฝนตกเล็กน้อย",
      "moderate rain": "ฝนตกปานกลาง",
      "heavy intensity rain": "ฝนตกหนัก",
      "thunderstorm": "พายุฝนฟ้าคะนอง",
      "snow": "หิมะ",
      "mist": "หมอก",
      "fog": "หมอกหนา",
    };
    return translations[description.toLowerCase()] || description;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gradient-to-b from-blue-600 to-blue-800 p-6 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-white tracking-tight">
          จังหวัดภาคอีสาน
        </h2>
        <ul className="space-y-3">
          {provinces.map((province) => (
            <li
              key={province}
              onClick={() => setSelectedCity(province)}
              className={`cursor-pointer px-4 py-3 rounded-lg text-center transition-all duration-300 ${
                selectedCity === province
                  ? "bg-white text-blue-800 font-semibold shadow-md"
                  : "bg-gray-800 bg-opacity-50 text-white hover:bg-blue-400 hover:shadow-md"
              }`}
            >
              {province}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 bg-center bg-no-repeat text-white min-h-screen relative"
        style={{
          backgroundImage: `url(${getProvinceImage()})`,
          backgroundColor: "#4b5e8e",
          backgroundSize: "cover",
          imageRendering: "auto",
        }}
      >
        <div
          ref={weatherContainerRef}
          className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 bg-transparent p-8 rounded-2xl shadow-xl max-w-2xl w-full z-10 animate-fade-in transition-transform duration-300"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-100">
            สภาพอากาศ: {selectedCity}
          </h1>

          {weather ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <div className="bg-gray-900 bg-opacity-20 p-4 rounded-lg shadow-md">
                <p className="flex items-center">
                  <span className="mr-2">🌡️</span>
                  <span className="font-semibold">อุณหภูมิ:</span> {weather.main.temp.toFixed(1)} °C
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🔺</span>
                  <span className="font-semibold">สูงสุด:</span> {weather.main.temp_max.toFixed(1)} °C
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🔻</span>
                  <span className="font-semibold">ต่ำสุด:</span> {weather.main.temp_min.toFixed(1)} °C
                </p>
              </div>
              <div className="bg-gray-900 bg-opacity-20 p-4 rounded-lg shadow-md">
                <p className="flex items-center">
                  <span className="mr-2">🌤️</span>
                  <span className="font-semibold">สภาพอากาศ:</span>{" "}
                  {translateWeatherDescription(weather.weather[0].description)}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">💨</span>
                  <span className="font-semibold">ความเร็วลม:</span> {weather.wind.speed} m/s
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span className="font-semibold">เมือง:</span> {selectedCity}
                </p>
              </div>
              <div className="bg-gray-900 bg-opacity-20 p-4 rounded-lg shadow-md sm:col-span-2">
                <p className="flex items-center">
                  <span className="mr-2">🌅</span>
                  <span className="font-semibold">พระอาทิตย์ขึ้น:</span>{" "}
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("th-TH")}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🌇</span>
                  <span className="font-semibold">พระอาทิตย์ตก:</span>{" "}
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString("th-TH")}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-blue-200 animate-pulse">กำลังโหลดข้อมูล...</p>
          )}
        </div>
      </main>
    </div>
  );
}