# 🦷 Dr Smile — Smart Dental Appointment System

A modern, production-ready **dental appointment management system** designed for real clinic workflows.

Patients can book appointments easily, while doctors/admins can review, confirm, cancel, and manage schedules with automated notifications and calendar integration.

---

## ✨ Overview

**Dr Smile** is a premium dental clinic booking and management platform built for:

- Smooth patient appointment booking
- Secure admin/doctor login
- Appointment confirmation and scheduling
- Email notifications
- WhatsApp communication
- Google Calendar sync
- Reminder automation

It is designed to feel **clean, fast, trustworthy, and professional**.

---

## 🚀 Key Features

### 👤 Patient Side
- Clean appointment booking form
- No OTP friction
- Responsive UI
- Fast submission flow
- WhatsApp access

### 🧑‍⚕️ Admin / Doctor Panel
- Secure login
- View all appointments
- Accept / cancel bookings
- Assign appointment time
- Track appointment status
- Safe tab switching and stable UI

### 📩 Notifications
- Gmail SMTP email integration
- Appointment confirmation emails
- Cancellation emails
- Reminder emails before appointment
- WhatsApp message redirect

### 📅 Scheduling
- Google Calendar integration
- Event creation on confirmation
- Appointment time assignment
- Double-booking prevention

### 🛡 Stability
- Global error boundary
- Safe async handling
- Loading state protection
- Crash prevention for login and forms

---

## 🧠 Workflow

```text
Patient books appointment
        ↓
Appointment stored as "pending"
        ↓
Admin reviews request
        ↓
Doctor:
   → Accepts and assigns time
   → OR Cancels
        ↓
Patient receives email / WhatsApp notification
        ↓
Google Calendar event created
        ↓
Reminder sent before appointment
```

---

## 🛠 Tech Stack

| 💻 Languages | 🎨 Frontend |
|-------------|------------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |

| ⚙️ Backend & APIs | 🧠 Integrations |
|------------------|---------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) | ![Gmail](https://img.shields.io/badge/Gmail_SMTP-EA4335?style=for-the-badge&logo=gmail&logoColor=white) ![Google Calendar](https://img.shields.io/badge/Google_Calendar-4285F4?style=for-the-badge&logo=google-calendar&logoColor=white) |

| 🗄 Database | 🚀 DevOps & Tools |
|------------|------------------|
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) |

---

## 🔐 Authentication

- Supabase Auth
- Persistent sessions
- Auto token refresh
- Protected admin routes

---

## 🗃 Database Fields

Core appointment fields:

| Field | Purpose |
|------|------|
| `status` | `pending`, `confirmed`, `cancelled` |
| `appointment_time` | Doctor-assigned time |
| `reminder_sent` | Tracks reminder status |

Suggested additional fields:

| Field | Purpose |
|------|------|
| `appointment_id` | Unique tracking ID |
| `email_sent` | Email success flag |
| `calendar_created` | Calendar event success flag |
| `status_history` | Track status changes |

---

## 📁 Suggested Folder Structure

```text
src/
├── components/
├── pages/
│   ├── admin/
│   ├── auth/
│   └── ...
├── hooks/
├── lib/
├── utils/
├── styles/
└── assets/
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dr-smile.git
cd dr-smile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

GOOGLE_SERVICE_ACCOUNT_JSON=your_service_account_json_or_path
```

### 4. Run the project

```bash
npm run dev
```

---

## 📧 Gmail SMTP Configuration

This project uses **Gmail SMTP** via Nodemailer.

### Requirements
- Enable 2-Step Verification on Gmail
- Generate a Gmail App Password
- Store it in `.env`

### Example Nodemailer Setup

```js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
```

---

## 📅 Google Calendar Integration

On appointment confirmation, the system creates a Google Calendar event.

### Important
- Use a Google Service Account or OAuth
- Do not hardcode API keys in frontend code
- Keep credentials secured in environment variables

### Suggested Event Data
- Patient name
- Appointment date
- Appointment time
- Treatment type
- Clinic location

---

## 💬 WhatsApp Integration

WhatsApp is triggered through a redirect using:

```js
window.open(
  `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`,
  "_blank"
);
```

This avoids blocked API calls and keeps the integration simple and reliable.

---

## 🧯 Error Handling

This project includes protections for common production issues:

### Fixed / Handled
- `.length` on undefined
- Login stuck on "Signing in..."
- Form stuck on "Submitting..."
- Google Calendar invalid JSON errors
- WhatsApp connection blocking issues
- Browser extension console noise
- Admin tab switching crashes

### Stability Features
- Try/catch around async actions
- `finally` blocks for loader reset
- Null safety checks
- Controlled auth/session handling
- Global error boundary

---

## 🔄 Appointment Status Flow

```text
pending → confirmed → cancelled
```

### Status Actions
- **Pending**: Newly submitted appointment
- **Confirmed**: Doctor accepted and assigned time
- **Cancelled**: Doctor rejected or removed booking

---

## 🧪 Testing Checklist

Before deployment, test the following:

- [ ] Patient booking form submits correctly
- [ ] Appointment appears in admin dashboard
- [ ] Admin login works after refresh
- [ ] Accept flow opens time selection modal
- [ ] Confirmed appointment updates status
- [ ] Cancellation flow works
- [ ] Gmail email sends successfully
- [ ] Google Calendar event is created
- [ ] Reminder email is triggered
- [ ] WhatsApp redirect opens properly
- [ ] No console crash on login page
- [ ] Admin tabs switch without losing state

---

## 🚀 Future Improvements

- Multi-doctor support
- Patient history tracking
- Revenue analytics
- SMS reminders
- Payment integration
- Role-based access control
- Audit logs

---

## 🤝 Contributing

Contributions are welcome.

If you want to improve this project:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Note

This project is built to simulate a **real clinic-grade booking workflow** with a strong focus on:
- clean UX
- admin control
- reliable notifications
- production safety

---

## ⭐ Acknowledgements

Built with:
- React
- Supabase
- Tailwind CSS
- Gmail SMTP
- Google Calendar API
