import axios from "axios";

export default async function handler(req, res) {
  const { location } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!location) {
    return res.status(400).send("กรุณาระบุชื่อจังหวัด เช่น ?location=เชียงใหม่");
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )},TH&units=metric&lang=th&appid=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    const weather = data.weather[0].description;
    const temp = data.main.temp;

    // emoji อัตโนมัติ
    let emoji = "🌤️";
    if (weather.includes("ฝน")) emoji = "🌧️";
    else if (weather.includes("เมฆ")) emoji = "☁️";
    else if (weather.includes("หิมะ")) emoji = "❄️";
    else if (weather.includes("ฟ้าใส") || weather.includes("แดด")) emoji = "☀️";

    res.status(200).send(
      `${emoji} สภาพอากาศที่ ${location} ตอนนี้: ${weather}, อุณหภูมิ ${temp}°C`
    );
  } catch (err) {
    res.status(500).send("ไม่พบข้อมูลสภาพอากาศสำหรับจังหวัดนี้");
  }
}
