// Requiring our models
const db = require('../models');
const artistReview = require('./artistReview.js');
const creatingReview = require('./addingReview.js');

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
    app.post("/api/artists", function (req, res) {

        const artistData = req.body;

        console.log("artistData", artistData);

        const artist = {
            first_name: artistData.firstName,
            last_name: artistData.lastName,
            demo: artistData.demo,
            city: artistData.city,
            state: artistData.state,
            profile_pic: artistData.profilePic,
            UserId: artistData.id
        }

        console.log("Artist", artist);

        db.Artist.create(artist).then(function (rows) {

            console.log("Rows", rows.dataValues.id);

            //Calling the function in addingReview.js to add the review.
            creatingReview(artistData.reviews, rows.dataValues.id, function(){
                res.json({
                    ArtistId: rows.id,
                    Status: "Created"
                });
            
            });
                
        }).catch(function (error) {
            res.json({ error: error });
        });

    });


    //Create a row in Artists table.
    // app.post("/api/reviews", function (req, res) {

    //     db.Review.create(req.body).then(function (rows) {
    //         res.json({
    //             Review: rows.id,
    //             Status: "Created"
    //         });
    //     }).catch(function (error) {
    //         res.json({ error: error });
    //     });

    // });

}