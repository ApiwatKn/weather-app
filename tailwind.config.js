/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // ระบุไฟล์ที่ Tailwind จะสแกน
    './public/**/*.html', // ระบุไฟล์ใน public ถ้ามี
  ],
  theme: {
    extend: {
      backgroundImage: {
        'province-bg': "url('/images/provinces/Khon Kaen.jpg')", // เพิ่มพื้นหลังที่กำหนดเอง (ตัวอย่าง)
      },
    },
  },
  plugins: [],
}