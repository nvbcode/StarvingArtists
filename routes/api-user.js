// Requiring our models
const db = require('../models');
const path = require('path');


module.exports = function (app) {


  //Create a row for user.
  app.post('/api/users', function (req, res) {

    console.log(req.body);
    // added a conditional for duplicate users 

    db.User.findAll({
      where: {
        username: req.body.userName
      }
    }).then(userRes => {
      if (userRes.length >=1) {
        return res.status(422).json({
          message: "Username exists"
        });
      } else {
        console.log(req.body);
        // changing req.body to account for username and password
        db.User.create({
          username: req.body.userName,
          password: req.body.password
        }).then(function (rows) {
          res.json({
            User: rows.id,
            Status: "Created"
          });
        }).catch(function (error) {
          res.json({ error: error });
        });

      }
    }).catch();

  });

}