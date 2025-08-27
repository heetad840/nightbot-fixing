export default async function handler(req, res) {
  try {
    const city = req.query.city || "Chiang Mai";
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=th`
    );

    if (!response.ok) {
      throw new Error("ไม่สามารถดึงข้อมูลอากาศได้ ❌");
    }

    const data = await response.json();

    const weatherMain = data.weather[0].main.toLowerCase();
    let emoji = "🌍";
    if (weatherMain.includes("cloud")) emoji = "☁️";
    else if (weatherMain.includes("rain")) emoji = "🌧️";
    else if (weatherMain.includes("clear")) emoji = "☀️";
    else if (weatherMain.includes("snow")) emoji = "❄️";
    else if (weatherMain.includes("storm") || weatherMain.includes("thunder")) emoji = "⛈️";
    else if (weatherMain.includes("mist") || weatherMain.includes("fog")) emoji = "🌫️";

    const message = `สภาพอากาศที่ ${data.name} ${emoji} 
อุณหภูมิ ${data.main.temp}°C ความชื้น ${data.main.humidity}% 
${data.weather[0].description}`;

    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูลอากาศ ⚠️");
  }
}
