const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));

router.get("/", async (req, res) => {
    knex
        .select("*")
        .from("cars")
        .then(userData => {
            res.json(userData);
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
        .then(userData => {
            res.json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

module.exports = router;