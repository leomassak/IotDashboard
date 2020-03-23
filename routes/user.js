const express = require('express');
const userController = require('../controllers/userController.js');
const buttonController = require('../controllers/buttonController.js');

const router = express.Router();

router.post('/auth', (req,res) => {
    userController.authUser(req, res);
});

router.post('/add', (req,res) => {

    userController.store(req, res);
});


router.post('/config', (req,res) => {
    userController.update(req,res);
})

router.get('/buttons/:username', (req, res) => {
    buttonController.show(req,res);
});

router.post('/buttons/add', (req, res) => {
    buttonController.store(req,res);
})



module.exports = router;