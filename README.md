# 🔐 Express.js Authentication with JWT & Verification Code
This project is a secure authentication system using Express, Mongoose, and JWT stored in cookies. Users register with an email, receive a one-time verification code, and must verify their account before signing in.

---

## 📁 Folder Structure

<pre>
src/
├── app/
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server start file
│
├── controller/
│   └── user_controller.ts     # All user routes and logic
│
├── interface/
│   └── user_interface.ts      # TypeScript interfaces
│
├── middleware/
│   └── auth_middleware.ts     # JWT authentication middleware
│
├── model/
│   └── user_model.ts          # Mongoose user schema and methods
│
├── utils/
│   └── jwt.ts                 # JWT generation and cookie utilities

<pre>


---

## 🚀 Features

- ✅ User Sign Up with email & password
- ✅ Password is hashed using bcrypt
- ✅ Generates random `verificationCode` at signup
- ✅ Code expires after 5 minutes
- ✅ Separate route to verify code
- ✅ Resend new verification code if expired
- ✅ Block login until verification is complete
- ✅ JWT token generation on login
- ✅ Token stored securely in HTTP-only cookie
- ✅ JWT middleware to protect routes



---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Server framework
- **TypeScript** – For safer, typed code
- **MongoDB** – Database
- **Mongoose** – MongoDB ORM
- **bcrypt** – Password hashing
- **crypto** – Generate random code
- **jsonwebtoken** – JWT creation and validation
- **cookie-parser ** – Handle cookies in requests
---

## 📡 API Routes

### 📝 Auth Routes

| Method | Route                  | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/signup`              | Register new user with email      |
| POST   | `/signin`              | Login (only if verified)          |
| POST   | `/verify`              | Submit verification code          |
| POST   | `/resend-code/:email`  | Resend a new code if expired      |

---

🔮 Future Improvements

   📨 Email service integration (e.g. Nodemailer)

   🔒 Role-based access (user/admin)

   📲 Add phone OTP (optional)




git clone https://github.com/Rdm-jony/authentication_with_express.git
cd authentication_with_express
npm install
npm run dev




