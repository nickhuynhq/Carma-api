require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static('public'))
const cors = require('cors')
const carRoutes = require("./routes/cars.js")
const userRoutes = require("./routes/users.js")
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.use("/cars", carRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});