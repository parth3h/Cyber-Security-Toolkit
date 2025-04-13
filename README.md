# 🛡️ Cybersecurity Toolkit (Flask + React)

A full-stack cybersecurity toolkit built with **Flask** (backend) and **React** (frontend). This toolkit includes multiple security tools like a firewall tester, port scanner, malware scanner, password strength checker, software inventory checker, and IP geolocation/reputation checker — all wrapped in a sleek modern dashboard UI.

---

## 🚀 Features

- 🔥 **Firewall ** – Check the logs outgoing and incoming in your system.
- 🌐 **Port Scanner** – Scan open ports on a target IP address.
- 🧪 **Malware Scanner** – Scan files or strings for common malware signatures.
- 🔐 **Password Strength Checker** – Evaluate password complexity and strength.
- 🧾 **Software Checker** – List installed software on the system.
- 🌍 **IP Checker** – Retrieve geolocation and abuse reports of an IP address.

---

## 📁 Project Structure

```
cybersecurity-toolkit/
├── backend/              # Flask API backend
│   ├── app/
│   │   ├── services/     # Each tool logic
│   │   ├── utils/
│   │   ├── routes.py     # Flask API routes
│   │   └── config.py     # Config settings
│   ├── venv/             # Virtual environment
│   ├── requirements.txt  # Python dependencies
│   └── run.py            # Flask entry point
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/   # Header, Footer, Sidebar
│   │   ├── pages/        # Each tool UI
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

## ⚙️ Getting Started

### 🐍 Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

The Flask API will start at: `http://localhost:5000`

---

### ⚛️ Frontend (React)

```bash
cd frontend
npm install
npm start
```

The React app will run at: `http://localhost:3000`

---

## 🛠️ Tech Stack

- **Backend:** Flask, Python
- **Frontend:** React, JavaScript
- **Styling:** Custom CSS (with dark mode support)
- **API Integration:** RESTful API between React & Flask

---

## 🙌 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 🧾 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📷 Screenshots (Optional)

_Add some UI screenshots or GIFs to show your toolkit in action._
