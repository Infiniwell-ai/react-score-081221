const express = require('express');
const router = express.Router();
const logger = require('./logs');
router.use('/logs', router);
router.post('/data-logs', (req, res) => {
    logger.info(req.body);
    console.log(req.body);
    res.send(req.body);
});

// const AllRoutes = [
//     router
// ];

module.exports = router;