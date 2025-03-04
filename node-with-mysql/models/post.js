'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};