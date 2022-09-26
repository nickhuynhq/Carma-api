const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));
const authorize = require("../functions.js")


router.get("/", authorize, async (req, res) => {

    console.log(req.userId)

    knex
        .select("name", "dob","gender","province", "city","commute_distance", "commute_days","cars.car_id","brand","make","year","image", "rating")
        .from("saved_vehicles")
        .join("cars", "cars.car_id", "saved_vehicles.car_id")
        .join("users", "users.user_id", "saved_vehicles.user_id")
        .where("saved_vehicles.user_id", "=", req.userId)
        .then(carData => {
            console.log("cardata",carData)
            res.status(200).json(carData);
        })
        .catch(error => {
            res.status(500).json({error});
            console.log(error)
        })
});

module.exports = router;