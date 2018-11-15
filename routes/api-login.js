// Requiring our models
const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.post('/api/login', function (req, res) {
        console.log(req.body);
        db.User.findOne({
            where: {
                user_name: req.body.user_name,
            }
        }).then(function (userData) {
            if (!userData || req.body.password !== userData.password) {
                return res.status(401).json({
                    message: "Incorrect username or password."
                })
            } else {

                console.log(userData)

                jwt.sign({
                    user_name: userData.user_name,
                    id: userData.id,
                    user_type: userData.user_type
                }, 'voodoomagicjack', { expiresIn: '30m' }, (err, token) => {
                    res.json({
                        token: token,
                        id: userData.id,
                        user_type: userData.user_type
                    }).catch(err => {
                        res.json({ err });
                    });
                });
            }

        }).catch(function (err) {
            console.log(`error: ${err}`);
            res.json({ error: err });
        });
    });

    app.post('/api/signIn', function (req, res) {

        console.log(req.body);
        // added a conditional for duplicate users 

        db.User.findAll({
            where: {
                user_name: req.body.user_name
            }
        }).then(userRes => {

            // checking if Username already exists
            if (userRes.length >= 1) {
                return res.status(422).json({
                    message: "Username exists"
                });
            } else {
                // if username does not exists
                console.log(req.body);
                // creates
                db.User.create({
                    user_name: req.body.user_name,
                    password: req.body.password,
                    email: req.body.email,
                    user_type: req.body.user_type
                }).then(function (rows) {
                    res.json({
                        User: rows.id,
                        Status: "Created"
                    });
                }).catch(function (error) {
                    res.json({ error: error });
                });

            }
        });

    });
}

