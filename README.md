# 🎮 Netflix Clone 

A full-stack, responsive **Netflix Clone** built with **React.js**, **Vite**, **TMDB API**, and **Node.js + Express + MongoDB**. This project replicates the modern Netflix UI and integrates dynamic content fetching and user authentication.

## 🚀 Features

*  **Modern & Responsive UI** built with React and CSS
*  **Netflix-inspired** dark theme and layout
*  **Dynamic movie data** from TMDb API
*  **Interactive hover effects** on thumbnails
*  **Mobile-first** design using Flexbox and CSS Grid
*  **User Authentication** (Login/Register) using **Node.js, Express, and MongoDB**
*  Built with **Vite** for fast development and optimized builds

## 🧪 Tech Stack

### Frontend:
* **React.js** (with Hooks and functional components)
* **Vite** (blazing-fast dev server and builds)
* **Axios** for API requests
* **TMDb API** for dynamic content
* **Google Fonts** for modern typography

### Backend:
* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose)
* **bcrypt** for password hashing
* **JWT** for secure authentication
* **CORS** & **dotenv** for environment management

## 🛠️ Getting Started

1. **Clone the Repository**

```
git clone https://github.com/hija-happy/Netflix-Clone.git
```

2. **Navigate to the Project**

```
cd Netflix-Clone
```

3. **Install Frontend Dependencies**

```
cd client
npm install
```

4. **Install Backend Dependencies**

```
cd ../server
npm install
```

5. **Set Up Environment Variables**
Create a `.env` file inside the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
```

6. **Run the Backend Server**

```
npm run dev
```

7. **Run the Frontend (React + Vite)**

```
cd ../client
npm run dev
```

## 🧪 API Integration

*  API Key from **TMDb**
*  Fetch trending, popular, top-rated movies and TV shows
*  Use Axios to consume endpoints in the frontend

## 🔐 Authentication

*  **Register/Login** functionality
*  Passwords hashed with bcrypt
*  JWT-based session management
*  Secure routes for user-specific features

## 📌 Upcoming Features

*  Search functionality
*  Movie detail pages
*  User watchlist & favorites (protected routes)
*  Advanced filtering & sorting

## 🙌 Acknowledgments

* Inspired by Netflix UI
* Movie data powered by TMDb API

## ⚠️ Disclaimer

This project is built for educational and personal portfolio purposes. It is not affiliated with or endorsed by Netflix or TMDb.
