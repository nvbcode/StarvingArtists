module.exports = function(connection, Sequelize) {
    const Customer = connection.define('Customer', {
      first_name: {
          type:Sequelize.STRING,
          allowNull:false
      },
      last_name: {
          type:Sequelize.STRING,
          allowNull:false
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
    Customer.associate=function(models){
        Customer.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        });
        Customer.hasMany(models.Event)
    }
  
    return Customer;
  }