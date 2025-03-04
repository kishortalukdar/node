'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define associations here (even if empty)
    }
  }

  Category.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
