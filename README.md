✅ **3 things learned:**  
1. Implementing **FullCalendar** with **resource timeline**.  
2. Managing **event persistence** using **local storage**.  
3. Adding **dark mode toggle** with **UI state persistence**.  

✅ **Most difficult part:**  
- Ensuring **events update correctly** (drag, drop, resize) and persist properly.  


# Resource Calendar App

This is a **React.js** application that utilizes **FullCalendar** with **resource timeline** and **event management** features. It supports **dark mode**, **drag & drop**, **event persistence**, **today highlighting**, and **random event colors**.

## Features
- 📅 **FullCalendar** with **resource timeline**
- 🌙 **Dark mode toggle**
- 🎨 **Random colors for events**
- 🔄 **Persistent data using local storage**
- ⏳ **Drag, drop, resize events**
- 📍 **Highlight today's date**
- 🗑️ **Delete notes/events**
- 📌 **Scroll to today's date when clicking "Today" button**

---

## 📦 Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (>=16.0.0)
- **npm** or **yarn**

### Clone the Repository
```sh
git clone [https://github.com/your-repo/resource-calendar.git](https://github.com/saurabhkumar067/Assignment-Guestara.git)
```

### Install Dependencies
Using **npm**:
```sh
npm install
```

Or using **yarn**:
```sh
yarn install
```

### Start the Development Server
```sh
npm run dev
```
OR
```sh
yarn dev
```

Now, open **http://localhost:5173** (or the provided URL) in your browser.

---

## 📂 Project Structure
```
resource-calendar/
│-- src/
│   ├── components/
│   │   ├── ResourceCalendar.jsx  # Main calendar component
│   │   ├── DarkModeToggle.jsx     # Dark mode toggle button
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│-- public/
│-- package.json
│-- README.md
│-- vite.config.js                  # Vite.js configuration
```

---

## 🛠️ Technologies Used
- **React.js** (Vite.js)
- **FullCalendar** (`@fullcalendar/react`, `@fullcalendar/resource-timeline`, `@fullcalendar/interaction`)
- **Tailwind CSS** (for styling)

---

## 🔧 Available Scripts
### Start Development Server
```sh
npm run dev
```
### Build for Production
```sh
npm run build
```
### Preview Production Build
```sh
npm run preview
```

---

## 📌 Notes
- Events are **stored in local storage**, so they persist between page reloads.
- Clicking **"Today"** scrolls to today's date and highlights it.
- Clicking an event allows you to **delete it**.
- Each event has a **random background color**.
- The application has a **dark mode toggle** that also persists in local storage.

---

## 📄 License
This project is **open-source**. You can modify and use it as needed.

