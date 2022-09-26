const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const knex = require("knex")(require('../knexfile'));
require('dotenv').config()

const authorize = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return res.status(401).json({error: "Resource requires Bearer token in Authorization header"});
    }

    const splitBearerTokenString = bearerTokenString.split(" ");

    if (splitBearerTokenString.length !== 2) {
        return res.status(400).json({error: "Bearer token is malformed"});
    }

    const token = splitBearerTokenString[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Invalid JWT"});
        }

        req.userId = decoded.user_id;
        next();
    });
}

router.get("/", authorize, async (req, res) => {
    knex
        .select("*")
        .from("users")
        .then(userData => {
            res.staus(200),json(userData);
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
        }
    
        const user = foundUsers[0];
        console.log(user)
    
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET_KEY);    
        res.json({
            message: "Successfully logged in",
            token
        })
});


module.exports = router;