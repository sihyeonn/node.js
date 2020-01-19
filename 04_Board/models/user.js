const path = require('path');
const { sequelize, Sequelize } = require(path.join(__dirname, '../modules/sequelize-conn'));
class User extends Sequelize.Model {}

// sequelize : access information
sequelize.authenticate().then(() => {
  User.init({
    username: {type: Sequelize.STRING},
    userId: { type: Sequelize.STRING },
    age: {type: Sequelize.INTEGER}
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'users'
  });
  User.sync({ force: false });
});

module.exports = User;
