// Requiring our models
const db = require('../models');
const path = require('path');


module.exports = function (app) {

    app.post('/api/user', function (req, res) {

        console.log(req.body);

        res.sendFile(path.join(__dirname, './public/client.html'));


        //     db.Product.findAll({
        //     }).then(function (dbProduct) {
        //       res.json(dbProduct);
        //     }).catch(function (error) {
        //       res.json({ error: error });
        //     });
        //   });

    });

}