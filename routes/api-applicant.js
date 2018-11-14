// Requiring our models
const db = require('../models');

module.exports = function(app){

    //Get all appications based on ArtistId
    app.get("/api/applicants/:id", function(req, res){

        db.Applicant.findAll({ where: { EventId: req.params.id } })
            .then(function (applicant) {
                res.json(applicant);
                
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    app.post("/api/applicants", function(req, res){

        const applicant = req.body;
        
        db.Applicant.create(applicant).then(function(row){

            res.json({
                Applicant_ID: row.dataValues.id,
                Status: "Processed"
            })

        }).catch(function(error){
            console.log(error);
            res.json({Error: error})
        });

    });

    app.put("/api/applicants/:id", function(req, res) {

        const updatedApplicant = {
            id: req.params.id,
            bid_win: req.body.bid_win,
            ArtistId: req.body.ArtistId,
            EventId: req.body.EventId
        }

        db.Applicant.update(updatedApplicant, {
            where: {
                id: req.params.id
            }
        }).then(function (dbPut) {
            res.json({
                Applicant_ID: req.params.id,
                Status: "Applicant Updated"
            });
        }).catch(function (error) {
            console.log(error);
            res.json({ Error: error });
        });


    });

}