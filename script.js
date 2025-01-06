// Sample CSV data
const csvData = [
    {date: "2025-01-01", time: "10:00", type: "Profit", amount: 2000, remark: "Profit from stock A"},
    {date: "2025-01-03", time: "14:30", type: "Profit", amount: 1500, remark: "Profit from stock B"},
    {date: "2025-01-05", time: "09:45", type: "Deposit", amount: 3000, remark: "Deposit to portfolio"},
    {date: "2025-01-06", time: "11:00", type: "Profit", amount: 2500, remark: "Profit from stock C"},
    {date: "2025-01-06", time: "16:30", type: "Investment", amount: 5000, remark: "Investment in stock X"},
    {date: "2025-01-07", time: "10:00", type: "Investment", amount: 2000, remark: "Investment in stock Y"},
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "ashok" && password === "secure") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        setGreeting(); // Set greeting message
        populateTransactionTable(); // Populate the table with data
        calculateTotalPnL(); // Calculate total P&L
        calculateTodaysPnL(); // Calculate today's P&L
        calculateTotalInvestment(); // Calculate total investment
        calculateTotalPortfolioValue(); // Calculate total portfolio value
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}

function logout() {
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
}

function setGreeting() {
    const currentHour = new Date().getHours();
    let greetingMessage = "Good Evening, Ashok Mishra";
    
    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = "Good Morning, Ashok Mishra";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = "Good Afternoon, Ashok Mishra";
    }

    document.getElementById("greeting").innerText = greetingMessage;
}

// Populate transaction table
function populateTransactionTable() {
    const tableBody = document.getElementById("transactionTable").getElementsByTagName('tbody')[0];
    csvData.forEach(transaction => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = transaction.date;
        row.insertCell(1).innerText = transaction.time;
        row.insertCell(2).innerText = transaction.type;
        row.insertCell(3).innerText = `₹${transaction.amount}`;
        row.insertCell(4).innerText = transaction.remark;
    });
}

// Calculate Total P&L
function calculateTotalPnL() {
    let totalPnL = 0;
    csvData.forEach(transaction => {
        if (transaction.type === "Profit") {
            totalPnL += transaction.amount;
        }
    });
    document.getElementById("totalPnL").innerText = `₹${totalPnL}`;
}

// Calculate Today's P&L
function calculateTodaysPnL() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    let todaysPnL = 0;
    csvData.forEach(transaction => {
        if (transaction.type === "Profit" && transaction.date === today) {
            todaysPnL += transaction.amount;
        }
    });
    document.getElementById("todaysPnL").innerText = `₹${todaysPnL}`;
}

// Calculate Total Investment
function calculateTotalInvestment() {
    let totalInvestment = 0;
    csvData.forEach(transaction => {
        if (transaction.type === "Investment") {
            totalInvestment += transaction.amount;
        }
    });
    document.getElementById("totalInvestment").innerText = `₹${totalInvestment}`;
}

// Calculate Total Portfolio Value (Investment + P&L)
function calculateTotalPortfolioValue() {
    const totalPnL = parseFloat(document.getElementById("totalPnL").innerText.replace('₹', ''));
    const totalInvestment = parseFloat(document.getElementById("totalInvestment").innerText.replace('₹', ''));
    const totalPortfolioValue = totalInvestment + totalPnL;
    document.getElementById("totalPortfolioValue").innerText = `₹${totalPortfolioValue}`;
}

// Popup functions
function openWallet() {
    document.getElementById("walletPopup").style.display = "block";
    document.getElementById("popupOverlay").style.display = "block";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("walletPopup").style.display = "none";
    document.getElementById("depositPopup").style.display = "none";
    document.getElementById("withdrawPopup").style.display = "none";
}
