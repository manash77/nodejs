const form = document.getElementById('myForm');
const list = document.getElementById('list');

function onSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const obj = {
        username,
        email,
        phone
    }
    addUser(obj)
    form.reset();
}

async function addUser(user) {
    try {
        const response = await axios.post('http://localhost:8000/user/add-user', user);
        console.log("add-user",response);
        if (response.status === 200) {
            await getAllUser();
          }
    } catch (error) {
        console.error("Error While Saving Data", error);
    }
}

async function deleteUser(id) {
    try {
        const response = await axios.post('http://localhost:8000/user/delete-user', { id: id })
        getAllUser()
    } catch (error) {
        console.error("Error While Deleting Data", error);
    }
}

async function getAllUser() {
    try {
        const response = await axios.get('http://localhost:8000/user/get-user');
        renderData(response.data);
    } catch (error) {
        console.error("Error While getting Data Data", error);
    }
}

function renderData(users) {
    list.innerHTML = '';
    users.forEach(user => {
        let Element = document.createElement('li');
        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'delete';
        Element.innerHTML = user.username + "  -  " + user.email + "  -  " + user.phone;
        Element.classList = 'list-group-item'
        deleteButton.classList = 'btn btn-danger mx-4';
        deleteButton.addEventListener("click", () => deleteUser(user.id));
        Element.appendChild(deleteButton);
        list.appendChild(Element);
    });
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        await getAllUser();
    } catch (error) {
        alert("Api Is Expired")
        console.error("Error While Loading Data When Screen is Loading", error);
    }
})