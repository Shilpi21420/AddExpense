document.addEventListener('DOMContentLoaded', reload)
async function reload(event){   
    await axios.get("https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker")
    .then(displayData =>{
            for(let i=0; i<displayData.data.length; i++) {
                showOutput(displayData.data[i])
            }
        })
}
let getCallBtn = document.getElementById('submitButton')
getCallBtn.addEventListener('click', postUserData)
function postUserData(event01){   
    console.log('Button is working')
    let amount = document.getElementById('amount').value
    let Description = document.getElementById('description').value              
    let category = document.getElementById('category').value
    
    let userObj = {"Amount": amount, "Description":Description,"Category":category}
    function addUserToCrudCrud(){
         axios.post("https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker", userObj)
    }
    addUserToCrudCrud()
    showOutput(userObj)
}
function showOutput(obj){
    let mainClass = document.getElementById('mainList')
    let childClass = document.createElement('li')
    childClass.textContent = `${obj.Amount}  -  ${obj.Description}  -  ${obj.Category}`
    mainClass.append(childClass)
    let editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.style.borderBlockColor = 'green'
    childClass.appendChild(editBtn)
    let delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.style.borderBlockColor = 'red'
    childClass.appendChild(delBtn)
    
    delBtn.addEventListener('click',async()=>{
        if(confirm('Delete Expense?')){
                await axios.get('https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker')
                .then(async (deleteObj) =>{
                        let results = [];
                        let toSearch = obj.Description;
                        for(var i=0; i<deleteObj.data.length; i++) {
                        for(key in deleteObj.data[i]) {
                            if(deleteObj.data[i][key].indexOf(toSearch)!=-1) {
                            results.push(deleteObj.data[i]);
                            }
                        }
                        }
                        let delId = results[0]._id
                        console.log(delId)
                        let delUrl = `https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker/${delId}`
                        console.log(delUrl)
                        await axios.delete(delUrl)
                    })
                mainClass.removeChild(childClass)
            }
             }
             )
    editBtn.addEventListener('click', async()=>{   
        let newAmount = prompt('Add Amount')
        let newDescrition = prompt('Add Description')
        let newCategory = prompt('Add Category')
        childClass.textContent = `${newAmount}  -  ${newDescrition}  -  ${newCategory}`          
        let obj01 = {"Amount": newAmount, "Description":newDescrition,"Category":newCategory}
        childClass.append(delBtn)
        childClass.appendChild(editBtn)
        
        await axios.get('https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker')
        .then(async(editObj) =>{
            let results = [];
            let toSearch = obj.Description;
            for(let i=0; i<editObj.data.length; i++){
                for(key in editObj.data[i]){
                    if(editObj.data[i][key].indexOf(toSearch)!=-1){
                        results.push(editObj.data[i]);
                    }
                }
            }
            let editId = results[0]._id
            console.log(editId)
            let editUrl = `https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/expenseTracker/${editId}`
            console.log(editUrl)
            await axios.put(editUrl, obj01)
        }
        )
    })
} 
