const db = require("../models");
// const Sequelize=require('sequelize');
// const sequelize = new Sequelize('starvingartist_db', 'root', 'georgia18',{'dialect':'mysql'});
const checkAuth = require('../middleware/checkAuth');
module.exports = function (app) {

    //Create review table based on the customer's id
    app.post("/api/events", function (req, res) {
        console.log(req.body);
        db.Event.create(req.body).then(function (rows) {
            res.json({
                Event: rows.id,
                Status: "Created"
            });
        }).catch(function (error) {
            console.log(error);
            res.json({ error: error })
        });

    });


    //Get all events that has not been booked
    app.get("/api/events", checkAuth, function (req, res) {

        console.log("here");

        db.Event.findAll({ where: { has_booking: false } })
            .then(function (dbEvent) {
                console.log(dbEvent);
                res.json(dbEvent);
            }).catch(function (error) {
                res.json({ Error: error });
            });

    });

    //GET ALL APPLICANTS FOR A SPECIFIC EVENT
    app.get("/api/events/:id", checkAuth, function (req, res) {
        console.log("Getting Applicants");
        db.sequelize.query(`select * from applicants left join artists on applicants.artistid=artists.id 
        left join events on events.id=applicants.eventid 
        where applicants.eventid=${req.params.id}`,{type:db.sequelize.QueryTypes.SELECT}).then(applicants => {
                // We don't need spread here, since only the results will be returned for select queries
                res.json(applicants);
            })
    });

    //Update the event's data
    app.put("/api/events/:id",checkAuth, function (req, res) {



            //Insert the updated data into the customer's table
            db.sequelize.query(`update events set has_booking=true where id='${req.params.id}'`).then(function (dbPut) {
                    res.json({
                        user_name: `${req.params.id}`,
                        Status: "Updated"
                    });
                }).catch(function (error) {
                    res.json({ Error: error });
                });

        });


}