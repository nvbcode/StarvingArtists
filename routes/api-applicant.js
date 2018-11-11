// Requiring our models
const db = require('../models');

module.exports = function(app){

    //Get all appications based on ArtistId
    app.get("/api/applications:id", function(req, res){

        db.Applicant.find({ where: { id: req.params.id } })
            .then(function (applicants) {

                const applicantArray = [];

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

}