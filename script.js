// DOM elements
const loginForm = document.getElementById('login-form');
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const logoutButton = document.getElementById('logout-button');
const investmentTableBody = document.querySelector('#investment-table tbody');
const totalInvestmentEl = document.getElementById('total-investment').querySelector('p');
const totalProfitEl = document.getElementById('total-profit').querySelector('p');
const totalPortfolioEl = document.getElementById('total-portfolio').querySelector('p');
const profitChartCanvas = document.getElementById('profit-chart');

// Login credentials
const CLIENT_USERNAME = "ashok";
const CLIENT_PASSWORD = "securepassword";

// Sample CSV data
const csvData = `
Date,Description,Amount (₹),Status
2025-01-01,Investment in Stock,50000,Investment
2025-01-02,Daily Profit,3000,Profit
2025-01-03,Daily Profit,4500,Profit
2025-01-04,Daily Profit,-2000,Loss
2025-01-05,Investment in Mutual Funds,20000,Investment
2025-01-05,Daily Profit,5000,Profit
`;

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
    loadTableData(csvData);
    calculateSummary(csvData);
    loadProfitChart(csvData);
  } else {
    alert('Invalid username or password');
  }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
  dashboardPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
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

// Calculate summary
function calculateSummary(csv) {
  let totalInvestment = 0, totalProfit = 0;

  csv.trim().split('\n').slice(1).forEach(row => {
    const [_, _, amount, status] = row.split(',');
    const value = parseFloat(amount.trim());
    if (status.trim() === "Investment") totalInvestment += value;
    else totalProfit += value;
  });

  totalInvestmentEl.textContent = `₹${totalInvestment.toLocaleString()}`;
  totalProfitEl.textContent = `₹${totalProfit.toLocaleString()}`;
  totalPortfolioEl.textContent = `₹${(totalInvestment + totalProfit).toLocaleString()}`;
}

// Load profit chart
function loadProfitChart(csv) {
  const rows = csv.trim().split('\n').slice(1);
  const labels = [];
  const profits = [];

  rows.forEach(row => {
    const [date, , amount, status] = row.split(',');
    if (status.trim() === "Profit" || status.trim() === "Loss") {
      labels.push(date.trim());
      profits.push(parseFloat(amount.trim()));
    }
  });

  new Chart(profitChartCanvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Daily Profit (₹)',
        data: profits,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
      },
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Profit (₹)' } },
      },
    },
  });
}
