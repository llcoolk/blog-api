const express = require('express');
const Sequelize = require('sequelize');
const appRoutes = express.Router();
const app = express();

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//sequelize.sync({force: true})
// User tabel model
const User = sequelize.define('users', {
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

// Post table model
sequelize.sync({force:true});

const Posts = sequelize.define('posts', {
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
//         model: 'users',
//         key: 'id'
//   }
},
{
    timeStamps: false,
    freezeTableName: true
}
);

// Posts.belongsTo(Users, {foreignKey: 'authorID'});
// Users.hasMany(Posts, {foreignKey: 'id'});

app.get('/posts', (req, res) => {
    User.findAll({}).then( posts => {
        console.log(posts);
        res.json(posts)
    })
});

app.post('/posts', (req, res) => {
    const posts= {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        authorID: req.body.authorID
    };

    Posts.sync({force: true}).then(() => {
        return posts.create(
        {
            title: "I know what you did last night!",
            description: "But I won't tell your mommy~",
            imageUrl: './assets/placeholder.png',
            authorID: 1
        }
        );
    });
});

app.put('/posts/:id', (req, res) => {
    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };
    Posts.update(posts, { where: {id: req.params.id}})
    .then( post => res.json(post))
    .catch(err => res.json({Error: err}))

});

app.delete('/posts/:id', (req, res) =>{

    Post.destroy({ where: {id: req.params.id}})
    .then( post => res.json(post))
    .catch(err => res.json({Error: err}))
 });
// *******************************************************

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

app.use(express.json());

app.get('/users', (req, res) => {
    User.findAll({}).then( users => {
        console.log(users);
        res.json(users)
    })
});

app.post('/users', (req, res) => {
    // const users = users.find(c => c.id === parseInt(req.params.userId));
    // if (!users) return res.status(404).send('The user with the given ID was not found.');

    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    console.log("[users]",req.body);

    User.create(users)
        .then( user => res.json(user))
        .catch(err => res.json({Error: err}));

});

app.put('/users/:id', (req, res) => {
    // const users = users.find(c => c.id === parseInt(req.params.userId));
    // if (!users) return res.status(404).send('The user with the given ID was not found.');

    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    User.update(users, { where: {id: req.params.id}})
    .then( user => res.json(user))
    .catch(err => res.json({Error: err}))

    });

// app.patch('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const updates = req.body.updates;
//     users.find({
//         where: { id: id }
//     })
//         .then(users => {
//         return users.updateAttributes(updates)
//         })
//         .then(updateUser => {
//         res.json(updatedUser);
//         });
//     });

app.delete('/users/:id', (req, res) =>{

    User.destroy({ where: {id: req.params.id}})
    .then( user => res.json(user))
    .catch(err => res.json({Error: err}))
 });


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
});
