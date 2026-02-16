# 💰 Money Tracker

A personal finance app to track income and expenses with real-time balance calculation.

![Money Tracker Screenshot]
<img width="1659" height="909" alt="image" src="https://github.com/user-attachments/assets/e1cc96ac-6978-4c4d-ad13-f93b6f483fa7" />


## ✨ Features

- **Add Transactions** - Log income and expenses with details
- **Real-time Balance** - Automatically calculates total balance
- **Category System** - Organize transactions (Food, Salary, Bills, etc.)
- **Filter Transactions** - View all, income only, or expenses only
- **Visual Indicators** - Green for income, red for expenses
- **Delete Transactions** - Remove entries with one click
- **Form Validation** - Prevents invalid amounts or empty fields
- **Data Persistence** - All data saved in browser localStorage


## 🛠️ Technologies Used

- **HTML5** - Forms, radio buttons, dropdowns
- **CSS3** - Flexbox, responsive design, color-coded UI
- **Vanilla JavaScript** - Array methods, math operations, validation
- **localStorage API** - Client-side data persistence

## 📦 Installation
```bash
git clone https://github.com/Ashxin/money-tracker.git
cd money-tracker
```

Open `index.html` in your browser.

## 💡 How to Use

1. **Add Transaction**:
   - Enter amount (e.g., 50.99)
   - Add description (e.g., "Groceries")
   - Select type (Income or Expense)
   - Choose category
   - Click "Add Transaction"

2. **View Summary**:
   - See total balance at top
   - Income and expenses displayed separately

3. **Filter**:
   - Click "All" to see everything
   - Click "Income" to see only income
   - Click "Expenses" to see only expenses

4. **Delete**:
   - Click the × button on any transaction

## 🎓 What I Learned

This project taught me crucial skills in:
- **Working with numbers** - `parseFloat()`, `toFixed()` for currency
- **Form handling** - Submit events, `preventDefault()`, validation
- **Array reduce()** - Summing values across multiple objects
- **Method chaining** - Combining `filter()` and `reduce()`
- **Radio buttons & dropdowns** - Form input types
- **Number validation** - Ensuring valid positive amounts
- **Currency formatting** - Displaying money with 2 decimals

## 📂 Project Structure
```
money-tracker/
├── index.html      # Form and transaction list structure
├── style.css       # Balance cards, form styling, color coding
├── app.js          # Transaction logic, calculations, filters
└── README.md       # Project documentation
```

## 🏗️ Key Functions
```javascript
addTransaction()       // Validates and saves new transaction
updateBalance()        // Calculates totals using reduce()
displayTransactions()  // Renders filtered transaction list
deleteTransaction(id)  // Removes transaction from array
getCategoryName()      // Converts category codes to names
```

## 💻 Code Highlights

**Calculating total income using method chaining:**
```javascript
let totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
```

**Form validation:**
```javascript
if (!amount || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
}
```

## 🔮 Future Enhancements

- [ ] Monthly/yearly summaries
- [ ] Spending charts and graphs
- [ ] Budget goals with warnings
- [ ] Recurring transactions
- [ ] Export to CSV/PDF
- [ ] Multi-currency support
- [ ] Receipt photo uploads
- [ ] Category-based budgets

## 👤 Author

**Your Name**
- GitHub: https://github.com/Ashxin
- Email: ashwinbta01@gmail.com

## 📄 License

MIT License - Free to use for personal and educational purposes.

---

📊 Take control of your finances, one transaction at a time!
