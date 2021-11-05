module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Member', {
    username: { type: Sequelize.STRING(32) },
    user_pwd: { type: Sequelize.STRING(16) },
    email: { type: Sequelize.STRING(64), unique: true }
  }, {
    timestamps: true,
    charset: 'utf8'
  });
}
