const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const projectRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
projectRoutes.route("/projects").post(function (req, response) {
    let db_connect = dbo.getDb();

    let myobj = {
        name: req.body.name,
        description: req.body.description,
        visibility: req.body.visibility,
        userID: req.body.userID
    };

    db_connect.collection("projects").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = projectRoutes;