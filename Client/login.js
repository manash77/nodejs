const loginForm = document.getElementById('loginForm');
const myModal = document.getElementById('myModal')
const forgotEmailInput = document.getElementById('forgotEmail')
const submitModalButton = document.getElementById('submitModal')

submitModalButton.addEventListener("click", async(e)=>{
    if (forgotEmailInput.value === '') {
        alert("Please Add Registered Email")
        return;
    }
    if (!forgotEmailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
        alert("Insert Valid Email")
        return;
    }
    const response = await axios.post("http://localhost:8000/password/forgotpassword",{email:forgotEmailInput.value},{validateStatus: () => true});
    console.log(response);
    if(response.status === 200){
        alert(response.data.message)
        forgotEmailInput.value ='';
        myModal.classList.add("hide");
    }else{
        alert(response.data.message)
    }

})

loginForm.addEventListener('submit', loginSubmit);

myModal.addEventListener('shown.bs.modal', () => {
    forgotEmailInput.focus()
})



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