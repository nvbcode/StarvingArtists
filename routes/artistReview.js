const db = require("../models");

module.exports = function (artistID, cb) {

    db.Review.findAll({
        include: [{
            model: db.Artist
        }],
        where: {
            Artistid: artistID
        }
    }).then(function (dbReview) {
        console.log(dbReview);
        cb(dbReview);
    }).catch(function (error) {
        console.log(error);
        res.json({ error: error });
    });

    
}