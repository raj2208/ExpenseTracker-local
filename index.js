document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-expense");
  const records = document.getElementById("records");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;

    if (!amount || !desc || !category) {
      alert("Please fill in all fields");
      return;
    }

    const expense = { amount, category, desc };
    addExpenseToDOM(expense);
    saveExpenseToLocalStorage(expense);

    form.reset();
  });

  function addExpenseToDOM(expense) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `Rs.${expense.amount} - ${expense.category}
                          <p style="font-style:italic">${expense.desc}</p>`;

    const delBtn = createButton("Delete", "btn btn-danger btn-sm", function () {
      records.removeChild(listItem);
      localStorage.removeItem(expense.desc);
    });

    const editBtn = createButton("Edit", "btn btn-warning btn-sm", function () {
      document.getElementById("amount").value = expense.amount;
      document.getElementById("desc").value = expense.desc;
      document.getElementById("category").value = expense.category;
      records.removeChild(listItem);
      localStorage.removeItem(expense.desc);
    });

    listItem.appendChild(delBtn);
    listItem.appendChild(editBtn);
    records.appendChild(listItem);
  }

  function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
  }

  function saveExpenseToLocalStorage(expense) {
    localStorage.setItem(expense.desc, JSON.stringify(expense));
  }

  function loadExpensesFromLocalStorage() {
    Object.keys(localStorage).forEach(function (key) {
      const expense = JSON.parse(localStorage.getItem(key));
      addExpenseToDOM(expense);
    });
  }

  loadExpensesFromLocalStorage();
});
