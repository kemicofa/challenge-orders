const express = require('express');
const router = express.Router();
const fs = require('fs');

const PATH = 'private/orders.json';

router.get('/', async function(req, res) {

    try {
        const contents = await fs.promises.readFile(PATH);
        const data = JSON.parse(contents);

        res.status(200).json(data);

    } catch(e){
        res.status(500).json({"message":"Unable to process request. Please try again later."})
    }

});

module.exports = router;
