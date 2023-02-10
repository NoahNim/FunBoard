'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    toSafeObject() {
      const { id, userId, message, photo } = this;
      return { id, userId, message, photo };
    }


    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'userId' })
      Message.hasMany(models.Comment, { foreignKey: 'messageId', onDelete: 'cascade', hooks: true })
    }
  }
  Message.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};