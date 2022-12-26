const handlebars = require('express-handlebars');

exports.handlebars = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }));

    app.set('views', './src/views');
    app.set('view engine', 'hbs');
}