const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));
const authorize = require("../functions.js")

router.get("/", authorize, async (req, res) => {

    knex
        .select("name", "dob", "email", "gender","province", "city","commute_distance", "commute_days","cars.car_id","brand","make","year","image", "rating")
        .from("saved_vehicles")
        .join("cars", "cars.car_id", "saved_vehicles.car_id")
        .join("users", "users.user_id", "saved_vehicles.user_id")
        .where("saved_vehicles.user_id", "=", req.userId)
        .then(data => {
            // check if User has any cars in Vehicle List
            if (data.length === 0){
                knex
                    .from("users")
                    .where("user_id", "=", req.userId)
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(500).json({error});
                        console.log(error)
                    })
            } else {
                res.status(200).json(data);
            }
        })
        .catch(error => {
            res.status(500).json({error});
            console.log(error)
        })
});

router.post("/add", authorize, async (req, res) => {
    knex('saved_vehicles')
        .insert({ 
            "car_id": req.body.car_id,
            "user_id": req.userId
        })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({error});
            console.log(error)
        })
});

router.delete("/delete", authorize, async (req, res) => {

    knex("saved_vehicles")
        .where("user_id", "=", req.userId)
        .andWhere("car_id", "=", req.body.car_id)
        .del()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({error});
            console.log(error)
        })
});

module.exports = router;