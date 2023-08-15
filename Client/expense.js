const form = document.getElementById('Expense');
const list = document.getElementById('list');
const leaderboard = document.getElementById('leaderboard');
const UserFiles = document.getElementById('userfiles');
const paginationElement = document.getElementById('pagination');
const pageNumberElement = document.getElementById('pageNumbers');
const prevButtonElement = document.getElementById('prevButton');
const nextButtonElement = document.getElementById('nextButton');
const numberOfExpenesesElement = document.getElementById('numberOfExpeneses');
let currentPage;

numberOfExpenesesElement.onchange = async (e) =>{
    localStorage.setItem('numberofexpense',e.target.value);
    getProducts(currentPage);
}

document.getElementById('downloadLeaderboard').onclick = async (e) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/users/download', { headers: { 'Authorization': token } })
        if (response.status === 200) {
            downloadFile(response.data.fileUrl);
        }
        else {
            throw new Error(response.data.message)
        }

    } catch (error) {
        console.error("Error While Downloading Expense", error);
    }
}

document.getElementById('showLeaderboard').onclick = async (e) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/premium/showleaderboard', { headers: { 'Authorization': token } })
        renderLeaderboardData(response.data)
    } catch (error) {
        console.error("Error While Loading  leaderboard Data", error);
    }
}

function downloadFile(url) {
    var a = document.createElement("a");
    a.href = url;
    a.download = 'my-expense.csv';
    a.click();
}

function renderLeaderboardData(leaderboardData) {
    let divElement = document.createElement('div');
    let h1Element = document.createElement('h1');
    h1Element.textContent = 'LeaderBoard';
    h1Element.classList.add('text-center')
    divElement.appendChild(h1Element)
    divElement.classList.add('myform')

    leaderboardData.forEach(userData => {
        let Element = document.createElement('li');
        Element.innerHTML = "Name: " + userData.name + "  --  " + " Amount: " + userData.totalExpense;
        Element.classList = 'list-group-item';
        leaderboard.classList.add("col-12")
        leaderboard.appendChild(Element);
        leaderboard.parentElement.appendChild(divElement)
    })
    divElement.appendChild(leaderboard);
    divElement.style.maxWidth = '450px';
    divElement.classList.add("mt-1")
}

function renderUserFiles(data) {
    let divElement = document.createElement('div');
    let h1Element = document.createElement('h1');
    h1Element.textContent = 'User Files';
    h1Element.classList.add('text-center')
    divElement.appendChild(h1Element)
    divElement.classList.add('myform')

    data.forEach(userData => {
        let Element = document.createElement('li');
        let downloadButton = document.createElement("button");
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener("click", () => downloadFile(userData.fileurl));
        downloadButton.classList = 'btn btn-secondary float-end';
        Element.innerHTML = "Date: " + userData.createdAt;
        Element.classList = 'list-group-item';
        Element.appendChild(downloadButton);
        UserFiles.classList.add("col-12")
        UserFiles.appendChild(Element);
        UserFiles.parentElement.appendChild(divElement)
    })
    divElement.style.maxWidth = '450px';
    divElement.appendChild(UserFiles);

}

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
            await axios.patch('http://localhost:8000/expense/edit-expense', expense, { headers: { 'Authorization': token } }, { validateStatus: () => true })
            alert("Data updated successfully !!");
            document.getElementById('add-edit-button').innerHTML = 'Add';
        } else {
            const response = await axios.post('http://localhost:8000/expense/add-expense', expense, { headers: { 'Authorization': token } })
            if (response.status === 201) {
                alert("Data added successfully !!");
            } else {
                alert(response.data.err);
            }
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
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/expense/edit-expense/${id}`, { headers: { 'Authorization': token } })
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

async function getAllUserFiles() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/users/get-files', { headers: { 'Authorization': token } });
        console.log(response.data);
        renderUserFiles(response.data.userfiles)
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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
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
        "order_id": response.data.order.id,
        "handler": async function (response) {
            const res = await axios.post("http://localhost:8000/purchase/updatestatus", {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status: "SUCCESSFUL",
            }, { headers: { 'Authorization': token } })

            localStorage.setItem('token', res.data.token)
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
            status: "FAILED",
        }, { headers: { 'Authorization': token } })
    })
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        const numberofexpense = localStorage.getItem('numberofexpense');
        const { ispremiumuser } = parseJwt(token);
        numberOfExpenesesElement.value = numberofexpense;
        await getProducts(1)
        showPremiumUser();
        if (ispremiumuser) {
            await getAllUserFiles()
        }
    } catch (error) {
        console.error(JSON.stringify(error));
    }
})

function showPremiumUser() {
    const token = localStorage.getItem('token');
    const { ispremiumuser } = parseJwt(token);
    if (ispremiumuser) {
        document.getElementById('razorButton').style.display = 'none';
        document.getElementById('message').innerHTML = 'Premium User';
        document.getElementById('showLeaderboard').style.display = 'block';
        document.getElementById('downloadLeaderboard').style.display = 'block';
    }
}

async function getProducts(page){
    try {
        const token = localStorage.getItem('token');
        const numberofexpense = localStorage.getItem('numberofexpense')
        const response = await axios.get(`http://localhost:8000/expense/get-expense?page=${page}&numberofexpense=${numberofexpense}`, { headers: { 'Authorization': token } });
        if (response.status === 200) {
            const {data: { expense, ...pageData}} = response;
            renderData(expense);
            showPagination(pageData)
        }
    } catch (error) {
        console.log(error);
    }

}

function showPagination({ currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage}) {
    this.currentPage = currentPage;
    console.log(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage);
    prevButtonElement.innerHTML = '';
    nextButtonElement.innerHTML = '';
    if(hasPreviousPage){
        const Btn = document.createElement('button')
        const span = document.createElement('span')

        Btn.classList.add('btn', 'btn-link-dark');
        span.innerHTML = "&laquo;";
        Btn.addEventListener('click', ()=> getProducts(previousPage) )
        Btn.appendChild(span);
        prevButtonElement.appendChild(Btn)
    }

    if(hasNextPage){
        const Btn = document.createElement('button')
        const span = document.createElement('span')

        Btn.classList.add('btn', 'btn-link-dark');
        Btn.addEventListener('click', ()=> getProducts(nextPage) )
        span.innerHTML = "&raquo;";
        Btn.appendChild(span);
        nextButtonElement.appendChild(Btn)
    }

    pageNumberElement.innerHTML=''
    for (let i = 1; i <= lastPage; i++) {
        let li = document.createElement('li')
        let Btn = document.createElement('button')
        
        Btn.classList.add('btn', 'btn-link-dark');
        Btn.addEventListener('click', ()=> getProducts(i) )
        
        Btn.innerText = i;
        li.classList.add('page-item');
        li.appendChild(Btn)

        pageNumberElement.appendChild(li)
    }
    pageNumberElement.classList.add('hstack','gap-1')

}