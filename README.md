# Paywall


![Paywall](https://github.com/user-attachments/assets/afa4d917-9912-4c6b-b995-785d8260abef)

![Paywall](https://img.shields.io/github/stars/Piyushrathoree/paywall?style=social) ![Forks](https://img.shields.io/github/forks/Piyushrathoree/paywall?style=social) ![Issues](https://img.shields.io/github/issues/Piyushrathoree/paywall) ![License](https://img.shields.io/github/license/Piyushrathoree/paywall)

## 🌟 Overview
Paywall is a cutting-edge peer-to-peer (P2P) payment and wallet management system, designed for effortless fund transfers and wallet functionalities. With a user-friendly interface and robust backend, Paywall aims to simplify digital transactions for everyone.

---

## 🚀 Features
### 🏦 Wallet Management
- **Seamless Fund Transfers:** Add funds via simulated HDFC and Axis bank pages.
- **Transaction Tracking:** Monitor all wallet and P2P transactions, including success, failure, and pending statuses.
- **Secure Transactions:** Supports transfers up to ₹10,000 per transaction.

### 💰 Transfer Page
- View **unlocked, locked, and total balance** at a glance.
- Quick access to **recent transactions** for easy tracking.

### 🏠 Home Page (Dashboard)
- Overview of available balance.
- One-click options for **sending money**, **adding funds**, and **viewing insights**.

### 🔐 Authentication & Security
- **Explicit Login/Signup:** Phone/password sign-in and a separate account creation flow, powered by NextAuth and JWT.
- **Data Validation:** Ensured with Zod.

### 🎨 Frontend
- Built with **Next.js** and **TailwindCSS** for responsive design.
- Dynamic hero animations using **Framer Motion**.

### 🛠 Backend
- **Robust API Features:** Add funds and handle wallet operations using Next.js API.
- Database managed via **Prisma ORM** and **PostgreSQL** (NeonDB).
- Future integration for **webhooks** using Express.

### 🧾 Merchant workspace
- Google-only merchant sign-in with onboarding and a responsive workspace.
- Payment links, public demo checkout, customer records, payments, settlements, analytics, and settings.

### 🌐 Deployment
- Initial deployment with **Docker** on AWS EC2.
- **Production-ready deployment** on Vercel.

---

## 💻 Tech Stack
| **Category**        | **Technology**               |
|---------------------|------------------------------|
| Frontend            | Next.js, TailwindCSS, Framer Motion |
| Backend             | Next.js API, Express (future) |
| Database            | PostgreSQL, Prisma ORM        |
| State Management    | Recoil                       |
| Tools               | Turborepo, TypeScript, Docker |
| Authentication      | NextAuth (JWT sessions)      |
| Deployment          | AWS EC2, Vercel             |

---

## 📥 Installation Process
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Piyushrathoree/paywall.git
   cd paywall
   ```
2. **Install dependencies (the repository uses Bun):**
   ```bash
   bun install
   ```
3. **Set up environment variables:**
   - Copy `apps/user-app/.env.example` to `apps/user-app/.env.local` and fill in `JWT_SECRET`, `NEXTAUTH_URL`, and `DATABASE_URL`.
   - Copy `apps/merchant-app/.env.example` to `apps/merchant-app/.env.local` and fill in the Google OAuth values and `NEXTAUTH_SECRET`.
   - Copy `packages/db/.env.example` to `packages/db/.env` and provide both the pooled `DATABASE_URL` and direct `DIRECT_URL`.
4. **Initialize the database:**
   ```bash
   bun run db:migrate
   bun run db:generate
   ```
5. **Start the development server:**
   ```bash
   bun run dev
   ```
   The customer app runs at `http://localhost:3001`; the merchant app runs at `http://localhost:3000`.
6. **Build for production:**
   ```bash
   bun run build
   ```

---

## 🤝 Contribution Guidelines
### 🌱 How to Get Involved
We warmly welcome contributions to Paywall! Here's how you can get started:

1. **Fork the repository** by clicking the "Fork" button.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/paywall.git
   ```
3. **Create a new branch:**
   ```bash
   git checkout -b feature/<feature-name>
   ```
4. **Set up the environment** (refer to installation steps).
5. **Make changes** following coding standards.
6. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```
7. **Push changes:**
   ```bash
   git push origin <your-branch-name>
   ```
8. **Open a pull request** with a clear description of changes.

### 📌 Suggested Contributions
- **Enhancements:** Improve state management, Docker configuration, and UI/UX.
- **Features:** Develop merchant app, add webhooks, and enhance FAQs.
- **Bug Fixes:** Address open issues.

### 🏅 Contributor Badges
Showcase your contribution with pride! 🏆
[![Contributors](https://img.shields.io/github/contributors/Piyushrathoree/paywall)](https://github.com/Piyushrathoree/paywall/graphs/contributors)

---

## 🌟 Motivation & Entrepreneurship
Paywall was created to make digital finance seamless and accessible to everyone. Our vision is to empower individuals and businesses with innovative tools to simplify financial interactions. We believe in building an inclusive community where contributors and users thrive together. 🚀

---

## 🗂 Repository Structure
```
├── README.md
├── apps
│   ├── Bank-WebHook
│   ├── merchant-app
│   └── user-app
├── docker
│   └── Dockerfile.user
├── packages
│   ├── db
│   ├── eslint-config
│   ├── store
│   ├── typescript-config
│   └── ui
├── tsconfig.json
└── turbo.json
```

---

## 🛡 License
Paywall is available under the MIT License. Feel free to use and modify the code responsibly.

---

## 📖 Changelog
Refer to [`CHANGELOG.md`](https://github.com/Piyushrathoree/paywall/blob/main/CHANGELOG.md) for version history and updates.

---

## 📬 Contact
For queries or collaborations:
- Email: [support@paywall.com](mailto:support@paywall.com)
- LinkedIn: [Piyush Rathore](https://linkedin.com/in/piyushrathore--)
- Twitter: [@piyushrathoree](https://x.com/piyushrathoree)

---

## 🌟 Stargazers & Forkers
We appreciate your support! 🌟🍴

[![Stargazers](https://img.shields.io/github/stars/Piyushrathoree/paywall)](https://github.com/Piyushrathoree/paywall/stargazers) [![Forks](https://img.shields.io/github/forks/Piyushrathoree/paywall)](https://github.com/Piyushrathoree/paywall/network/members)
