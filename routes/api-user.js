// Requiring our models
const db = require('../models');
const path = require('path');


module.exports = function (app) {


    //Create a row for user.
    app.post('/api/users', function (req, res) {

        console.log(req.body);

        db.User.create(req.body).then(function (rows) {
            res.json({
              User: rows.id,
              Status: "Created"
            });
          }).catch(function (error) {
            res.json({ error: error });
          });

    });

}