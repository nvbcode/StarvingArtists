//Using path
const path = require('path');
const checkAuth = require('../middleware/checkAuth');


module.exports = function (app) {

    // Go to home.html to be a default.
    app.get('/customers', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/client.html'));
    });

    // Go to home.html to be a default.
    app.get('/artist', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/artist.html'));
    });

    // Go to kandingpagead.html to be a default.
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/landingpagead.html'));
    });
    //    Go to kandingpagead.html to be a default.
    //    app.get('/landing', function (req, res) {
    //     res.sendFile(path.join(__dirname, '../public/landingpagead.html'));
    // });
}