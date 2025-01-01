const loginForm = document.getElementById('login-form');
const dashboard = document.querySelector('.dashboard');
const investmentTableBody = document.querySelector('#investment-table tbody');
const logoutButton = document.getElementById('logout-button');
const profitChartCanvas = document.getElementById('profit-chart');

const CLIENT_USERNAME = "ashok";
const CLIENT_PASSWORD = "securepassword";

// Sample CSV data
const csvData = `
Date,Description,Amount (₹),Status
2025-01-01,Investment in Stock,50000,Active
2025-01-02,Daily Profit,3000,Profit
2025-01-03,Daily Profit,4500,Profit
2025-01-04,Daily Profit,-2000,Loss
2025-01-05,Daily Profit,5000,Profit
`;

// Authenticate user
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
    document.querySelector('.login-container').classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadTableData(csvData);
    loadProfitChart(csvData);
  } else {
    alert('Invalid username or password');
  }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
  dashboard.classList.add('hidden');
  document.querySelector('.login-container').classList.remove('hidden');
});

// Populate investment table
function loadTableData(csv) {
  const rows = csv.trim().split('\n').slice(1);
  rows.forEach(row => {
    const cells = row.split(',');
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    investmentTableBody.appendChild(tr);
  });
}

// Load profit chart
function loadProfitChart(csv) {
  const rows = csv.trim().split('\n').slice(1);
  const labels = [];
  const profits = [];

  rows.forEach(row => {
    const [date, description, amount, status] = row.split(',');
    if (status.trim() === "Profit" || status.trim() === "Loss") {
      labels.push(date.trim());
      profits.push(parseFloat(amount.trim()));
    }
  });

  new Chart(profitChartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Daily Profit (₹)',
        data: profits,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
      },
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Profit (₹)' } }
      }
    }
  });
}
