// Requiring our models
const db = require('../models');
const customerData = require('./getCustomerData');


module.exports = function (app) {

  //Provide the customer's information and linked events
  app.get('/api/customers/:id', function (req, res) {

    db.Customer.find({ where: { UserId: req.params.id } })
      .then(function (customer) {
        //Use the call back function to get the event
        customerData(customer.id, function (customerEvent) {

          const eventArray = [];

          //Create an array of events linked by the customer ID.
          customerEvent.forEach(event => {

            const customerEvent = {
              id: event.id,
              event_type: event.event_type,
              street_address: event.street_address,
              city: event.city,
              state: event.state,
              venue_name: event.venue_name,
              budget: event.budget,
              additional_info: event.additional_info,
              has_booking: event.has_booking
            }

            eventArray.push(customerEvent);

          });

          //Create a requested data
          const customerData = {
            id: customer.id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            city: customer.city,
            state: customer.state,
            profile_pic: customer.profile_pic,
            events: eventArray
          }
          //Send the requested data to the client
          res.json(customerData);
        })
      }).catch(function (error) {
        res.json({ error: error });
      });

  });

  //Create a customer row in the table
  app.post("/api/customers", function (req, res) {
    db.Customer.create(req.body).then(function (rows) {
      res.json({
        Customer: rows.id,
        Status: "Created"
      });
    }).catch(function (error) {
      res.json({ error: error })
    });

  });

  //Update the customer's data
  app.put("/api/customers/:id", function(req, res){

    //Updated customer data
    const updateCustomer = {
      id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      state: req.body.state,
      profile_pic: req.body.profile_pic,
      UserId: req.body.UserId
    }

    //Insert the updated data into the customer's table
    db.Customer.update(updateCustomer,

      {
        where: {
          id: req.params.id
        }
      }).then(function (dbPut) {
        res.json({
            user_name: `${req.body.first_name} ${req.body.last_name}`,
            Status: "Updated" 
        });
      }).catch(function (error) {
        res.json({Error: error});
      });

  });

}