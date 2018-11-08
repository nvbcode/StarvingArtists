module.exports = function(connection, Sequelize) {
    const Review = connection.define('Review', {
      review_rate:{
          type:Sequelize.INTEGER,
          allowNull:false,
          validate:{
              len:[1,5]
          }
      },
        review_body:{
          type:Sequelize.STRING,
          validate:{
              len:[1,250]
      }
    }
    });
    Review.associate=function(models){
        Review.belongsTo(models.Artist,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        });
        
    }
  
    return Review;
  }