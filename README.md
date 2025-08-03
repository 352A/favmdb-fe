# FavMDB Frontend

A React + Vite + TypeScript frontend for **FavMDB**, a modern web application to manage your favorite movies and TV shows.

## 🚀 Features

- Add, edit, and delete entries for movies and TV shows
- Infinite scroll with cursor-based pagination
- Filter entries by type, year, and director
- Responsive table display with clean UI
- User authentication (login/signup/logout)
- Modern styling with Tailwind CSS and Shadcn UI

## 🧰 Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Routing**: React Router
- **State Management**: React Hooks + Context API
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/352A/favmdb-frontend.git
cd favmdb-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🧪 Run the App

```bash
npm run dev
```

App should now be running at `http://localhost:5173`

---

## 📁 Folder Structure

```bash
favmdb-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── hooks/
│   ├── lib/
│   ├── context/
│   ├── types/
│   └── App.tsx
├── public/
├── .env
├── index.html
└── vite.config.ts
```

---

## 🔐 Authentication

- Auth is handled via token-based login (JWT)
- User state is persisted across sessions using cookies
- Protected routes redirect unauthenticated users to the login page

---

## 🧩 Features Overview

- Add new entry via modal form
- Edit entries with modal form
- Delete with confirmation modal
- Infinite scroll powered by intersection observer and backend cursor
- Filters apply instantly and combine with pagination
- UI adapts well on mobile and desktop

---

## 🧑‍💻 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📬 Contact

For any questions or feedback, feel free to reach out to [ahmed95elhadad@gmail.com](mailto:ahmed95elhadad@gmail.com).

---

## 📄 License

This project is licensed under the MIT License.
