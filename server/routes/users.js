const express = require("express");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
const { serialize } = require("bson");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'albusinessblaine@gmail.com',
        pass: process.env.TRANSPORTER
    }
})
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const saltRounds = 10;

const SECRET = process.env.SECRET;

userRoutes.route("/users/login").post(async (req, res) => {
    let db_connect = dbo.getDb();
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    db_connect
        .collection("users")
        .find({username: req.body.username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
        {     
            if(docs.length > 0) //if exists
            {
                if(docs[0].password == hashedPassword) {
                    jwt.sign(
                        { username: req.body.username },
                        SECRET,
                        {
                            expiresIn: 60 * 60
                        },
                        (_err, token) => {
                            const serialized = serialize('token', token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict',
                                maxAge: 60 * 60 * 24 * 30,
                                path: '/',
                            });
                            res.setHeader('Set-Cookie', serialized);
                            return res.status(HTTP_STATUS_CODES.OK).json({
                                success: true,
                                message: "Success"
                            });
                        }
                    );
                } else {
                    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                        status: 'error',
                        error: 'Invalid password',
                    });
                }
            }
            else // if it does not 
            {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                    status: 'error',
                    error: 'Invalid username',
                });
            }
        });
});

userRoutes.route("/users/logout").post(async (req, res) => {
    const { cookies } = req;

    const jwt = cookies.token;

    if(!jwt) {
        return res.status(401).json({
            status: 'error'
        })
    }

    const serialized = serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    });

    res.setHeader('Set-Cookie', serialized);

    return res.status(200).json({
        status: 'success',
        message: 'Logged out'
    });
})

// This section will help you create a new record.
userRoutes.route("/users").post(async (req, res) => {
    const token = jwt.sign({
        data: req.body
    }, SECRET, { expiresIn: '10m' })

    console.log("WORKING");

    const mailConfigurations = {
        from: 'bugtracker-test@gmail.com',
        to: req.body.email,
        subject: 'Email Verification - no-reply',
        text: `Hi! There, You have recently visited 
            our website and entered your email.
            Please follow the given link to verify your email
            http://localhost:5000/users/verify/${token} 
            Thanks`
    }

    transporter.sendMail(mailConfigurations, function(error, info) {
        if (error) throw Error(error);
        console.log('Email sent successfully');
    })
});

userRoutes.route("/users/verify/:token").get(async (req, response) => {
    const {token} = req.params;
    let db_connect = dbo.getDb();

    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err) {
            console.log(err);
            response.json({ message: 'Email verification failed, link could be wrong or expired'});
        } else {
            let newUserData = decoded.data;

            console.log(newUserData);

            let hashedPassword = await bcrypt.hash(newUserData.password, saltRounds);
            let myobj = {
                email: newUserData.email,
                username: newUserData.username,
                password: hashedPassword
            };

            db_connect.collection("users").insertOne(myobj, function(err, res) {
                if (err) {
                    response.json({ message: "Something went wrong." });
                    throw err;
                }

                response.json(res);
            });

            //response.json({ message: 'Email verified successfully' });
        }
    })
});

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId( req.params.id )};
//     db_connect
//         .collection("records")
//         .findOne(myquery, function (err, result) {
//           if (err) throw err;
//           res.json(result);
//         });
// });

module.exports = userRoutes;