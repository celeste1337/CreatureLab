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

routes.route("/getPart/:id").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    
    dbConnect
        .collection("bodyparts")
        .findOne({creatureId: req.params.id})
        .then((result) => {
            res.json(result)})
        .catch(err => console.log(err))
    
})

routes.route("/savePart").post(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect.collection("bodyparts")
        .insertOne({
            creatureid: req.body.id,
            type: req.body.type,
            data: req.body.data,
            createdOn: req.body.createdOn
        });
    
    const cursor = dbConnect.collection('bodyparts').find({creatureId: req.body.id})
    res.json(cursor);
    //
});

routes.route("/getAllCreatures").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect.collection("completedcreatures")
        .find({})
        .toArray(function(err, result) {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
                res.json(result);
            }
        })
    //
});

routes.route("/getRandomPart/:bodyPart").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect.collection("bodyparts")
    .aggregate([
        //match certain trait
        //
        {$match: {type:req.params.bodyPart}},
        {$sample: {size:1}}
    ])
    .toArray(function(err, result) {
        if(err) {
            res.status(400).send("error fetching the guys")
        } else {
            res.json(result);
        }
    })
    //
});

module.exports = routes;
