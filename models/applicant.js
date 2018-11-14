module.exports = function (connection, Sequelize) {
    const Applicant = connection.define('Applicant', {

        bid_win: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        }
    });
    Applicant.associate = function (models) {
        Applicant.belongsToMany(models.Artist, { through: 'Artist_Event' });
        Applicant.belongsToMany(models.Event, { through: 'Artist_Event' });;
    }

    return Applicant;
}