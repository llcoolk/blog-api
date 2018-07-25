const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/posts', (req, res) =>{
    res.json({message:"You successfully created a GET route!"})
});
app.post('/posts', (req, res) =>{
    res.json({message:"You successfully created a POST route!"})
});
app.put('/posts', (req, res) =>{
    res.json({message:"You successfully created a PUT route!"})
});
app.delete('/posts', (req, res) =>{
    res.json({message:"You successfully created a DELETE route!"})
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})

