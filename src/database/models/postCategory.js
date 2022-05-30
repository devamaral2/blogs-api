const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    }, 
    {
      tableName: 'PostCategories',
      timestamps: false,
    });

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'blogPosts',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });

      models.Category.belongsToMany(models.BlogPost, {
        as: 'categories',
        through: PostCategory,
        oreignKey: 'categoryId',
        therKey: 'postId',
      });
    };


  return PostCategory;
};

module.exports = PostCategory;
