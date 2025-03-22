const EnergyData = require('../models/EnergyData');

const getEnergyData = async (req, res) => {
  try {
    const data = await EnergyData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEnergyData = async (req, res) => {
  const { deviceId, powerConsumption } = req.body;
  const newData = new EnergyData({ deviceId, powerConsumption });

  try {
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getEnergyData, addEnergyData };