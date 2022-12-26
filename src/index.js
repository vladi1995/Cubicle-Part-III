const express = require('express');

const routes = require('./routes');
const { initializeDatabase } = require('./config/database'); //Initialize the database
const { handlebars } = require('./config/handlebars'); //Handlebars function 

const port = 5000;
const app = express();

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false })); //Required for POST/PUT requests only. We send data to the server. 
//It recognizes the incoming Request Object as STRING OR ARRAYS!
//Extended false: we parse the URL-endoded data with querystring library

handlebars(app);
app.use(routes);

initializeDatabase()
    .then((res) => {
        app.listen(port, () => console.log('App is listening on port 5000'));
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = routes;
