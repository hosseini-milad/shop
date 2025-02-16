const express = require('express');
const router = express.Router();
const mellatBank = require('../middleware/Mellat');

//payment
router.get('/mellat', mellatBank.pay);
router.get('/test/:credit',(req, res) => {
    res.render('index.ejs');
});
router.post('/mellatBankCallback', mellatBank.callBack);



module.exports = router;