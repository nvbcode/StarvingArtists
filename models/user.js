module.exports = function(connection, Sequelize) {
    const User = connection.define('User', {
      user_name: {
          type:Sequelize.STRING,
          allowNull:false,
          unique: true,
          len:[2,10]
      },
      password: {
          type:Sequelize.STRING,
          allowNull:false,
          len: [5,15]
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
      },
      user_type:{
          type:Sequelize.INTEGER,
          allowNull:false,
          isIn:[1,2]
      }
    });
  User.associate =function(models){
      User.hasOne(models.Customer);
      User.hasOne(models.Artist);
  }
    return User;
  }