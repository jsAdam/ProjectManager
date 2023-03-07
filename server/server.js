const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/projects"));
app.use(require("./routes/boards"));

const dbo = require("./db/conn");

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });

    console.log(`Listening on port ${port}`);
});