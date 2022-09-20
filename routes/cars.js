const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));


router.get("/", async (req, res) => {
    knex
        .select("*")
        .from("cars")
        .then(carData => {
            res.json(carData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

router.get("/search", async (req, res) => {
    knex
        .select("*")
        .from("cars")
        .where("brand","=", req.body.brand)
        .where("make","=", req.body.make)
        .where("year","=", req.body.year)
        .then(carData => {
            res.json(carData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

router.get("/:carId", async (req, res) => {
    knex
        .select("*")
        .from("cars")
        .where("id","=", req.params.carId)
        .then(carData => {
            res.json(carData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});



module.exports = router;