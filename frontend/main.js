const form = document.getElementById('myForm');

function onSubmit(e){
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

async function getAllUser(){

}
async function deleteUser(){

}
async function addUser(user){
    try {
        const response = await axios.post('http://localhost:8000/user/add-user', user);
        if (response.status === 201) {
          await getAllUser();
        }
      } catch (error) {
        console.error("Error While Saving Data", error);
      }
}