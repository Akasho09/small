# 🧪 Frontend Developer Technical Test

This project is a frontend dashboard and public site built with **Next.js**, allowing full **CRUD** operations on posts using a modern tech stack. It interacts with the public API at [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🎯 Goal

Develop a fully functional dashboard and public-facing blog interface for managing and displaying posts.

---

## ⚙️ Tech Stack

- **Next.js** (Latest Version)
- **Tailwind CSS** — Utility-first CSS framework
- **shadcn/ui** — Pre-styled accessible UI components
- **React Query** — For data fetching, caching, and mutations
- **TipTap Editor** — For post body editing in a **Markdown Editor** style
- **TypeScript** — Type-safe development
- **Prisma** — Type-safe ORM for interacting with the database
- **PostgreSQL** — Persistent relational database


---

## 📋 Features

### 🛠 Admin Dashboard (`/admin`)

- Fully functional **CRUD operations** for posts:
  - ✅ **Create** a new post
  - 📄 **Read** all posts in a list view
  - ✏️ **Update** a post with editable fields
  - ❌ **Delete** a post
- Uses **TipTap** as a **Markdown-style Rich Text Editor** for writing and formatting the post body
- Responsive and accessible UI using `shadcn/ui`

### 🌐 Public Site (`/`)

- Displays all posts with:
  - Title
  - Small excerpt from the body
- Clicking on a post navigates to **Post Details Page** at `/posts/[id]`
- Clean layout and responsive design

---

## 🧱 Backend Integration
- Posts are persisted in a PostgreSQL database
- Prisma ORM is used for schema modeling, migrations, and type-safe queries
- On initial setup, posts are fetched from JSONPlaceholder and stored locally
- All API operations (GET, POST, PUT, DELETE) work with the local DB

## 🔐 Notes

- Authentication is **not required**
- All posts are considered to belong to a **single user**
- API used: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/frontend-dashboard-test.git
cd frontend-dashboard-test
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash 
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.



## 🧪 Development Notes
✍️ Rich text content is handled with TipTap configured as a Markdown Editor

🎨 Styling is done with Tailwind CSS for responsiveness and consistency

🔄 Data fetching/mutation is handled with React Query, providing efficient server-state management and caching

🧱 UI components are built using shadcn/ui and radix-ui


## 🌍 Deployment
    https://small09.vercel.app



## 📦 Deliverables

✅ GitHub repository with full source code

✅ README.md with setup and usage instructions

⭐ Bonus: Live deployment link on Vercel
