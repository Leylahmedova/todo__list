const tbody=document.querySelector(".main")
const addBtn=document.getElementById("add")
let allow=true
let oldValues=[]
const orderRows=()=>{
   let numbers=[...document.querySelectorAll(".numberTd")]
   console.log(numbers)
   numbers.map((number,key)=>{
    number.textContent=key+1
   })
}

const saveData=(e)=>{
   allow=true
   let inputs=[...document.querySelectorAll("input")]
   inputs.map((input)=>{
      input.parentElement.textContent=input.value
   })
   
   e.target.classList.remove("fa-solid","fa-check")
   e.target.classList.add("fa-solid",'fa-pen-to-square')
   e.target.removeEventListener("click",saveData)
   e.target.addEventListener("click",editData)

   e.target.nextElementSibling.classList.remove("fa-solid",'fa-xmark')
   
   e.target.nextElementSibling.classList.add("fa-solid","fa-trash-can")
   e.target.nextElementSibling.removeEventListener("click",cancelData)
   e.target.nextElementSibling.addEventListener("click",deleteData)
}
const deleteData=(e)=>{
    e.target.closest("tr").remove()
    orderRows()
    allow=true
}
const editData=(e)=>{
    allow=false
  oldValues=[]
  const tds=[...e.target.closest("tr").querySelectorAll("td")].slice(1,4)
   tds.map((td,key)=>{
    const input=document.createElement("input")
    oldValues.push(td.textContent)
    td.textContent=''
    input.value=oldValues[key]
    td.append(input)
  })
 
  e.target.classList.remove("fa-solid",'fa-pen-to-square')
  e.target.classList.add("fa-solid","fa-check")
  e.target.removeEventListener("click",editData)
  e.target.addEventListener("click",saveData)
  
  e.target.nextElementSibling.classList.remove("fa-solid","fa-trash-can")
  e.target.nextElementSibling.classList.add("fa-solid",'fa-xmark')
  e.target.nextElementSibling.removeEventListener("click",deleteData)
  e.target.nextElementSibling.addEventListener("click",cancelData)
  
}
const cancelData=(e)=>{
    let inputs=[...document.querySelectorAll('input')]
    inputs.map((input,key)=>{
        input.parentElement.textContent=oldValues[key]
    })
    e.target.classList.remove("fa-solid",'fa-xmark')
    e.target.classList.add("fa-solid","fa-trash-can")//delete
    e.target.removeEventListener("click",cancelData)
    e.target.addEventListener("click",deleteData)

    e.target.previousElementSibling.classList.remove("fa-solid","fa-check")
    e.target.previousElementSibling.classList.add("fa-solid",'fa-pen-to-square')
    e.target.previousElementSibling.removeEventListener('click',saveData)
    e.target.previousElementSibling.addEventListener("click",editData)
   
    
}
const createColumn=()=>{

    if(!allow){
        alert("Save previous data:")
        return
    }
  
    const row=document.createElement("tr")
    tbody.append(row)
    const numberTd=document.createElement("td")
    numberTd.classList.add("numberTd")
    numberTd.textContent=1
   
    const nameTd=document.createElement("td")
    const nameInput=document.createElement("input")
    nameInput.setAttribute("placeholder","Name")
    nameTd.append(nameInput)

    const surnameTd=document.createElement("td")
    const surnameInput=document.createElement("input")
    surnameInput.setAttribute("placeholder","Surname")
    surnameTd.append(surnameInput)

    const ageTd=document.createElement("td")
    const ageInput=document.createElement("input")
    ageInput.setAttribute("placeholder","Age")
    ageTd.append(ageInput)

    const operationsTd=document.createElement("td")
    operationsTd.classList.add("operations")
    const saveBtn=document.createElement("i")
  
    saveBtn.classList.add("fa-solid","fa-check")//save
    saveBtn.addEventListener("click",saveData)
    const deleteBtn=document.createElement("i")
   
    deleteBtn.classList.add("fa-solid", "fa-trash-can")//delete
    deleteBtn.addEventListener("click",deleteData)
    operationsTd.append(saveBtn,deleteBtn)

    row.append(numberTd,nameTd,surnameTd,ageTd,operationsTd)
    allow=false
    orderRows()
}
addBtn.addEventListener('click',()=>{
    createColumn()
})
