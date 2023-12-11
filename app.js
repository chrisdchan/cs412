require('dotenv').config();

const express = require('express');
const router = require('./PS4.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(express.json())

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use('/', router);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
