# 🏡 Staybnb — A Full-Stack Airbnb Clone

**Staybnb** is a full-featured, full-stack web application inspired by [Airbnb](https://www.airbnb.com). Built using the **MERN** stack (MongoDB, Express, Node.js) and EJS templating, it enables users to browse, create, and manage listings, with robust authentication, secure user data handling, and interactive map integration.

## 🌐 Live Site

👉 [Staybnb Live](https://staybnb-project.onrender.com)

## 📌 Project Overview

I built Staybnb to explore full-stack web development and implement real-world features like user authentication, CRUD operations, file uploads, and map-based listings. It’s designed for performance, security, and scalability — using industry-standard tools and practices.

## 🛠️ Technologies Used

### 🔧 Backend

- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Web framework for routing and middleware
- **MongoDB** – NoSQL database for flexible data storage
- **Mongoose** – Object modeling for MongoDB
- **Passport.js** – Authentication middleware
  - `passport-local`
  - `passport-local-mongoose`
- **dotenv** – Environment variable management

### 🖼️ Frontend

- **EJS** – Embedded JavaScript templates for dynamic rendering

### 🧩 Middleware & Utilities

- **Multer** – File uploads (images)
- **Cloudinary** – Cloud-based image storage
- **Connect-Flash** – Flash messaging
- **Connect-Mongo** – MongoDB session storage
- **Cookie-Parser** – Cookie management
- **Joi** – Data validation


## ✨ Key Features

- 🔐 **User Authentication** (Register, Login, Logout)
- 📍 **Create, Edit, Delete Listings**
- 📝 **Review System** (Add & delete reviews)
- 🗂 **Image Uploads** (Stored via Cloudinary)
- 🔒 **Secure Password Handling** with hashing
- 📁 **Session Management** with MongoDB store
- 📋 **Form Validation** with Joi

## 🚀 Getting Started

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ishivadev/Staybnb.git
   cd Staybnb


## 📁 Folder Structure

<pre> ``` Staybnb/ ├── models/ # Mongoose models ├── routes/ # Express route handlers ├── views/ # EJS templates ├── public/ # Static assets (CSS, JS, Images) ├── controllers/ # Route logic separated from routes ├── middleware/ # Custom middleware ├── utils/ # Helpers & configuration ├── app.js # Entry point ├── .env # Environment variables (not committed) ├── package.json ``` </pre>


## 🧪 Future Improvements
💳 Payment integration with Stripe
🔔 Notifications for reviews or messages
📬 Contact host messaging system
📊 Admin dashboard for listing analytics
📱 Mobile-first redesign


🤝 Contributing
Contributions are welcome! Open issues, suggest features, or fork and submit a PR. Make sure to follow the existing coding style and structure.

📄 License
This project is open-source and available under the MIT License.
---
Let me know if you’d like a version with icons, screenshots, or badges for GitHub stars, issues, and forks!

