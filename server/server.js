const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Hardcoded user
const USER = {
    email: "admin@test.com",
    password: "123456",
    name: "Admin"
};

// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === USER.email && password === USER.password) {
        return res.json({
            success: true,
            name: USER.name
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid Credentials"
    });
});

// In-memory tasks
let tasks = [
    {
        id: 1,
        title: "Prepare Weekly Report",
        status: "Pending"
    }
];

// Get tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        ...req.body
    };

    tasks.push(task);

    res.json(task);
});

// Update task
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.map(task =>
        task.id === id ? { ...task, ...req.body } : task
    );

    res.json({ success: true });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});