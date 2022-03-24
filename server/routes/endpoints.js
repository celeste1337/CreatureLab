//middleware file - just kinda defines the endpoints and does the db querying :D

const express = require("express");
const dbo = require('../config/dbconnect');
const path = require('path');

//instance of the router
const routes = express.Router();

routes.route("/getAll").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("bodyparts")
        .find({})
        .toArray(function(err, result) {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
                res.json(result);
            }
        })
})


module.exports = routes;
