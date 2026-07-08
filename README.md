# 🛒 E-Commerce Web Application

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-3FA037?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>

<p align="center">
A modern full-stack E-Commerce platform built using the <strong>MERN Stack</strong>. The application provides a seamless online shopping experience with secure authentication, product browsing, shopping cart management, and secure online payments.
</p>

---

# 📖 Overview

This project is a full-featured E-Commerce web application developed using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. It enables users to browse products, add items to their cart, securely place orders, and complete payments using Razorpay.

The frontend is built with **React + Vite** for a fast and responsive user experience, while the backend uses **Node.js**, **Express.js**, and **MongoDB** to provide scalable APIs and secure data management.

---

# ✨ Features

## 👤 User Features

* User Registration & Login
* Secure JWT Authentication
* Browse Products
* Product Details Page
* Search Products
* Shopping Cart
* Update Cart Quantity
* Checkout System
* Razorpay Payment Gateway
* Place Orders
* Responsive User Interface

## 🛠 Admin Features

* Product Management
* User Management
* Order Management
* Inventory Management

---

# 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript (ES6+)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Razorpay API

---

# 📂 Project Structure

```text
E-Commerce/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── PERFORMANCE.md
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/mayankcharde/E-Commerce.git

cd E-Commerce
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_SECRET=your_razorpay_secret
```

Run the backend server:

```bash
npm start
```

or

```bash
node server.js
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔒 Environment Variables

| Variable        | Description               |
| --------------- | ------------------------- |
| PORT            | Backend Server Port       |
| MONGO_URI       | MongoDB Connection String |
| JWT_SECRET      | JWT Secret                |
| RAZORPAY_KEY_ID | Razorpay Public Key       |
| RAZORPAY_SECRET | Razorpay Secret Key       |

---

# 💳 Payment Integration

The application uses **Razorpay** for secure online payments.

### Features

* Secure Checkout
* Payment Verification
* Order Confirmation
* Fast & Reliable Transactions

---

# 📦 API Modules

* Authentication
* Products
* Cart
* Orders
* Payments
* Users

---

# 🔐 Authentication & Security

* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Authentication Middleware
* Secure User Sessions

---

# 🎨 Frontend Highlights

* Responsive Design
* Fast Vite Development
* Modern UI
* Reusable Components
* Optimized Performance

---

# ⚡ Performance

* Fast React Rendering
* Optimized MongoDB Queries
* Efficient Express APIs
* Lightweight Vite Build
* Responsive Across Devices

---

# 🚀 Future Enhancements

* Wishlist Functionality
* Product Reviews & Ratings
* Coupon & Discount System
* Email Notifications
* Order Tracking
* Admin Analytics Dashboard
* Product Recommendations
* Multiple Payment Methods
* Dark Mode
* Multi-language Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is intended for educational and learning purposes.

---

# 👨‍💻 Author

**Mayank Charde**

* GitHub: https://github.com/mayankcharde

If you found this project useful, consider giving it a ⭐ on GitHub!
