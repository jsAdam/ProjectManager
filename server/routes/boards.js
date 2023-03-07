const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const boardRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you create a new record.
boardRoutes.route("/boards").post(function (req, response) {
    let db_connect = dbo.getDb();

    let myobj = {
        name: req.body.name,
        projectID: req.body.projectID
    };

    db_connect.collection("boards").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = boardRoutes;
