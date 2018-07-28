const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize(
    'dizpuuiq_llcoolk',
    'dizpuuiq_llcoolk',
    'llcoolk!',
    {
        host: 'dionimercado.com',
        dialect: 'mysql',
        port: 3306,
        operatorsAliases: false,
});

const Users = sequelize.define('Users', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate : {
            len: [1, 30],
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1,30]
        }
    }
},
{
    timestamps: false,
    freezeTableName: true
});

const Posts = sequelize.define('Posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 1000]
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    authorID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
//     ,
//     references: {
//         model: 'user',
//         key: 'id'
//   }
},
{
    timeStamps: false,
    freezeTableName: true
}
);

sequelize.sync({force:true});

module.exports = { sequelize, Posts, Users }