const form = document.getElementById('myForm');
const list = document.getElementById('list');

function onSubmit(e) {
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const obj = {
        amount,
        description,
        category
    }
    addExpense(obj)
    form.reset();
}


async function addExpense(expense) {
    try {
        const response = axios.post('http://localhost:8000/expense/add-expense',expense)
        console.log("add-expense",response);
        if (response.status === 200) {
            await getAllExpense();
          }
    } catch (error) {
        console.error("Error While Saving Data", error);
    }
}

async function getAllExpense(){
     try {
        const response = await axios.get('http://localhost:8000/expense/get-expense');
        renderData(response.data);
    } catch (error) {
        console.error(error);
    } 
}

function renderData(expenses) {
    list.innerHTML = '';
    expenses.forEach(expense => {
        let Element = document.createElement('li');
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        deleteButton.textContent = 'delete';
        editButton.textContent = 'edit';
        Element.innerHTML = expense.amount + "  -  " + expense.category + "  -  " + expense.description;
        Element.classList = 'list-group-item'
        deleteButton.classList = 'btn btn-danger';
        editButton.classList = 'btn btn-secondary mx-4';
        deleteButton.addEventListener("click", () => deleteExpense(expense.id));
        editButton.addEventListener("click", () => editExpense(expense.id));
        Element.appendChild(editButton);
        Element.appendChild(deleteButton);
        list.appendChild(Element);
    });
}

window.addEventListener('DOMContentLoaded', async() =>{
    try {
        await getAllExpense()
    } catch (error) {
        console.error(error);
    }
})