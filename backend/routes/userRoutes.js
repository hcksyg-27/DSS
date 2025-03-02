const express =  require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = require("../config/database");   


const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], function (err, row) {
        callback(err, row);
    });
};

//register user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;



    // Check if user exists
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (user) return res.status(400).json({ error: "User already exists." });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("User registered:", name);
        // Insert into database
        db.run(
            "INSERT INTO users (username, email, password, role, totalScans) VALUES (?, ?, ?, ?, ?)", 
            [name, email, hashedPassword, 'user', 0], 
            function (err) {
                if (err) {
                    console.error("Databases error:", err.message); 
                    return res.status(500).json({ error: "Databases error: " + err.message });
                }
                res.json({ message: "User registered successfully!",  });
            }
        );
        
    });
});

//Login User
router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    findUserByEmail(email, async (err, user) => {
        if(!user) return res.status(401).json({error: "User not found, Please register first."});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) return res.status(401).json({error: "Invalid password."});

        if(!process.env.ACCESS_TOKEN_SECRET) return res.status(500).json({error: "JWT secret not found."});
        
        const token = jwt.sign({ id: user.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
        console.log("User logged in:", user);
        
        res.json({
            token,
            user: user,
        });
    });
});

module.exports = router;