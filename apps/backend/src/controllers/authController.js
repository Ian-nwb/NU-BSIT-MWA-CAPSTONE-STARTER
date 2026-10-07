const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock database (Replace with your actual DB logic later)
const users = [];

const register = async (req, res) => {
    const { username, password } = req.body;

    // 1. Check if user exists
    const userExists = users.find(u => u.username === username);
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save User
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    // 1. Find user
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate Token
    const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.json({ token });
};

module.exports = { register, login };