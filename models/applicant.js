module.exports = function(connection, Sequelize) {
    const Applicant = connection.define('Applicant', {
      offer:{
          type:Sequelize.DECIMAL(6,2),
          allowNull:false
      },
        bid_win:{
          type:Sequelize.BOOLEAN
      },
      sales_pitch:{
          type:Sequelize.STRING,
          allowNull:true,
          len:[0,250]
      }
    });
    Applicant.associate=function(models){
        Applicant.belongsToMany(models.Artist,{through:'Artist_Event'});
        Applicant.belongsToMany(models.Event,{through:'Artist_Event'});;
    }
  
    return Applicant;
  }