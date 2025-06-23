const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "users.json";

// Load or initialize user storage
let users = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE));
} else {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Sign up API
app.post("/api/signup", (req, res) => {
  const { name, phone, password } = req.body;
  if (users.find((u) => u.phone === phone)) {
    return res.status(409).json({ message: "User already exists" });
  }
  const newUser = { name, phone, password };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: "Signup successful" });
});

// Login API
app.post("/api/login", (req, res) => {
  const { phone, password } = req.body;
  const user = users.find((u) => u.phone === phone && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", user });
});

// Admin access
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
