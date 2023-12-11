const express = require('express');
const dotenv = require('dotenv')
const router = require('./routes/router');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use('/', router);

app.use(express.json())
dotenv.config()

const COCKTAIL_API_KEY = process.env.COCKTAIL_API_KEY


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
