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

router.post("/register", async (req, res) => {
    knex
        .insert(
            {   
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                province: req.body.province,
                city: req.body.city,
                commute_distance: req.body.commute_distance,
                commute_days: req.body.commute_days,
            }
        )
        .into('users')
        .then(userData => {
            res.status(200).json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Login requires username and password fields"});
    }
    
    //SELECT * FROM `user` WHERE username="nickhuynh1" AND password="abc123"
    const foundUsers = await knex
        .select("*")
        .from("users")
        .where({ username: username})
        .andWhere({ password: password});

    if (foundUsers.length !== 1) {
        // not found user
        return res.status(401).json({ error: "Invalid login credentials" });
    } else {
        return res.status(200).json(foundUsers[0])
    }
});





module.exports = router;