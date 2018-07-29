const express = require('express');
const sequelize = require('./models');
const appRoutes = express.Router();
const app = express();
const Posts = require('./routes/posts');
const Users = require('./routes/users');

app.use(express.json());


sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

app.use('/posts', Posts);
app.use('/users', Users);

app.listen(3000, () =>
	console.log('Server running at http://localhost:3000')
);