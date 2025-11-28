### ProU Employee & Task Management – Frontend

A modern, lightweight React + Tailwind CSS frontend designed for the ProU Recruitment Assessment.
Includes full authentication UI, dashboard layout, employee CRUD, task CRUD, and custom routing without any build tools.

### 🚀 Features

Fully responsive UI built with Tailwind CSS

No build tools — uses React UMD + ES Modules

## Pages:

/login

/signup

/dashboard

## Modular components:

AuthForm.js

Dashboard.js

EmployeeForm.js

TaskForm.js

Clean ProU-themed UI with hero section

Custom client-side router using history.pushState

Automatic redirect after login/signup

Logout support

Works seamlessly with the SQLite API backend

#### 🗂️ Frontend File Structure
frontend/
│── index.html
│── app.js
│── AuthForm.js
│── Dashboard.js
│── EmployeeForm.js
│── TaskForm.js
│── README.md

### 📌 Pages & Navigation
## 1. /login

Default route
Displays login form
User logs in → redirected to /dashboard

## 2. /signup

Signup form
After successful signup → redirects back to /login

## 3. /dashboard

Only accessible after login
Contains:

Employee form + employee list

Task form + task list

Logout button

#### 🔧 How to Run Frontend

Frontend runs automatically when backend serves static files.

The backend serves this folder using:

```
app.use(express.static(frontendPath));
```
Visit:

```
http://localhost:4000/login
http://localhost:4000/signup
http://localhost:4000/dashboard
```

### 📸 Screenshots

Add screenshots below:

### 🔹 Login Page

<img width="1917" height="833" alt="image" src="https://github.com/user-attachments/assets/14f4cfc2-a444-423f-81fc-a7bfb6c8651a" />


### 🔹 Signup Page

<img width="1913" height="870" alt="image" src="https://github.com/user-attachments/assets/22aa2749-0653-49a9-add7-edf866d3650e" />


### 🔹 Dashboard

<img width="1918" height="970" alt="image" src="https://github.com/user-attachments/assets/df68f9f6-5066-42ef-8388-8eb92a4cc083" />

### 📝 Note

All routing is handled inside app.js

No external Router library used

Designed to match ProU Technology design language
