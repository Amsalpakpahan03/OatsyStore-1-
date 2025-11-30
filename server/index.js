const express = require('express');
const path = require('path');
const connectDB = require('./db');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Connect MongoDB
connectDB();

// JSON parser
app.use(express.json());

// // CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
// CORS FIX
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // FE address
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});


// Expose uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', orderRoutes);
app.use('/api/admin/products', productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server BE Oatsy Store berjalan di http://localhost:${PORT}`);
});
