const router = require("express").Router();

router.get('/', (req, res) => {
    res.json({
        message: 'aqui es'
    })
})

module.exports = router