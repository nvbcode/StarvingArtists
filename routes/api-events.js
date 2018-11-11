const db = require("../models");

module.exports = function (app) {

    //Create review table based on the customer's id
    app.post("/api/events", function (req, res) {
        db.Event.create(req.body).then(function (rows) {
            res.json({
                Event: rows.id,
                Status: "Created"
            });
        }).catch(function (error) {
            res.json({ error: error })
        });

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