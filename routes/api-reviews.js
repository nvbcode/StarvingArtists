// Requiring our models
const db = require('../models');

module.exports = function (app) {

    //Create a row in Review table.
    app.post("/api/reviews", function (req, res) {

        console.log(req.body);

        const review = {
            review_rate: req.body.review_rate,
            review_body: req.body.review_body,
            ArtistId: req.body.ArtistId
        }

        db.Review.create(review).then(function (rows) {

            res.json({
                ArtistId: req.body.ArtistId,
                Status: "Review Created"
            });

        }).catch(function (error) {
            res.json({ error: error });
        });

    });

    //Update the review table based on review id and ArtistId.
    app.put('/api/reviews/:id', function(req, res){

        const updatedReview = {
            id: req.params.id,
            review_rate: req.body.review_rate,
            review_body: req.body.review_body,
            ArtistId: req.body.ArtistId
        }

        db.Review.update(updatedReview, {
            where: {
              id: req.params.id
            }
          }).then(function (dbPut) {
            res.json({
                Review_ID: req.params.id,
                Status: "Review Updated" 
            });
          }).catch(function (error) {
              console.log(error);
            res.json({Error: error});
          });

    });
}