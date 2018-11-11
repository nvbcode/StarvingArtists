// Requiring our models
const db = require('../models');
const artistReview = require('./artistReview.js');

module.exports = function (app) {

    //Provide the customer's information and linked events
    app.get('/api/artists/:id', function (req, res) {

        db.Artist.find({ where: { id: req.params.id } })
            .then(function (artist) {

                const reviewArray = [];

                //Get a review information in artistReview.js
                artistReview(artist.id, function (reviews) {
                    reviews.forEach(review => {
                        const reviewData = {
                            id: review.id,
                            review_rate: review.review_rate,
                            review_body: review.review_body
                        }

                        reviewArray.push(reviewData);

                    });

                    //Create a requested data
                    const reviewInfo = {
                        id: artist.id,
                        first_name: artist.first_name,
                        last_name: artist.last_name,
                        demo: artist.demo,
                        city: artist.city,
                        state: artist.state,
                        profile_pic: artist.profile_pic,
                        review: reviewArray
                    }
                    res.json(reviewInfo);
                });
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //Create a row in Artists table.
    app.post("/api/artists", function(req, res){

        db.Review.create(req.body).then(function (rows) {
            res.json({
              Review: rows.id,
              Status: "Created"
            });
          }).catch(function (error) {
            res.json({ error: error });
          });

    });


    //Create a row in Artists table.
    app.post("/api/reviews", function(req, res){

        db.Review.create(req.body).then(function (rows) {
            res.json({
              Review: rows.id,
              Status: "Created"
            });
          }).catch(function (error) {
            res.json({ error: error });
          });

    });

}