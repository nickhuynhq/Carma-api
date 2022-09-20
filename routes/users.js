const express = require("express");
const router = express.Router();
const knex = require("knex")(require('../knexfile'));


router.get("/", async (req, res) => {
    knex
        .select("*")
        .from("users")
        .then(userData => {
            res.json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

router.get("/:userId", async (req, res) => {
    knex
        .select("*")
        .from("users")
        .where("id","=", req.params.userId)
        .then(userData => {
            res.json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});



module.exports = router;