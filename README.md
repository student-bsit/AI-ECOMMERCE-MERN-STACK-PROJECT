🛒 E-Commerce Web App (MERN Stack)

A full-featured E-Commerce Web Application with a powerful Admin Panel for managing products, users, and orders. Built using the MERN stack with modern UI and real-time features.

🚀 Features

👤 User Side

User authentication (Login / Register)
Browse products with categories
Product details page
Add to cart / Remove from cart
Place orders
View order history
🛠️ Admin Panel
Admin dashboard
Add / Edit / Delete products
Manage users
View and update orders
Control inventory
🧑‍💻 Tech Stack

Frontend:

React.js
Redux / Context API
Tailwind CSS / CSS

Backend:

Node.js
Express.js

Database:

MongoDB

Other Tools:

JWT Authentication
Cloudinary (for image uploads)
Socket.IO (optional if used)


📂 Project Structure
/frontend     -> React frontend
/admin      -> Admin panel
/backend     -> Backend (API)
⚙️ Installation & Setup
1️⃣ Clone the repository

cd ecommerce-project
2️⃣ Setup Backend
cd backend
npm install

Create .env file in /server:

PORT=8000

MONGODB_URL=your Url

JWT_SECRET=your secret key
CLOUDINARY_API_SECRET=your key

Run backend:

npm run dev
3️⃣ Setup Frontend
cd frontend
npm install
npm start
4️⃣ Setup Admin Panel
cd admin
npm install
npm start

| Variable       | Description               |
| -------------- | ------------------------- |
| MONGO_URI      | MongoDB connection string |
| JWT_SECRET     | Secret for authentication |
| CLOUDINARY_URL | Image upload config       |

MONGO_URI	MongoDB connection string
JWT_SECRET	Secret for authentication
CLOUDINARY_URL	Image upload config
