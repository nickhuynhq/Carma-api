require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static('public'))
const cors = require('cors')
const carRoutes = require("./routes/cars.js")
const userRoutes = require("./routes/users.js")
const savedVehicleRoutes = require("./routes/saved-vehicles.js")
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.use("/cars", carRoutes);
app.use("/users", userRoutes);
app.use("/saved-vehicles", savedVehicleRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});