const db = require("../models");
const Sequelize=require('sequelize');
const sequelize = new Sequelize('StarvingArtist2_db', 'root', 'kawaii23kiku!',{'dialect':'mysql'});

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
    app.get("/api/events", function (req, res) {

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
    app.get("/api/events/:id", function (req, res) {
        console.log("Getting Applicants");
        sequelize.query(`select * from applicants left join artists on applicants.artistid=artists.id 
        left join events on events.id=applicants.eventid 
        where applicants.eventid=${req.params.id}`,{type:sequelize.QueryTypes.SELECT}).then(applicants => {
                // We don't need spread here, since only the results will be returned for select queries
                res.json(applicants);
            })
    });

    //Update the event's data
    app.put("/api/events/:id", function (req, res) {

            //Updated customer data
            const updateEvent = {
                id: req.params.id,
                event_type: req.body.event_type,
                street_address: req.body.street_address,
                city: req.body.city,
                state: req.body.state,
                venue_name: req.body.venue_name,
                budget: req.body.budget,
                additional_info: req.body.additional_info,
                has_booking: req.body.has_booking,
                CustomerId: req.body.CustomerId
            }

            //Insert the updated data into the customer's table
            db.Event.update(updateEvent,

                {
                    where: {
                        id: req.params.id
                    }
                }).then(function (dbPut) {
                    res.json({
                        user_name: `${req.params.id} ${req.body.venue_name}`,
                        Status: "Updated"
                    });
                }).catch(function (error) {
                    res.json({ Error: error });
                });

        });


}