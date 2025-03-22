const axios = require('axios');

const simulateSmartPlug = () => {
  const deviceId = 'smart-plug-1';
  const powerConsumption = Math.floor(Math.random() * 1000); // Random power consumption between 0 and 1000 watts

  axios.post('http://localhost:5000/api/energy', { deviceId, powerConsumption })
    .then(response => console.log('Data sent:', response.data))
    .catch(error => console.error('Error sending data:', error));
};

// Simulate data every 5 seconds
setInterval(simulateSmartPlug, 5000);