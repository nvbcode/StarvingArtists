// Requiring our models
const db = require('../models');
const path = require('path');
const customerData = require('./getCustomerData');


module.exports = function (app) {

    app.get('/api/customers/:id', function (req, res) {

        db.Customer.find({ where: { id: req.params.id }})
      .then(function(customer){
        customerData(customer.id, function(customerEvent){

          const eventArray = [];
          

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

            const customerData = {
              id: customer.id,
              first_name: customer.first_name,
              last_name: customer.last_name,
              city: customer.city,
              state: customer.state,
              profile_pic: customer.profile_pic,
              event: eventArray
            }
            res.json(customerData);
        })
      }).catch(function(error) {
        res.json({ error: error });
      });

    });

}