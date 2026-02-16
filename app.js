document.addEventListener("DOMContentLoaded", function () {
  const balanceAmount = document.querySelector("#balanceAmount");
  const incomeAmount = document.querySelector("#incomeAmount");
  const expenseAmount = document.querySelector("#expenseAmount")

  const transactionForm = document.querySelector("#transactionForm");
  const amountInput = document.querySelector("#amount");
  const descriptionInput = document.querySelector("#description");
  const categorySelect = document.querySelector("#category");

  const transactionsList = document.querySelector("#transactionsList");

  const filterButtons = document.querySelectorAll(".filter-btn");

  let transactions = [];
  let currentFilter = "all";

  loadTransactions();

  transactionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTransaction();
  });

  filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      currentFilter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      displayTransactions();
    });
  });

  function addTransaction() {
    let amount = parseFloat(amountInput.value);
    let description = descriptionInput.value.trim();
    let type = document.querySelector('input[name="type"]:checked').value;
    let category = categorySelect.value;

    if(!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if(!description) {
      alert("Please enter a description!");
      return;
    }

    if(!category) {
      alert("Please select a category!");
      return;
    }

    let transaction = {
      id: Date.now(),
      amount: amount,
      description: description,
      type: type,
      category: category,
      date: new Date().toISOString()
    };

    transactions.unshift(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateBalance();
    displayTransactions();

    transactionForm.reset();

    document.querySelector("#incomeRadio").checked = true;
  }
    
  function updateBalance() {
    let totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    let totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    let balance = totalIncome - totalExpenses;

    balanceAmount.textContent = "$" + balance.toFixed(2);
    incomeAmount.textContent = "$" + totalIncome.toFixed(2);
    expenseAmount.textContent = "$" + totalExpenses.toFixed(2);
  }

  function displayTransactions() {
    transactionsList.innerHTML = "";

    let filteredTransactions = transactions;

    if (currentFilter === "income") {
      filteredTransactions = transactions.filter(t => t.type === "income");
    } else if (currentFilter === "expense") {
      filteredTransactions = transactions.filter(t => t.type == "expense");
    }

    if(filteredTransactions.length === 0) {
      transactionsList.innerHTML = '<p class="no-transactions">No transactions yet. Add your first one!</p>';
      return;
    }

    filteredTransactions.forEach(function(transaction) {
      let transactionItem = document.createElement("div");
      transactionItem.className = `transaction-item ${transaction.type}`;

      let sign = transaction.type === "income" ? "+" : "-";
      let formattedAmount = sign + "$" + transaction.amount.toFixed(2);

      let formattedDate = formatDate(transaction.date);

      transactionItem.innerHTML = `
        <div class="transaction-info">
          <p class="transaction-desc">${transaction.description}</p>
          <p class="transaction-category">${getCategoryName(transaction.category)}</p>
          <p class="transaction-date">${formattedDate}</p>
        </div>
        <div class="transaction-right">
          <p class="transaction-amount">${formattedAmount}</p>
          <button class="delete-btn" data-id="${transaction.id}">×</button>
        </div>
      `;

      let deleteBtn = transactionItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        deleteTransaction(transaction.id);
      });

      transactionsList.appendChild(transactionItem);
    });
  }

  function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateBalance();
    displayTransactions();
  }

  function loadTransactions() {
    let savedData = localStorage.getItem("transactions");

    if(savedData) {
      try {
        transactions = JSON.parse(savedData);
        updateBalance();
        displayTransactions();
      } catch (error) {
        console.log("Error loading transactions:", error);
        transactions = [];
      }
    }
  }

  function getCategoryName(category) {
    let categories = {
      "salary": "Salary",
      "freelance": "Freelance",
      "investment": "Investment",
      "other-income": "Other Income",
      "food": "Food & Dining",
      "transport": "Transportation",
      "shopping": "Shopping",
      "entertainment": "Entertainment",
      "bills": "Bills & Utilities",
      "health": "Healthcare",
      "other-expense": "Other Expense"
    };
    return categories[categories] || category;
  }

  function formatDate(dateString) {
    let date = new Date(dateString);

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

});