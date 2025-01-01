const loginForm = document.getElementById('login-form');
const dashboard = document.querySelector('.dashboard');
const investmentTableBody = document.querySelector('#investment-table tbody');
const logoutButton = document.getElementById('logout-button');

const CLIENT_USERNAME = "ashok";
const CLIENT_PASSWORD = "securepassword";

// Sample CSV data
const csvData = `
Date,Description,Amount (₹),Status
2025-01-01,Stock Investment,50000,Active
2025-01-15,Mutual Funds,30000,Active
2025-01-20,Bonds,20000,Completed
`;

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === CLIENT_USERNAME && password === CLIENT_PASSWORD) {
    document.querySelector('.login-container').classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadTableData(csvData);
  } else {
    alert('Invalid username or password');
  }
});

logoutButton.addEventListener('click', () => {
  dashboard.classList.add('hidden');
  document.querySelector('.login-container').classList.remove('hidden');
});

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
