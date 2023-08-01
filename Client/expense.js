const form = document.getElementById('Expense');
const list = document.getElementById('list');

function onSubmit(e) {
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const id = e.target.expenseId.value;

    const obj = {
        amount,
        description,
        category
    }
    if (id) {
        obj['id'] = id;
    }
    addExpense(obj)
    form.reset();
}


async function addExpense(expense) {
    try {
        const token = localStorage.getItem('token');
        document.getElementById('add-edit-button').innerHTML = 'Add';

        if (document.getElementById('expenseId').value) {
            await axios.patch('http://localhost:8000/expense/edit-expense', expense, { headers: { 'Authorization': token } })
            alert("Data updated successfully !!");
            document.getElementById('add-edit-button').innerHTML = 'Add';
        } else {
            await axios.post('http://localhost:8000/expense/add-expense', expense, { headers: { 'Authorization': token } })
            alert("Data added successfully !!");
        } +
            await getAllExpense()
    } catch (error) {
        console.error("Error While Saving Data", error);
    }
}

async function deleteExpense(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8000/expense/delete-expense/${id}`, { headers: { 'Authorization': token } })
        if (response.status === 200) {
            getAllExpense();
            alert("Data deleted successfully !!");
        }
    } catch (error) {
        console.error("Error While Saving Data", error);
    }
}

async function editExpense(id) {
    try {
        const response = await axios.get(`http://localhost:8000/expense/edit-expense/${id}`)
        console.log(response);
        document.getElementById('expenseId').value = response.data.id;
        document.getElementById('amount').value = response.data.amount;
        document.getElementById('description').value = response.data.description;
        document.getElementById('category').value = response.data.category;
        document.getElementById('add-edit-button').innerHTML = 'Update';

    } catch (error) {
        console.error("Error While Editing Data", error);
    }
}

async function getAllExpense() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/expense/get-expense', { headers: { 'Authorization': token } });
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
        deleteButton.classList = 'btn btn-danger float-end mx-2';
        editButton.classList = 'btn btn-secondary float-end';
        editButton.addEventListener("click", () => editExpense(expense.id));
        deleteButton.addEventListener("click", () => deleteExpense(expense.id));
        Element.appendChild(deleteButton);
        Element.appendChild(editButton);
        list.appendChild(Element);
    });
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.getElementById('razorButton').onclick = async (e) => {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:8000/purchase/premium", { headers: { 'Authorization': token } });
    console.log(response);

    var options =
    {
        "key": response.data.key_id,
        "order_id":response.data.order.id, 
        "handler": async function (response) {
           const res = await axios.post("http://localhost:8000/purchase/updatestatus", {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status:"SUCCESSFUL",
            }, { headers: { 'Authorization': token } })

            localStorage.setItem('token',res.data.token)
            alert("You are Premium User now")
            showPremiumUser();

        },
    };
    const rzp1 = new Razorpay(options)
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', async (response) => {
        console.log(response);
        await axios.post("http://localhost:8000/purchase/updatestatus", {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status:"FAILED",
            }, { headers: { 'Authorization': token } })
    })
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        showPremiumUser();
        await getAllExpense()
    } catch (error) {
        console.error(JSON.stringify(error));
    }
})

function showPremiumUser() {
    const token = localStorage.getItem('token');
    const { ispremiumuser } = parseJwt(token);
    console.log(ispremiumuser);
    if (ispremiumuser) {
        document.getElementById('razorButton').style.visibility = 'hidden';
        document.getElementById('message').innerHTML = 'Premium User';
    }
}
