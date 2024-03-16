const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/clientes/clientes', (req, res) => {
    res.render('clientes/clientes');
});

router.get('/pagina2', (req, res) => {
    res.render('pagina2');
});

router.get('admin', (req, res) => {
    res.render('admin');
});

router.get('residen', (req, res) => {
    res.render('residen');
});

module.exports = router;
