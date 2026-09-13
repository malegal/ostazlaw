const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const output = path.join(__dirname, '..', 'public', 'og-image.jpg');
const fontDir = path.join(__dirname, '..', 'public', 'fonts');
const regularFont = fs.readFileSync(path.join(fontDir, 'ibm-plex-sans-arabic-regular.ttf')).toString('base64');
const boldFont = fs.readFileSync(path.join(fontDir, 'ibm-plex-sans-arabic-bold.ttf')).toString('base64');

// الخط مضمّن داخل SVG بدل الاعتماد على خطوط النظام؛ لذلك تطابق الصورة خط الموقع في كل بيئات البناء.
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'IBM Plex Sans Arabic'; font-weight: 400; src: url(data:font/ttf;base64,${regularFont}); }
      @font-face { font-family: 'IBM Plex Sans Arabic'; font-weight: 700; src: url(data:font/ttf;base64,${boldFont}); }
      .arabic { font-family: 'IBM Plex Sans Arabic', sans-serif; }
      .bold { font-weight: 700; }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B111B"/>
      <stop offset="100%" stop-color="#102A43"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B08D57" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B08D57" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="110" r="240" fill="#B08D57" opacity="0.08"/>
  <circle cx="120" cy="570" r="260" fill="#B08D57" opacity="0.05"/>
  <path d="M90 110 H1110" stroke="url(#gold)" stroke-width="2"/>
  <path d="M90 520 H1110" stroke="url(#gold)" stroke-width="2"/>
  <text x="600" y="210" text-anchor="middle" fill="#D4AF37" font-family="Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="8">JAD ELRAB</text>
  <text x="600" y="315" text-anchor="middle" fill="#FFFFFF" class="arabic bold" font-size="48" direction="rtl">جاد الرب</text>
  <text x="600" y="375" text-anchor="middle" fill="#F0F0F0" class="arabic" font-size="28" direction="rtl">للمحاماة والاستشارات القانونية</text>
  <text x="600" y="455" text-anchor="middle" fill="#D4AF37" class="arabic bold" font-size="27" direction="rtl">مقرنا في أسوان — خدمات قانونية في مختلف محافظات مصر</text>
</svg>`;

fs.mkdirSync(path.dirname(output), { recursive: true });
sharp(Buffer.from(svg)).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(output)
  .then(() => console.log(`Generated ${output} using IBM Plex Sans Arabic`))
  .catch((error) => { console.error(error); process.exit(1); });
