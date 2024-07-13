const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger tags=["Hello World!"]
    res.send('CSE341 Project 2');
});

router.use('/weapons', require('./weapons'));
router.use('/armor', require('./armor'));
router.use('/api-docs', require('../swagger'));

module.exports = router;
