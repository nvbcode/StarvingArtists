// Connect to models
const db = require('../models');


module.exports = function (customerID, cb) {

    // Get Event data for the customer
    db.Event.findAll({
        include: [{
            model: db.Customer
        }],
        where: {
            Customerid: customerID
        }
    }).then(function (dbEvent) {
        cb(dbEvent);
    }).catch(function (error) {
        res.json({ error: error });
    });

        

}