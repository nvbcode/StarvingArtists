const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function() {
  db.User.bulkCreate([{
    user_name: 'makiko',
    password: '123',
    email: 'makiko.vaughan@gmail.com',
    user_type:1
  },{
    user_name: 'jt',
    password: '123',
    email: 'josh.mccormick81@gmail.com',
    user_type:1
  },{
    user_name: 'cynthia',
    password: '123',
    email: 'chicagock@gmail.com',
    user_type:1
  },{
    user_name: 'jeng',
    password: '123',
    email: 'jeng@coding.com',
    user_type:1
  },{
    user_name: 'neel',
    password: '123',
    email: 'neel@coding.com',
    user_type:1
  },{
    user_name: 'testcustomer',
    password: '123',
    email: 'testcustomer@test.com',
    user_type:1
  },{
    user_name: 'testartist',
    password: '123',
    email: 'testartist@test.com',
    user_type:2
  },{
    user_name: 'Beatles',
    password: '123',
    email: 'beatles@gmail.com',
    user_type:2
  },{
    user_name: 'user1',
    password: '123',
    email: 'user@test.com',
    user_type:2
  },
  {
    user_name: 'user2',
    password: '123',
    email: 'user2@test.com',
    user_type:2
 }]);
 db.Customer.bulkCreate([{
      first_name:'Makiko',
      last_name:'Vaughan',
      city:'Atlanta',
      state:'GA',
      profile_pic:'http://'
  },
  {
      first_name:'Josh',
      last_name:'McCormick',
      city:'Atlanta',
      state:'GA',
      profile_pic:'http://'
  },
  {
      first_name:'Cynthia',
      last_name:'Knox',
      city:'Atlanta',
      state:'GA',
      profile_pic:'http://'
  },
  {
      first_name:'Josh',
      last_name:'Jeng',
      city:'Atlanta',
      state:'GA',
      profile_pic:'http://'
  },
  {
      first_name:'Neel',
      last_name:'Bernhadi',
      city:'Atlanta',
      state:'GA',
      profile_pic:'http://'
  },
  {
      first_name:'Test',
      last_name:'Customer',
      city:'Tallahassee',
      state:'FL',
      profile_pic:'http://'
  }
]);
  db.Artist.bulkCreate([{
    first_name:'Test',
    last_name:'Artist',
    demo:'http://youtube.com',
    city:'Tallahassee',
    state:'FL',
    profile_pic:'http://'
},
{
  first_name:'Beatles',
  last_name:'Beatles',
  demo:'https://www.youtube.com/watch?v=WrAV5EVI4tU',
  city:'Tallahassee',
  state:'FL',
  profile_pic:'http://'
},
{
  first_name:'User',
  last_name:'1',
  city:'Los Angeles',
  demo:'https://youtube.com',
  state:'CA',
  profile_pic:'http://'
},
{
  first_name:'User',
  last_name:'2',
  city:'Las Vegas',
  demo:'https://youtube.com',
  state:'NV',
  profile_pic:'http://' 
}
]);
 db.Event.BulkCreate([{
    event_type:'Wedding',
    street_address:'1150 Peachtree St NE',
    city:"Atlanta",
    state:"GA",
    venue_name:"The Wimbish House",
    budget:500,
    additional_info:"This is my daughter's wedding and I hate who she is marrying so I'm looking for someone to ruin the wedding.",
    has_booking:false
}]).then(function(data) {
  console.log('Data successfully added!');
}).catch(function(error) {
  console.log('Error', error)
})})
