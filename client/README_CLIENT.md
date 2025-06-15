# LearnSphere Frontend

This is the **React-based frontend** for **LearnSphere**, an online learning platform similar to Udemy. It provides an interface for both students and instructors to explore, manage, and interact with courses.

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── assets/               # Illustrations and images
│   ├── components/           # Reusable UI components (layout, common, navbar)
│   ├── pages/                # Pages for auth, dashboard, courses
│   ├── routes/               # Route configuration
│   ├── services/             # API integration using axiosInstance
│   ├── store/                # Redux Toolkit slices
│   └── utils/                # Utility files like theme management
```

## 🚀 Features

- Student & Instructor Dashboards
- Course browsing & enrollment
- Role-based access
- Dark mode support (central toggle)
- Secure lesson viewer (video, PDF, article)
- Upload content with signed URLs
- Responsive layout with Tailwind CSS

## 🛠️ Tech Stack

- React + Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- CloudFront Signed URLs for secure content

## 🔧 Setup Instructions

```bash
cd client
npm install
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the `client` directory:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🔍 Notes

- Make sure the backend server is running on the specified base URL.
- Only one dark mode toggle is present in the Topbar which controls site-wide theming.

---

_Last updated on 2025-06-15_
