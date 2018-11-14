const db = require("../models");
const Sequelize=require('sequelize');
const sequelize = new Sequelize('starvingartist_db', 'root', 'georgia18',{'dialect':'mysql'});

module.exports=function(app){
app.get("/api/lookup", function (req, res) {

    sequelize.query(`select * from users left join artists on users.id=artists.userid left join customers on users.id=customers.userid left join events on customers.id=events.customerid
    WHERE (artists.first_name like '%${req.body.queryParams}%' or artists.last_name like '%${req.body.queryParams}%' or artist.city like '%${req.body.queryParams}%' or artist.state 
    like '%${req.body.queryParams}%' or events.city like'%${req.body.queryParams}%' or events.venue_name like '%${req.body.queryParams}%')`,{type:sequelize.QueryTypes.SELECT}).then(searchResults=>{
        res.json(searchResults)
    })
      
});
}