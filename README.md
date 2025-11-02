# ⚡ React Request Sender

A lightweight React web app for sending and testing HTTP requests (GET, POST, PUT, DELETE, etc.)  
Designed for developers who want a clean and minimal alternative to tools like Postman or Insomnia — right in the browser.

---

## 🚀 Features

| Feature | Description |
|----------|--------------|
| 🌐 **Send HTTP Requests** | Supports all common methods: GET, POST, PUT, PATCH, DELETE. |
| 📝 **Custom Headers & Body** | Add custom request headers and JSON body easily. |
| 💬 **Instant Response Viewer** | Displays formatted JSON response with status code and headers. |
| 🔁 **Request History (Optional)** | Keeps recent requests in local storage. |
| 🧭 **Simple UI** | Clean, responsive design with minimal dependencies. |
| ⚙️ **Environment Friendly** | Works with public and local APIs (CORS-enabled). |

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| ⚛️ **React 18+** | Front-end framework |
| 🧰 **Axios / Fetch API** | For sending HTTP requests |
| 💅 **Tailwind CSS / CSS Modules** | For styling |
| 🧠 **React Hooks (useState, useEffect)** | For managing UI and API state |
| 🔧 **Vite / CRA (depending on setup)** | Build tool |

---

## ⚙️ Setup and Run

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/react-request-sender.git
cd react-request-sender
2️⃣ Install Dependencies
bash
Copy code
npm install
# or
yarn install
3️⃣ Run the Application
bash
Copy code
npm run dev
# or
yarn start
By default, the app runs on
👉 http://localhost:5173 (Vite) or http://localhost:3000 (CRA)

🧠 How to Use
Enter the API endpoint URL in the input field.

Choose the HTTP method (GET, POST, PUT, PATCH, DELETE).

(Optional) Add headers and body (for POST/PUT).

Click Send Request 🚀

View the formatted response below (status code, time, headers, JSON body)
