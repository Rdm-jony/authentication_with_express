# 🔐 Express.js Authentication with Verification Code

This project is a simple authentication system using Express and Mongoose where users sign up with email, receive a random verification code, and must verify it to activate their account.

---

## 📁 Folder Structure

<pre>
src/
├── app/
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server start file
│
├── controller/
│   └── user_controller.ts   # All user routes and logic
│
├── interface/
│   └── user_interface.ts    # TypeScript interfaces
│
├── model/
│   └── user_model.ts        # Mongoose user schema and methods

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

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Server framework
- **TypeScript** – For safer, typed code
- **MongoDB** – Database
- **Mongoose** – MongoDB ORM
- **bcrypt** – Password hashing
- **crypto** – Generate random code

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

   ✅ Add JWT for session/token-based auth

   🔒 Role-based access (user/admin)

   📲 Add phone OTP (optional)




git clone https://github.com/Rdm-jony/authentication_with_express.git
cd authentication_with_express
npm install
npm run dev




