const express = require('express');
const { getEnergyData, addEnergyData } = require('../controllers/energyController');

const router = express.Router();

router.get('/', getEnergyData);
router.post('/', addEnergyData);

module.exports = router;