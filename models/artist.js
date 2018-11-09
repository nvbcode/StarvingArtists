module.exports = function(connection, Sequelize) {
    const Artist = connection.define('Artist', {
      first_name: {
          type:Sequelize.STRING,
          allowNull:false
      },
      last_name: {
          type:Sequelize.STRING,
          allowNull:false
      },
      demo:{
        type:Sequelize.STRING,
        validate:{
            isUrl:true
        }
      },
      city:{
          type:Sequelize.STRING,
          allowNull:false,
      },
      state:{
        type:Sequelize.STRING,
        allowNull:false,
        len:[2]
      },
      profile_pic:{
        type:Sequelize.STRING,
        validate:{
            isUrl:true
        }
      }
    });
    Artist.associate=function(models){
        Artist.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        });
        Artist.hasMany(models.Applicant);
        Artist.hasMany(models.Review);
    }
  
    return Artist;
  }