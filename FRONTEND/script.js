// Initialize Charts with Dynamic Data
let liveChart, carbonChart, usageChart;

// Simulate Real-Time Data Updates
setInterval(() => {
  const newData = {
    HVAC: Math.random() * 1000,
    EV: Math.random() * 800,
    Lighting: Math.random() * 300,
    Others: Math.random() * 200
  };
  
  updateCharts(newData);
  updateGamification();
}, 2000);

// Chart Update Logic
function updateCharts(data) {
  // Live Consumption Chart
  const liveLabels = liveChart.data.labels;
  liveLabels.push(new Date().toLocaleTimeString());
  if (liveLabels.length > 15) liveLabels.shift();
  
  liveChart.data.datasets[0].data.push(data.HVAC);
  liveChart.data.datasets[1].data.push(data.EV);
  liveChart.update();

  // Carbon Footprint Chart
  carbonChart.data.datasets[0].data = [
    data.HVAC * 0.12,
    data.EV * 0.25,
    data.Lighting * 0.08,
    data.Others * 0.15
  ];
  carbonChart.update();

  // Usage Distribution Chart
  usageChart.data.datasets[0].data = [
    data.HVAC,
    data.EV,
    data.Lighting,
    data.Others
  ];
  usageChart.update();
}

// Gamification Updates
function updateGamification() {
  document.querySelector('.progress').style.width = 
    `${Math.min(100, parseFloat(document.querySelector('.progress').style.width) + 1)}%`;
}

// Initialize Charts
window.onload = () => {
  const liveCtx = document.getElementById('liveChart').getContext('2d');
  liveChart = new Chart(liveCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'HVAC',
        data: [],
        borderColor: '#38bdf8',
        tension: 0.3
      }, {
        label: 'EV Charger',
        data: [],
        borderColor: '#f59e0b',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: (ctx) => `Time: ${ctx[0].label}`,
            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Watts`
          }
        }
      }
    }
  });

  const carbonCtx = document.getElementById('carbonChart').getContext('2d');
  carbonChart = new Chart(carbonCtx, {
    type: 'doughnut',
    data: {
      labels: ['HVAC', 'EV Charger', 'Lighting', 'Others'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#38bdf8', '#f59e0b', '#94a3b8', '#cbd5e1']
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw.toFixed(2)} kg CO2`
          }
        }
      }
    }
  });

  const usageCtx = document.getElementById('usageChart').getContext('2d');
  usageChart = new Chart(usageCtx, {
    type: 'pie',
    data: {
      labels: ['HVAC', 'EV Charger', 'Lighting', 'Others'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#38bdf8', '#f59e0b', '#94a3b8', '#cbd5e1']
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw} Watts (${ctx.percentage.toFixed(1)}%)`
          }
        }
      }
    }
  });
};