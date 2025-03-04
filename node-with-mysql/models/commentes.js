'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Commentes extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Commentes.init({
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Commentes',
  });

  return Commentes;
};
