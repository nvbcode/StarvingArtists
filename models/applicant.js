module.exports = function(connection, Sequelize) {
    const Applicant = connection.define('Applicant', {
      offer:{
          type:Sequelize.DECIMAL(6,2),
          allowNull:false
      },
        bid_win:{
          type:Sequelize.BOOLEAN
      }
    });
    Applicant.associate=function(models){
        Applicant.belongsTo(models.Artist,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        });
        Applicant.belongsToMany(models.Event,{through:models.Artist});
    }
  
    return Applicant;
  }