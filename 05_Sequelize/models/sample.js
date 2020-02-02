'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define('Sample', {
    title: DataTypes.STRING,
    comment: DataTypes.STRING,
    writer: DataTypes.STRING,
    rNum: DataTypes.STRING
  }, {});
  Sample.associate = function(models) {
    // associations can be defined here
  };
  return Sample;
};
