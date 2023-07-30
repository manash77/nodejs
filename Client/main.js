const form = document.getElementById('signUpForm');
form.addEventListener('submit', signupSubmit);

//Form Submit Function
function signupSubmit(e) {
  e.preventDefault();
  console.log(e);
  // const list = form.classList();
  console.log(form);
  form.className = "was-validated";
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  if (name === "" || email === "" || password === "") {
    alert('Please Fill Form')
    return
  }

  const obj = {
    name,
    email,
    password
  }
  signUp(obj)
  form.reset();
}


//Saves Data From The Endpoint
async function signUp(order) {
  try {
    const response = await axios.post('http://localhost:8000/users/signup', order);
    console.log(response);
    if (response.data.userExists) {
      alert('User Already Exits');
      form.className -= "was-validated";
    }
    if (response.status === 201) {
      alert('data Added')
    }
  } catch (error) {
    console.error("Error While Saving Data", error);
  }
}
