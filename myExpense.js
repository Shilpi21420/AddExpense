document.getElementById('expenseForm').addEventListener('submit', addExpense);
// initial array of expenses, reading data from localStorage
const myExpenses = JSON.parse(localStorage.getItem('myExpenses')) || [];
function addExpense(event){
    event.preventDefault();
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    if(type !='selectOne' && name.length>0  && amount>0){
     const expense = {
      type, name, amount, 
      id: myExpenses.length > 0 ? myExpenses[myExpenses.length - 1].id + 1 : 1,
      }
      myExpenses.push(expense); 
      localStorage.setItem('myExpenses', JSON.stringify(myExpenses));  //read from localStorage
    }
    document.getElementById('expenseForm').reset();
    showMyExpenses();
}
const showMyExpenses = () => {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = '';
    for(let i = 0; i < myExpenses.length; i++){
        expenseTable.innerHTML += `
            <tr>
                <td>${myExpenses[i].type}</td>
                <td>${myExpenses[i].name}</td>
                <td>$${myExpenses[i].amount}</td>
                <td><a class="deleteButton" onclick="removeExpense(${myExpenses[i].id})">
                    Delete</td>
                    <td><a class="editButton" onclick="editFunction(${myExpenses[i].id})">Edit</td>
            </tr>
        `;
        
    }
    
}
const removeExpense = (id) => { // delete expenses
    for(let i = 0; i < myExpenses.length; i++){
        if(myExpenses[i].id == id){
            myExpenses.splice(i, 1);
        }
    }
    localStorage.setItem('myExpenses', JSON.stringify(myExpenses));
    showMyExpenses();
}

const editFunction = (id) =>{
    let type = prompt('Catagory');
    let name = prompt('Description');
    let amount = prompt('Amount');

    if(type !='selectOne' && name.length>0  && amount>0){
     const expense = {
      type, name, amount, 
      id: myExpenses.length > 0 ? myExpenses[myExpenses.length - 1].id + 1 : 1,
      }
      myExpenses.push(expense); 
      localStorage.setItem('myExpenses', JSON.stringify(myExpenses));  //read from localStorage
    }
    document.getElementById('expenseForm').reset();
    for(let i = 0; i < myExpenses.length; i++){
        if(myExpenses[i].id == id){
            myExpenses.splice(i, 1);
        }
    }
    localStorage.setItem('myExpenses', JSON.stringify(myExpenses));
    showMyExpenses();

}
showMyExpenses();