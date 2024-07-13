require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('./db/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const createError = require('http-errors');
const indexRoutes = require('./routes/index');
const port = process.env.PORT || 8080;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', indexRoutes);

// Initialize DB and start server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
        });
    }
});

// Error handler for 404
app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

// General error handler
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});