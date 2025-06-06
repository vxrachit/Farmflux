# 🌿 FarmFlux

**FarmFlux** is an intelligent agricultural dashboard designed to empower farmers and researchers with real-time weather data, crop analytics, task management, and disease detection — all in one place.

Built with modern web technologies and powered by a custom backend + Supabase authentication, FarmFlux aims to streamline precision agriculture and data-driven farming.

---

## 🚀 Features

- 🌤️ Real-time Weather Forecast by location
- 🌱 Crop Management Dashboard
- 🧪 Disease Detection Assistant (experimental)
- 📊 Farm Analytics and Monitoring
- ✅ User Authentication (Sign Up / Log In)
- 🗓️ Task Management for daily activities
- 🤖 Integrated Smart Chatbot
- 🌍 Multi-language support

---

## 📦 Tech Stack

| Frontend        | Backend           | Tools & Services     |
|-----------------|-------------------|-----------------------|
| React + TypeScript | FastAPI + Supabase Auth | TailwindCSS, Vite, Toast |
| React Router    | Supabase PostgreSQL | Lucide Icons, HotToast |
| Context API     | HTTPX + Pydantic   | OpenWeather (or custom) |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/vxrachit/farmflux.git
cd farmflux
```

### 2. Set up the environment

Create a `.env` file for the backend with:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the app

#### Backend (FastAPI)

```bash
uvicorn app.main:app --reload --port 8000
```

#### Frontend (React)

```bash
npm run dev
```

App will be live at [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication

Authentication is handled using Supabase Auth via a backend proxy:

- `POST /api/login` — for email/password login
- `POST /api/signup` — for new user registration

Tokens are stored in localStorage via `AuthContext`.

---

## 📂 Project Structure

```
FarmFlux
├── frontend
│   ├── src/components          # UI Components
│   ├── src/context             # Language & Auth Contexts
│   ├── src/services            # API Calls (weather, auth)
│   └── App.tsx                 # Route definitions
│
├── backend
│   ├── app
│   │   ├── api/                # Route handlers (FastAPI routers)
│   │   │   ├── chatbot.py
│   │   │   ├── crop_recommendation.py
│   │   │   ├── disease_detection.py
│   │   │   ├── supabase.py    # Login/Signup routes via Supabase
│   │   │   └── weather.py
│   │   │
│   │   ├── core/               # App configuration & startup logic
│   │   │   └── config.py
│   │   │
│   │   ├── models/             # Pydantic models and data schemas
│   │   │   ├── chatbot.py
│   │   │   ├── crop_recommendation.py
│   │   │   ├── disease_detection.py
│   │   │   ├── supabase.py
│   │   │   └── weather.py
│   │   │
│   │   └── services/           # External service utilities (OpenAI, Weather, etc.)
│       │    ├── gemini_services.py
│       │    ├── supabase_client.py
│       │    └── weather_services.py
│       │
│       └── main.py                 # FastAPI app startup & route includes
│
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (DO NOT COMMIT)
└── README.md                   # Project documentation
```


---

## 🧠 Architecture

### 🔁 Auth Flow

```text
Frontend: Auth.tsx ➝ POST /api/signup or /api/login ➝ FastAPI ➝ Supabase Auth ➝ access_token
```

### ☁️ Weather Flow

```text
Frontend: Weather.tsx ➝ GET /weather?lat=..&lon=.. ➝ FastAPI ➝ OpenWeather API or geocoder ➝ JSON response
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---


## 🌐 Demo

> [CLICK HERE](https://farmflux.pages.dev)

---

## 🙌 Support the Project

If you like FarmFlux, star ⭐ the repo and share it with your farming tech community!
