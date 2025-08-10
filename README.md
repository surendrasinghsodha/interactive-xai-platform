# InteractiveXAI Web Platform

The **InteractiveXAI Web Platform** is a full-stack application that allows users to upload datasets, train machine learning models, and generate **Explainable AI** insights using SHAP and LIME.  

It provides:
- A **FastAPI backend** for dataset processing, ML model training, and explanation generation.
- A **Next.js frontend** for an interactive user interface.

---

## 📌 GitHub Repository
🔗 [InteractiveXAI Web Platform](https://github.com/surendrasinghsodha/interactive-xai-platform)

---

## 🚀 Features
- Upload and inspect CSV datasets.
- Train ML models:
  - Random Forest
  - Decision Tree
  - Logistic Regression
  - SVM
  - Linear Regression
- Generate SHAP & LIME explanations.
- Collect and store feedback.
- Interactive and responsive UI with **Next.js + TailwindCSS**.
- API documentation via **Swagger UI**.

---

## 📂 Project Structure
```
interactive-xai-platform/
│
├── backend/                # Backend (FastAPI)
│   ├── __pycache__/
│   ├── main.py              # API entry point
│   ├── models.py            # Request/Response models
│   ├── services.py          # Core ML & explanation logic
│   ├── requirements.txt     # Python dependencies
│   └── venv/                # Virtual environment (local only)
│
├── interactivexaiweb/       # Frontend (Next.js)
│   ├── app/                 # Pages (Next.js App Router)
│   ├── components/          # UI components
│   ├── context/             # State management
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Helper utilities
│   ├── public/              # Static files
│   ├── src/                 # Additional source files
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md            # Default Next.js README
│
└── README.md                # This file
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/surendrasinghsodha/interactive-xai-platform.git
cd interactive-xai-platform
```

---

### 2️⃣ Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv       # Create virtual environment
source venv/bin/activate  # Activate (Linux/Mac)
# For Windows:
# venv\Scripts\activate

pip install -r requirements.txt
```

**Run the backend:**
```bash
python main.py
```

- Backend URL: **http://localhost:8000**
- Swagger Docs: **http://localhost:8000/docs**

---

### 3️⃣ Frontend Setup (Next.js)
```bash
cd interactivexaiweb
npm install
```

**Run the frontend:**
```bash
npm run dev
```

- Frontend URL: **http://localhost:3000**

---

## ▶️ Running the Platform Together
To run both backend and frontend at the same time:

**Terminal 1 (Backend):**
```bash
cd backend
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd interactivexaiweb
npm run dev
```

---

## 📜 API Overview
| Method | Endpoint         | Description |
|--------|------------------|-------------|
| POST   | `/inspect-csv`   | Inspect CSV file & return columns + sample data |
| POST   | `/train`         | Train a model with uploaded dataset |
| POST   | `/explain`       | Generate SHAP & LIME explanations |
| POST   | `/feedback`      | Submit feedback for explanations |
| GET    | `/`              | Welcome message |

📖 **Full API Reference:** [Swagger UI](http://localhost:8000/docs)

---



## 🖥️ Tech Stack
**Frontend:** Next.js, React, TailwindCSS  
**Backend:** FastAPI, Python, scikit-learn, pandas, SHAP, LIME  
**ML Support:** Classification & Regression tasks

---
