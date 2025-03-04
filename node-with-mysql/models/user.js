'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};