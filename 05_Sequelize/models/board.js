module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Board', { // class create module
    title: { type: Sequelize.STRING(255) },
    writer: { type: Sequelize.STRING(255) },
    img: { type: Sequelize.STRING(255) },
    comment: { type: Sequelize.TEXT() },
  }, { // option
    timestamps: true,
    charset: 'utf8',
    tableName: 'boards'
  });
};
