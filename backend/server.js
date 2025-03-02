require('dotenv').config();
const cors = require('cors');
const express = require('express');

// const adminRoutes = require("./routes/adminRoutes");
// app.use("/api", adminRoutes);


const app = express();
app.use(express.json());

// Add this middleware to allow frontend requests
app.use(cors());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Import User too ensure the table is created
// require("./models/User");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
