'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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