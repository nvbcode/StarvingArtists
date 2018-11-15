const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync({force: true}).then(function () {
  db.User.bulkCreate([{
    user_name: 'makiko',
    password: '123',
    email: 'makiko.vaughan@gmail.com',
    user_type: 1
  }, {
    user_name: 'jt',
    password: '123',
    email: 'josh.mccormick81@gmail.com',
    user_type: 1
  }, {
    user_name: 'cynthia',
    password: '123',
    email: 'chicagock@gmail.com',
    user_type: 1
  }, {
    user_name: 'jeng',
    password: '123',
    email: 'jeng@coding.com',
    user_type: 1
  }, {
    user_name: 'neel',
    password: '123',
    email: 'neel@coding.com',
    user_type: 1
  }, {
    user_name: 'testcustomer',
    password: '123',
    email: 'testcustomer@test.com',
    user_type: 1
  }, {
    user_name: 'testartist',
    password: '123',
    email: 'testartist@test.com',
    user_type: 2
  }, {
    user_name: 'Beatles',
    password: '123',
    email: 'beatles@gmail.com',
    user_type: 2
  }, {
    user_name: 'user1',
    password: '123',
    email: 'user@test.com',
    user_type: 2
  },
  {
    user_name: 'user2',
    password: '123',
    email: 'user2@test.com',
    user_type: 2
  }], {individualHooks: true}).then(function (response) {
    db.Customer.bulkCreate([{
      UserId: 1,
      first_name: 'Makiko',
      last_name: 'Vaughan',
      city: 'Atlanta',
      state: 'GA',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    },
    {
      UserId: 2,
      first_name: 'Josh',
      last_name: 'McCormick',
      city: 'Atlanta',
      state: 'GA',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    },
    {
      UserId: 3,
      first_name: 'Cynthia',
      last_name: 'Knox',
      city: 'Atlanta',
      state: 'GA',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    },
    {
      UserId: 4,
      first_name: 'Josh',
      last_name: 'Jeng',
      city: 'Atlanta',
      state: 'GA',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    },
    {
      UserId: 5,
      first_name: 'Neel',
      last_name: 'Bernhadi',
      city: 'Atlanta',
      state: 'GA',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    },
    {
      UserId: 6,
      first_name: 'Test',
      last_name: 'Customer',
      city: 'Tallahassee',
      state: 'FL',
      profile_pic: 'https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg'
    }
    ]).then(function (response) {
      db.Artist.bulkCreate([{
        UserId: 7,
        first_name: 'Test',
        last_name: 'Artist',
        demo: 'https://www.youtube.com/watch?v=ZjRX-PL7pC4',
        city: 'Hollygrove',
        state: 'LA',
        profile_pic: 'https://timedotcom.files.wordpress.com/2015/01/460619956.jpg'
      },
      {
        UserId: 8,
        first_name: 'Beatles',
        last_name: 'Beatles',
        demo: 'https://www.youtube.com/watch?v=WrAV5EVI4tU',
        city: 'Tallahassee',
        state: 'FL',
        profile_pic: 'http://ultimateclassicrock.com/files/2014/10/Beatles-.jpg?w=200&q=75'
      },
      {
        UserId: 9,
        first_name: 'User',
        last_name: '1',
        city: 'Los Angeles',
        demo: 'https://www.youtube.com/watch?v=rYEDA3JcQqw',
        state: 'CA',
        profile_pic: 'https://media.npr.org/assets/img/2015/11/24/ajeup0ayctw4ztltklrnuvtm-y4xulezgneawbqw4cs_custom-7aa29347d5da230c6101168c71549a7399302d0c-s800-c85.jpg'
      },
      {
        UserId: 10,
        first_name: 'User',
        last_name: '2',
        city: 'Las Vegas',
        demo: 'https://www.youtube.com/watch?v=fKopy74weus',
        state: 'NV',
        profile_pic: 'https://i.scdn.co/image/a841f0ee4f2d88c42f55f76c2cc6b588841f5d2f'
      }
      ]).then(function (response) {
        db.Event.bulkCreate([{
          CustomerId: 2,
          event_type: 'Wedding',
          street_address: '1150 Peachtree St NE',
          city: "Atlanta",
          state: "GA",
          venue_name: "The Wimbish House",
          budget: 500,
          additional_info: "This is my daughter's wedding and I hate who she is marrying so I'm looking for someone to ruin the wedding.",
          has_booking: false
        }]).then(function (response) {
          db.Review.bulkCreate([{
            ArtistId: 1,
            review_rate: 1,
            review_body: "Worst performance I have ever seen. The guy got drunk and made a pass at my daughter... who so happened to be the BRIDE!!"
          },
          {
            ArtistId: 2,
            review_rate: 5,
            review_body: "An absolutely great buy for any occasion. This person was professional and a delight to hear play!"
          }]).then(function (response) {
            db.Applicant.bulkCreate([{
              bid_win: false,
              ArtistId: 1,
              EventId: 1
            }])
          })
        })
      })
    })
  }).then(function (data) {
    console.log('Data successfully added!');
  }).catch(function (error) {
    console.log('Error', error)
  })
})
