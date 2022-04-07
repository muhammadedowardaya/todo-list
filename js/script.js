const todoList = [
    [
        'Belajar JavaScript',
        'Belajar HTML'
    ],
    [
        'true',
        'false'
    ],
    [
        1,
        2
    ]

];


const TodoList = {
    angka: [],
    formControl: function () {
        return document.querySelectorAll('#todoListForm .form-control');
    }
}


function addTodoList(i, todo) {

    const todoListForm = document.getElementById('todoListForm');
    const div = document.createElement('div');
    div.className = 'form-control';
    todoListForm.appendChild(div);
    const deleteTask = document.createElement('input');
    deleteTask.type = 'button';
    deleteTask.value = 'X';
    deleteTask.id = 'delete';
    deleteTask.onclick = function () {
        div.classList.add('animation-deleted');
        setTimeout(() => {
            removeTodoList(i);
        }, 1000);
    }
    div.appendChild(deleteTask);
    const label = document.createElement('label');
    label.textContent = todo;
    div.appendChild(label);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task';
    checkbox.name = 'task';
    div.appendChild(checkbox);

    div.addEventListener('click', function (e) {
        e.preventDefault();

        if (checkbox.checked == true) {
            label.style.textDecoration = 'none';
            checkbox.checked = false;
            deleteTask.classList.remove('active');
            div.classList.remove('active');
            div.classList.remove('checked');

            todoList[1][i] = 'false';
        } else {
            label.style.textDecoration = 'line-through';
            checkbox.checked = true;
            deleteTask.classList.add('active');
            div.classList.add('active');
            div.classList.add('checked');

            todoList[1][i] = 'true';
        }


    })


    TodoList.formControl().forEach(element => {
        element.setAttribute('data-id', todoList[2][i]);
    })



    let ckbox = document.querySelectorAll('#todoListForm .form-control input#task');

    if (ckbox[i] != undefined) {
        ckbox[i].setAttribute('checked', todoList[1][i]);

        if (ckbox[i].getAttribute('checked') == 'false') {
            ckbox[i].removeAttribute('checked');
            label.style.textDecoration = 'none';
            checkbox.checked = false;
            deleteTask.classList.remove('active');
            div.classList.remove('active');
            div.classList.remove('checked');
        } else if (ckbox[i].getAttribute('checked') == 'true') {
            label.style.textDecoration = 'line-through';
            checkbox.checked = true;
            deleteTask.classList.add('active');
            div.classList.add('active');
            div.classList.add('checked');
        }
    }



}

function clearTodoList() {
    const todoListBody = document.getElementById('todoListForm');
    while (todoListBody.firstChild) {
        todoListBody.removeChild(todoListBody.firstChild);
    }
}

function removeTodoList(index) {
    todoList[0].splice(index, 1);
    todoList[1].splice(index, 1);
    todoList[2].splice(index, 1);
    displayTodoList();
}

function displayTodoList() {

    clearTodoList();

    for (let i = 0; i < todoList[0].length; i++) {
        const todo = todoList[0][i];
        // console.info(todo);
        const searchText = document.getElementById('searchText').value.toLowerCase();
        if (todo.toLowerCase().includes(searchText)) {
            addTodoList(i, todo);
        }

    }

}

const addTaskButton = document.getElementById('addTaskButton');

addTaskButton.addEventListener('click', function (e) {

    e.preventDefault();

    const addTaskInput = document.getElementById('addTaskInput').value;
    const waktu = new Date();

    if (e.keyCode === 13) {
        todoList[0].push(addTaskInput);
        // tambabh todoList[1] untuk checkbox
        todoList[1].push('false');
        todoList[2].push(`${waktu.getMinutes()}-${waktu.getSeconds()}`);
        displayTodoList();
        document.forms['addTask'].reset();
    } else {
        todoList[0].push(addTaskInput);
        // tambabh todoList[1] untuk checkbox
        todoList[1].push('false');
        todoList[2].push(`${waktu.getMinutes()}-${waktu.getSeconds()}`);
        displayTodoList();
        document.forms['addTask'].reset();
    }

})

const searchInput = document.getElementById('searchText');
searchInput.onkeydown = function () {
    displayTodoList();
}
searchInput.onkeyup = function () {
    displayTodoList();
}


const add = document.querySelector('#add input');
add.addEventListener('click', function () {
    const addTask = document.getElementById('addTask');
    const layer = document.getElementById('layer');

    if (add.classList.contains('active')) {
        add.classList.remove('active');
        layer.style.opacity = 0;
        layer.style.display = 'none';
        addTask.classList.remove('active');
        addTask.classList.add('no-active');
        setTimeout(() => {
            addTask.style.display = 'none';
        }, 800);
    } else {
        addTask.classList.remove('no-active');
        addTask.classList.add('active');
        addTask.style.display = 'flex';
        add.classList.add('active');
        layer.style.opacity = 0.8;
        layer.style.display = 'block';
    }

})


// const checkbox = document.querySelectorAll('#todoListForm .form-control input#task');
// const deleteTask = document.querySelectorAll('#todoListForm .form-control input#delete');
// const label = document.querySelectorAll('#todoListForm .form-control label');
// let formControl = document.querySelectorAll('#todoListForm .form-control');


// formControl.forEach(ceklist => {

//     ceklist.addEventListener('click',function(){
//         console.info('ok');
//     })

// })




displayTodoList();