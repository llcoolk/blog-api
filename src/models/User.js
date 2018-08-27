const Sequelize = require("sequelize");
const sequelize = require("./index");

// User tabel model
const User = sequelize.define(
  "User",
  {
    firstName: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 100]
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 30],
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
      // validate: {
      //   len: [1, 30]
      // }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

// User.sync({force: true}).then(() => {
//     return User.create(
//         {
//             firstName: 'Dioni',
//             lastName: 'Mercado',
//             email: 'me@DioniMercado.com',
//             password: '1234'
//         }
//     );
// });

module.exports = User;
