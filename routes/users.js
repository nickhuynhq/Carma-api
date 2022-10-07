const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authorize = require("../functions.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.get("/", authorize, async (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((userData) => {
      res.staus(200), json(userData);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/:userId", authorize, async (req, res) => {
  knex
    .select("*")
    .from("users")
    .where("id", "=", req.params.userId)
    .then((userData) => {
      res.json(userData);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/register", async (req, res) => {
  // Use bcrypt to hash password before storing in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      // Store hashed password in variable
      if (!err) {
        knex
          .select("*")
          .from("users")
          .where({ username: req.body.username })
          .then((result) => {
            if (result.length > 0) {
              res.status(403).json({ message: "Username is already taken" });
            } else {
              knex
                .insert({
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  name: req.body.name,
                  dob: req.body.dob,
                  gender: req.body.gender,
                  province: req.body.province,
                  city: req.body.city,
                  commute_distance: req.body.commute_distance,
                  commute_days: req.body.commute_days,
                })
                .into("users")
                .then((userData) => {
                  res.status(200).json({ message: "Successfully logged in" });
                })
                .catch((error) => {
                  res.status(500).json({ error });
                });
            }
          });
      } else {
        return res.status(500).json({ Message: err });
      }
    });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Login requires username and password fields" });
  }

  // SELECT * FROM `user` WHERE username="nickhuynh1" AND password="abc123"
  const foundUsers = await knex
    .select("*")
    .from("users")
    .where({ username: username });

  // If no users found, send error message
  if (foundUsers.length !== 1) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  const user = foundUsers[0];

  // Use bcrypt to compare inputted password to the one in database
  return bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // Password is valid
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_SECRET_KEY
      );

      return res.json({
        message: "Successfully logged in",
        token,
      });
    }
    // Password is false
    return res.status(403).json({ error: "Invalid login credentials" });
  });
});

router.put("/edit", authorize, async (req, res) => {
  try {
    const response = await knex("users")
      .where("users.user_id", "=", req.userId)
      .update(req.body);
    if (response) {
      res.status(200).json({ updated: response });
      console.log(response);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
