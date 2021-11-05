module.exports = (sequelize, Sequelize) => {
  return sequelize.define('HashTag', {
    keyword: { type: Sequelize.STRING(128), unique: true, allowNull: false }
  }, { charset: 'utf8' });
}
