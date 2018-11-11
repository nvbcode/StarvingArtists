<<<<<<< HEAD
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



require('./routes/api-customers.js')(app);
require('./routes/api-artists.js')(app);
require('./routes/html-routes.js')(app);


const db = require('./models');


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log(`App listening on PORT ${PORT}`);
    });
  });
=======
// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');
const app = express();

//Port setup
var PORT = process.env.PORT || 8080;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//For the puclic folder
app.use(express.static(path.join(__dirname, "./public")));

// Routes
require('./routes/api-user.js')(app);
require('./routes/htmlRoute.js')(app);

const db = require('./models');

// Syncs our database first
db.sequelize.sync().then(function(){

  // Starts our server on the predefined PORT
  // Only starts if the db successfully syncs
  app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
  });
});
>>>>>>> 4828cff2ab139dba2e12dcf254df5d97524c5fcc
