const knex = require("knex")(require('./knexfile'));
const express = require('express');
const app = express();
const PORT = 8080;

app.get("/cars", async (req, res) => {
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


// app.get("/posts", (req, res) => {
//     knex
//         .select("*")
//         .from("post")
//         .join("user", "user.id", "=", "post.user_id")
//         .then(postData => {
//             res.json(postData);
//         })
//         .catch(error => {
//             res.status(500).json({error});
//         })
// });

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});