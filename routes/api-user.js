// Requiring our models
const db = require('../models');
const path = require('path');


module.exports = function (app) {


  //Create a row for user.
  app.post('/api/users', function (req, res) {

    console.log(req.body);

    db.User.create(req.body).then(function (user) {
      console.log(user);
      res.json(user);
    }).catch(function (error) {
      res.json({ error: error });
    });

  });

  app.get('/api/users/:id', function (req, res) {

    db.User.find({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    }).catch(function (error) {
      res.json({ Error: error });
    });

  });

  app.put('/api/users/:id', function(req, res){

      const updatedUser = {
        id: req.params.id,
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email,
        user_type: req.body.user_type
      }

      db.User.update(updatedUser, {
        where: {
          id: req.params.id
        }
      }).then(function (dbPut) {
        res.json({
            UserId: req.params.id,
            Status: "User ID Updated" 
        });
      }).catch(function (error) {
        console.log(error);
        res.json({Error: error});
      });

  });

}