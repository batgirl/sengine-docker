'use strict';
module.exports = function(sequelize, DataTypes) {
  var Data = sequelize.define('Data', {
    code: DataTypes.STRING,
    stdout: DataTypes.STRING,
    stderr: DataTypes.STRING,
    resTime: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Data;
};