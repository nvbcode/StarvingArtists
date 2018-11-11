// Connect to models
const db = require('../models');

module.exports = function (reviewData, artistId, cb) {

    reviewData.forEach(r => {

        const review = {
            review_rate: r.rating,
            review_body: r.comment,
            ArtistId: artistId
        }

        db.Review.create(review).then(function (rows) {
            console.log("Here");
        }).catch(function (error) {
            res.json({ error: error });
        });

    });
    cb();
}