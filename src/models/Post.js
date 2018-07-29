const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./User');



// Post table model
const Post = sequelize.define(
  'Post', {
    PostId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
    }
  }, {
    timeStamps: false,
    freezeTableName: true,
  }
);

Post.belongsTo(User);
User.hasMany(Post);

// sequelize.sync({
// 	force: true
// })

// Post.sync({
// 	force: true
// }).then(() => {
// 	return Post.create({
// 		title: "I know what you did last night!",
// 		description: "But I won't tell your mommy~",
// 		imageUrl: './assets/placeholder.png',
// 		authorID: 1
// 	});
// });

module.exports = Post;