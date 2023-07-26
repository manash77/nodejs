var api = "https://crudcrud.com/api/";
var uniqueID = "9662facb289741e5b5420c8290abda93/";
const form = document.getElementById('ordersForm');
const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');
const t3 = document.getElementById('t3');

//Form Submit Function
function onSubmit(e) {
  e.preventDefault();
  const price = e.target.price.value;
  const dish = e.target.dish.value;
  const table = e.target.table.value;

  const obj = {
    price,
    dish,
    table
  }
  saveData(obj)
  // form.reset();
}

//Saves Data From The Endpoint
async function saveData(order) {
  try {
    const response = await axios.post('http://localhost:8000/orders/add-order', order);
    if (response.status === 200) {
      await reloadAll();
    }
  } catch (error) {
    console.error("Error While Saving Data", error);
  }
}

//Delete Data From The Endpoint
async function deleteData(id) {
  try {
    const response = await axios.post('http://localhost:8000/orders/delete-order',{id:id});
    await reloadAll();
    console.log("Deleted Data Successfully !!", response);

  } catch (error) {
    console.error("Error While Deleting Data", error);

  }
}

//Get All Data from DB and Reload All Data On Screen 
async function reloadAll() {
  try {
    const response = await axios.get('http://localhost:8000/orders/get-orders');
    diplayData(response.data)
  } catch (error) {
    console.error("Error While Reloading Data", error);
  }
}

//Add Data On Screen Based on Table  
function diplayData(orders) {
  t1.innerHTML = '';
  t2.innerHTML = '';
  t3.innerHTML = '';
  orders.forEach(order => {
    if (order.table === 'table1') {
      AddDataInTable(order, t1);
    }
    if (order.table === 'table2') {
      AddDataInTable(order, t2);
    }
    if (order.table === 'table3') {
      AddDataInTable(order, t3);
    }
  });
}

//Add Data On Table
function AddDataInTable(order, t) {
  let Element = document.createElement('li');
  let deleteButton = document.createElement("button");
  deleteButton.textContent = 'delete';
  Element.innerHTML = order.price + "-" + order.dish + "-" + order.table;
  deleteButton.addEventListener("click", () => deleteData(order.id));
  Element.appendChild(deleteButton);
  t.appendChild(Element);
}

//Get and Show all data When Screen is Loading
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await reloadAll()
  } catch (error) {
    alert("Api Is Expired")
    console.error("Error While Loading Data When Screen is Loading", error);
  }
})
