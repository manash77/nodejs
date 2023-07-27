const form = document.getElementById('signUpForm');

//Form Submit Function
function onSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const obj = {
    name,
    email,
    password
  }
  saveData(obj)
  form.reset();
}

//Saves Data From The Endpoint
async function saveData(order) {
  try {
    const response = await axios.post('http://localhost:8000/users/signup', order);
    if (response.status === 200) {
      alert('data Added')
    }
  } catch (error) {
    console.error("Error While Saving Data", error);
  }
}