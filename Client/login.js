const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',loginSubmit);


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
      const response = await axios.post('http://localhost:8000/users/login', order);
      console.log(response);
      if (response.status === 200) {
        alert(response.data.success)
      }
      if (response.status === 206) {
        alert(response.data.err)
      }
      if (response.status === 400) {
        alert(response.data.err)
      }
    } catch (error) {
      console.log(error);
    }
    
  }