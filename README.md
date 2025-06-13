# 📁 File Manager Backend - Node.js + MongoDB

This is a backend project built using **Node.js**, **Express**, and **MongoDB** that allows users to create, read, update, and delete files using the `fs` module. File metadata is stored in MongoDB, and each file can be accessed via dynamic routes.

---

## 📌 Features

- 📄 Create text files dynamically
- ✏️ Update file content
- ❌ Delete files
- 🔍 View file content on specific routes
- 🧠 MongoDB stores file metadata (filename, route, timestamp)
- 🛠️ Built using `fs`, Express.js, and MongoDB

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Native `fs` module

---

## 🗂️ Folder Structure

project_1/
├── routes/
│ └── files.js
├── models/
│ └── File.js
├── controllers/
│ └── fileController.js
├── app.js
├── package.json

yaml
Copy
Edit

---

## 🚀 Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/Aditya-Singh714/FileOps---Node.js-MongoDB-Based-File-Manager-API.git
Install dependencies

bash
Copy
Edit
npm install
Set up MongoDB
Make sure MongoDB is running locally or provide a cloud connection string.

Run the server

bash
Copy
Edit
npm start
📬 API Endpoints
Route	Method	Description
/create	POST	Create a new file
/update/:name	PUT	Update a file
/delete/:name	DELETE	Delete a file
/files/:name	GET	Read a file’s content

📘 Example File Document
json
Copy
Edit
{
  "filename": "about.txt",
  "createdAt": "2025-06-13T10:45:00Z",
  "route": "/files/about"
}
✅ What You Learn
Node.js file system handling

RESTful API design

MongoDB integration

CRUD logic + route management
