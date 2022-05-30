const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {}, 
    {
      tableName: 'PostCategories',
      timestamps: false,
    });
  return PostCategory;
};

module.exports = PostCategory;