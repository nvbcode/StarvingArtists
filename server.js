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