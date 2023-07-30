async function getAllExpense(){
    try {
       const response = await axios.get('http://localhost:8000/expense');
       renderData(response.data);
   } catch (error) {
       console.error(error);
   } 
}


window.addEventListener('DOMContentLoaded', async() =>{
    try {
        await getAllExpense()
    } catch (error) {
        console.error(error);
    }
})