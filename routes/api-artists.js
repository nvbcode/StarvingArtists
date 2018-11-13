// Requiring our models
const db = require('../models');

//Using these two files for posting and getting from/to review table.
const artistReview = require('./artistReview.js');

module.exports = function (app) {

    //Provide the customer's information and linked events
    app.get('/api/artists/:id', function (req, res) {

        db.Artist.find({ where: { UserId: req.params.id } })
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
                        reviews: reviewArray
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

        db.Artist.create(artist).then(function (rows) {

            res.json({
                ArtistId: rows.dataValues.id,
                Status: "Created"
            });

        }).catch(function (error) {
            res.json({ error: error });
        });

    });

    //Update the artist information
    app.put("/api/artists/:id", function (req, res) {

        const updatedArtist = {
            id: req.params.id,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            demo: req.body.demo,
            city: req.body.city,
            state: req.body.state,
            profile_pic: req.body.profilePic,
            UserId: req.body.UserId
        }

        db.Artist.update(updatedArtist, {
            where: {
                id: req.params.id
            }
        }).then(function (dbPut) {
            res.json({
                Artist_ID: req.params.id,
                Status: "Artist Updated"
            });
        }).catch(function (error) {
            console.log(error);
            res.json({ Error: error });
        });


    });


}