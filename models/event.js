module.exports = function(connection, Sequelize) {
    const Event = connection.define('Events', {
      event_type: {
          type:Sequelize.STRING,
          allowNull:false,
          validate:{
            len:[1,30]
          }
      },
      street_address: {
          type:Sequelize.STRING,
          allowNull:false,
          validate:{
              len:[1,50]
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
      venue_name:{
        type:Sequelize.STRING,
        validate:{
            len:[1,50]
        }
      },
      budget:{
          type:Sequelize.DECIMAL(6,2),
          allowNull:false
      },
      additional_info:{
          type:Sequelize.STRING,
          validate:{
              len:[0,250]
          }
      },
      has_booking:{
          type:Sequelize.BOOLEAN
      }
    });
    Event.associate=function(models){
        Event.belongsTo(models.Customer,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        })
        Event.hasMany(models.Applicant);
        
    }
  
    return Event;
  }