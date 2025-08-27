# Nightbot Weather API 🌤️

โปรเจคนี้เป็น API เล็ก ๆ ที่เชื่อมต่อ **OpenWeather API** และใช้กับ **Nightbot** เพื่อดึงข้อมูลสภาพอากาศมาแสดงในแชท Twitch/YouTube ได้โดยตรง ✅

---

## การทำงาน
- พิมพ์ในแชท Nightbot เช่น  
```

!อากาศ เชียงใหม่

```
- บอทจะตอบกลับ เช่น  
```

อากาศที่ เชียงใหม่ 🌤️ อุณหภูมิ 32°C ความรู้สึกเหมือน 35°C ความชื้น 60%

````

ระบบจะแสดง **อีโมจิสภาพอากาศ** อัตโนมัติ (☀️ 🌧️ ⛅ ❄️ ฯลฯ) ตามข้อมูลที่ดึงจาก OpenWeather

---

## วิธีติดตั้ง
1. สร้างโปรเจคใหม่ใน **Vercel**  
 - กด Import จาก GitHub Repo ที่เก็บไฟล์นี้  
 - หรืออัปโหลด Zip โดยตรงก็ได้  

2. ตั้งค่า **Environment Variable** ใน Vercel  
 - KEY: `OPENWEATHER_API_KEY`  
 - VALUE: (API Key ของคุณจาก [OpenWeather](https://openweathermap.org/api))  

3. Deploy ✅  

---

## การใช้งานกับ Nightbot
1. ไปที่ [Nightbot Custom Commands](https://nightbot.tv/commands/custom)  
2. สร้างคำสั่งใหม่ เช่น:  
 - Command:  
   ```
   !อากาศ
   ```
 - Message:  
   ```
   $(urlfetch https://YOUR_PROJECT_NAME.vercel.app/api/weather?city=$(querystring))
   ```

> อย่าลืมเปลี่ยน `YOUR_PROJECT_NAME` เป็นชื่อโปรเจคของคุณบน Vercel  

---

## โครงสร้างไฟล์
````

nightbot-weather/
├── api/
│   └── weather.js      # โค้ดหลักดึงข้อมูลสภาพอากาศ + emoji
├── package.json        # ข้อมูล dependencies
└── README.md           # ไฟล์คู่มือ

```

---

## หมายเหตุ
- ถ้า Nightbot ตอบ `404` ให้เช็กว่าโครงสร้างไฟล์ถูกต้อง (`/api/weather.js`)  
- ถ้า Nightbot ตอบ `500` ให้ตรวจสอบว่า API Key กรอกถูกใน Environment Variables  
- ระบบนี้รันบน Serverless Function ของ Vercel ไม่มีค่าใช้จ่าย (ฟรีตามโควต้า)  
```

---
