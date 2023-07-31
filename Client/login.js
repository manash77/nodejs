const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', loginSubmit);


function loginSubmit(e) {
    e.preventDefault();
    loginForm.className = "was-validated";
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "" || password === "") {
        alert('Please Fill Form')
        return
    }

    const obj = {
        email,
        password
    }
    login(obj)
}


async function login(order) {
    try {
        const response = await axios.post('http://localhost:8000/users/login', order,{validateStatus: () => true});
        localStorage.setItem('token',response.data.token)
        if (response.data.success) {
            alert(response.data.success)
            window.location.href = "http://localhost:5500/Client/expense.html"; 
        }
        if (response.status !== 200) {
            alert(response.data.err)
        }
    } catch (error) {
        console.log(error);
    }

}