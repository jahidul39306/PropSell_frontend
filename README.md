# 🏡 PropSell

![PropSell Screenshot](Screenshot.png) <!-- Replace with an actual screenshot -->

## 📌 Project Overview

**PropSell** is a **real estate management system** that allows users to buy properties, agents to list properties, and admins to manage the system. The platform is designed with **secure authentication, a review system, Stripe payment integration, and a fully responsive interface** for all devices.

🔗 **Live Project:** [PropSell](https://propsell-6cc42.web.app)

---

## 🚀 Technologies Used

### **Frontend**
- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React](https://react.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- ✨ [DaisyUI](https://daisyui.com/)
- 🔀 [React Router Dom](https://reactrouter.com/en/main)
- 🔄 [Axios](https://axios-http.com/)
- ⚙️ [TanStack React Query](https://tanstack.com/query/latest)

### **Backend**
- 🌍 [Node.js](https://nodejs.org/)
- 🚀 [Express.js](https://expressjs.com/)
- 🛢️ [MongoDB](https://www.mongodb.com/)
- 🔐 [Firebase Authentication](https://firebase.google.com/)
- 🔑 [JSON Web Token (JWT)](https://jwt.io/)

---

## ✨ Key Features

✅ **Fully Responsive** – Works smoothly on mobile, tablet, and desktop.  
✅ **User Authentication** – Email/password login & Google authentication via Firebase.  
✅ **Property Management** – Agents can **add**, **update**, and **delete** properties.  
✅ **Property Reviews** – Users can leave **feedback** on properties.  
✅ **Stripe Payment Integration** – Secure online payments for property purchases.  
✅ **Secure API** – JWT-based authentication to protect user data.  
✅ **Efficient Data Fetching** – Uses TanStack React Query for optimized API calls.  
✅ **Error Handling** – Built-in mechanisms to manage common errors smoothly.  

---

## 📦 Dependencies

```json
{
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "lottie-react": "^2.4.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.4.0",
  "react-player": "^2.16.0",
  "react-router-dom": "^7.1.1",
  "react-toastify": "^11.0.2",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1"
}
```

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/jahidul39306/PropSell_frontend.git
cd PropSell_frontend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add your Firebase and Stripe API keys.

```env
VITE_apiKey=YOUR_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
VITE_appId=YOUR_APP_ID
VITE_IMAGE_HOSTING_KEY=YOUR_IMAGE_HOSTING_KEY
VITE_Payment_Gateway_PK=YOUR_PAYMENT_GATEWAY_PK
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### **4️⃣ Run the Development Server**
```sh
npm run dev
```
Now, open **http://localhost:5173** in your browser.

---

## 🔑 Admin Credentials for Testing
You can use the following admin credentials to explore the admin panel:

- **Email:** `admin@admin.com`
- **Password:** `@Asdfg`

---

## 🌐 Live Project & Resources

- **🔗 Live Website:** [PropSell](https://propsell-6cc42.web.app)
- **📚 React Query Docs:** [TanStack Query](https://tanstack.com/query)
- **🛒 Stripe Documentation:** [Stripe](https://stripe.com/docs)
- **🔐 Firebase Authentication:** [Firebase Auth](https://firebase.google.com/docs/auth)

---

## 🤝 Contributors

- **Jahidul Islam Noor** – [GitHub Profile](https://github.com/jahidul39306)
- Contributions welcome! Feel free to fork and submit pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 **Enjoy using PropSell!** 🏡✨
