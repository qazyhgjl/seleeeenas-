# 🛡️ 3D Digital Armory & Sci-Fi Archive (آرشیو سه‌بعدی سلاح‌های خیالی)

پروژه وب‌سایت تعاملی، پیشرفته و سینمایی **3D Digital Armory Showcase** برای نمایش کلکسیون سلاح‌های کاملاً تخیلی، فانتزی و سایبرپانکی. این سیستم شامل یک آرشیو کامل با موتور سه‌بعدی WebGL (بر پایه Three.js و React Three Fiber)، سیستم لور و داستانی جهان‌سازی، قابلیت مقایسه پهلو‌به‌پهلو، نقشه رادار سه‌بعدی و داشبورد کلکسیونر است.

---

## 🌟 ویژگی‌های اصلی (Key Features)

1. **موتور سه‌بعدی تعاملی WebGL Engine**:
   - قابلیت رندر مدل‌های سه‌بعدی با پشتیبانی از OrbitControls، نورپردازی پویا، افکت‌های ذرات (Particles) و چرخش خودکار.
   - **۶ پریست نورپردازی و شیدر (Lighting Shaders)**: Studio, Dark, Neon, Cyberpunk, Ancient, Cosmic.
   - **مولد سه‌بعدی رویه‌ای (Procedural 3D Mesh Generator)**: ایجاد رویه‌ای تیغه‌های کریستالی، تفنگ‌های پلاسما، عصاهای خلأ، داس‌های سایبری، سپرهای هارد-لایت و توپ‌های کیهانی.

2. **تجربه صفحه اول (Landing Page - "ENTER THE ARMORY")**:
   - طراحی سینمایی و تاریک فانتزی با HUD سایبرپانکی، لایه‌های Glassmorphism و کنترل تعاملی شیدرها.

3. **تالار سه‌بعدی سالن و نقشه تعاملی رادار (3D Vault & World Map)**:
   - سالن سه‌بعدی نمایش پایه‌های سلاح همراه با اطلاعات آنی HUD.
   - نقشه تعاملی رادار جهت کاوش مختصات بخش‌ها، آزمایشگاه‌ها و قلعه‌های باستانی.

4. **دیتابیس آرسنال و سیستم مقایسه (Arsenal & Compare System)**:
   - جستجو و فیلتر پیشرفته بر اساس نام، کمیابی (Rarity)، دسته‌بندی و میزان قدرت تخیلی.
   - ابزار مقایسه پهلو‌به‌پهلو (Side-by-Side) تا حداکثر ۳ آیتم خیالی.

5. **صفحه جزئیات و حالت نمایش سینمایی (Cinematic Showcase Mode)**:
   - بررسی کامل مشخصات فنی، متریال، تاریخچه و داستان‌های مرتبط (Lore).
   - حالت Fullscreen سینمایی جهت معرفی معرفی برتر آیتم‌ها.

6. **داشبورد کلکسیونر و سیستم دستاوردها (Collection & Achievements)**:
   - ذخیره آیتم‌ها در کلکسیون شخصی و باز شدن دستاوردهای اختصاصی (Collector Achievements).

---

## 🛠️ تکنولوژی‌ها (Tech Stack)

### Backend:
- Python 3.12
- Django 5.1 & Django REST Framework
- SimpleJWT (احراز هویت JWT)
- Django Filters & CORS Headers
- Gunicorn & SQLite / PostgreSQL

### Frontend:
- React 18 & TypeScript
- Vite 5
- Three.js & `@react-three/fiber` & `@react-three/drei`
- GSAP & Tailwind CSS
- Lucide React Icons

### Infrastructure:
- Docker & Docker Compose
- Nginx Reverse Proxy
- Makefile Automation

---

## 📋 پیش‌نیازها (Prerequisites)

- Python 3.12+
- Node.js 20+ & npm
- Docker & Docker Compose (اختیاری جهت اجرای داکر)

---

## 🚀 راهنمای نصب و اجرا (Step-by-Step Setup Guide)

### ۱. آماده‌سازی متغیرهای محیطی (Environment Variables)
ابتدا یک نسخه از فایل نمونه `.env.example` در ریشه پروژه ایجاد کنید:
```bash
cp .env.example .env
```

---

### ۲. اجرا با استفاده از Makefile (روش سریع)

اگر ابزار `make` روی سیستم شما نصب است:

```bash
# ۱. نصب وابستگی‌های بک‌اند و فرانت‌اند
make install

# ۲. اجرای مایگریشن‌های دیتابیس
make migrate

# ۳. درج داده‌های اولیه تخیلی (Seed Data)
make seed

# ۴. اجرای سرور بک‌اند Django
make run-backend

# ۵. در یک ترمینال دیگر: اجرای سرور فرانت‌اند Vite
make run-frontend
```

---

### ۳. اجرای دستی (Manual Execution)

#### بک‌اند (Django):
```bash
# ورود به پوشه بک‌اند
cd backend

# نصب وابستگی‌ها
pip install -r requirements.txt

# اجرای مایگریشن‌ها
python manage.py migrate --settings=config.settings.development

# تزریق داده‌های اولیه
python seed_armory.py

# ساخت کاربر ارشد (Superuser)
python manage.py createsuperuser --settings=config.settings.development

# اجرای سرور توسعه
python manage.py runserver 0.0.0.0:8000 --settings=config.settings.development
```

#### فرانت‌اند (React Vite):
```bash
# ورود به پوشه فرانت‌اند
cd frontend

# نصب پکیج‌ها
npm install

# اجرای فرانت‌اند
npm run dev
```

برنامه فرانت‌اند در آدرس `http://localhost:3000` و بک‌اند در `http://127.0.0.1:8000/api/` قابل دسترس خواهند بود.

---

## 🐳 اجرای کامل با داکر (Docker Deployment)

برای اجرای یکپارچه تمامی سرویس‌ها (Django, React, Nginx, PostgreSQL, Redis) کافیست دستور زیر را اجرا کنید:

```bash
docker compose -f infra/docker-compose.yml up --build -d
```

برنامه در آدرس `http://localhost` در دسترس قرار خواهد گرفت.

---

## 📡 اندپوینت‌های اصلی API (API Endpoints Summary)

- `GET /api/weapons/`: لیست و فیلتر سلاح‌های خیالی
- `GET /api/weapons/featured/`: دریافت سلاح‌های ویژه 3D
- `GET /api/weapons/compare/?ids=1,2,3`: مقایسه پهلو‌به‌پهلو سلاح‌ها
- `GET /api/weapons/{id}/`: جزئیات و تنظیمات مدل 3D
- `GET /api/universes/`: جهان‌های کیهانی و تاریخچه‌ها
- `GET /api/locations/`: مختصات نقشه رادار سه‌بعدی
- `POST /api/favorites/toggle/`: ذخیره سلاح در کلکسیون شخصی
- `GET /api/achievements/`: دستاوردهای کلکسیونر
