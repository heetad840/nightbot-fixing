export default async function handler(req, res) {
  try {
    const city = req.query.city || "Bangkok";
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "❌ ไม่พบ API KEY กรุณาตั้งค่าใน Vercel" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`
    );
    const data = await response.json();

    if (response.ok) {
      const weather = data.weather[0].main.toLowerCase();
      let emoji = "🌍";

      if (weather.includes("clear")) emoji = "☀️";
      else if (weather.includes("cloud")) emoji = "☁️";
      else if (weather.includes("rain")) emoji = "🌧️";
      else if (weather.includes("storm") || weather.includes("thunder")) emoji = "⛈️";
      else if (weather.includes("snow")) emoji = "❄️";
      else if (weather.includes("mist") || weather.includes("fog")) emoji = "🌫️";

      return res.status(200).json({
        ข้อความ: `📍 จังหวัด: ${data.name}\n🌡️ อุณหภูมิ: ${data.main.temp}°C\nสภาพอากาศ: ${data.weather[0].description} ${emoji}`,
      });
    } else {
      return res.status(500).json({ error: `⚠️ เกิดข้อผิดพลาด: ${data.message}` });
    }
  } catch (err) {
    return res.status(500).json({ error: `💥 ขัดข้อง: ${err.message}` });
  }
}
