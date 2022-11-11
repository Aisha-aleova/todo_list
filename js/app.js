const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const message = document.getElementById("message-create");
let closee  =  document.getElementById('close');
let editItemId;

///1.LOCALDA NIMA BORLIGINI TEKSHIRISH

let todos = JSON.parse(localStorage.getItem("data")) ? 
            JSON.parse(localStorage.getItem("data")) : 
            [];


if(todos){
    showTodos();
}


///3. set todos localgA



function setTodoList(){
    localStorage.setItem("data", JSON.stringify(todos));
}

//2. function malumot alish uni local joylash

formCreate.addEventListener("submit", (e)=>{
    e.preventDefault();
    const todoText = formCreate["input-create"].value.trim();
    formCreate.reset();
    if(todoText){
        todos.push({text: todoText, time: "45.12.1998", complete: false});
        setTodoList();
        showTodos();
    }
    else{
        message.textContent = "Incorrect input";

        setTimeout(()=>{
            message.textContent = "";
        },2000)
    }
});

//4. malumit ekranga chiqarish
function showTodos(){
    listGroupTodo.innerHTML = "";
    todos.forEach((item, i)=>{
        listGroupTodo.innerHTML +=`
            <li class="list-group-item d-flex align-items-center justify-content-space-between">
            ${item.text}
            <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick="edittodo(${i})" src="./img/icon1.svg" alt="">
            <img onclick="deletetodo(${i})" src="./img/icon2.svg" alt="">

            </div>
            </li>
        `;
    });
}

//5. delete function
function deletetodo(id){
    // console.log(id);
    const deletetodos = todos.filter((item, i) => {
        return i !== id;
    });
    todos = deletetodos;
    setTodoList();
    showTodos();
}


function edittodo(id){
    open();
    editItemId = id; 
}

formEdit.addEventListener("submit", (e) =>{
    e.preventDefault();
    const todoText = formEdit["input-edit"].value.trim();
    formEdit.reset();
    
    if(todoText){
        todos.splice(editItemId, 1, {text: todoText, time: '4624', complete: false});
        console.log(todos);
    setTodoList();
    showTodos();
    close()
    }else{
        message.textContent = "No input";

        setTimeout(()=>{
            message.textContent = "";
        }, 2500)
    }   
});

function open(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function close(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

overlay.addEventListener("click", ()=>{
    close();
});

closee.addEventListener("click", ()=>{
    close();
})