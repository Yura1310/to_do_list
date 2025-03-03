import{
    getTask,
    setTask,
    generateId,
    updateList
} from "./utils.js";

updateList();


const form = document.querySelector('#form')
const textarea = document.querySelector('#input')
const buttonSend = document.querySelector('#buttonSend')
const output = document.querySelector('#cont')

let editId = null;
let isEditTask = false;

form.addEventListener('submit', SendTask);

output.addEventListener('click', event =>{
    const taskElemet = event.target.closest('#task_btns')
    if(!taskElemet) return;

    if(event.target.closest('#task_pinned')){
        pinnedTask(event);
    }
    else if(event.target.closest('#task_edit')){
        EditTask(event);
    }
    else if(event.target.closest('#task_del')){
        delTask(event);
    }
    else if(event.target.closest('#task_done')){
        doneTask(event);
    }
})

function SendTask(event){
    event.preventDefault();

    const task = textarea.value.trim().replace(/\s+/g,' ');
    if(!task){
        return alert('Поле не заполнено!')
    }

    if(isEditTask){
        saveEditTask(task);
        return;
    }
    
    const arrayTask = getTask();
    arrayTask.push({
        id: generateId(),
        task,
        done: false,
        pinned: false,
        position: 1000,
    })

    console.log("После добавления:", arrayTask);
    setTask(arrayTask)
    updateList()
    form.reset()
        
} 

function doneTask(event){
    const task = event.target.closest('#task');
    const id = Number(task.dataset.taskId);

    const arrayTask = getTask();
    const index = arrayTask.findIndex(task => task.id === id);


    if(index === -1){
        return alert('Такая задача не найдена');
    }

    if(!arrayTask[index].done && arrayTask[index].pinned){
        arrayTask[index].pinned = false;
    }

    if(arrayTask[index].done){
        arrayTask[index].done = false;
    }
    else{
        arrayTask[index].done = true;
    }

    setTask(arrayTask)
    updateList()
}

function pinnedTask(event){
    const task = event.target.closest('#task');
    const id = Number(task.dataset.taskId);

    const arrayTask = getTask();
    const index = arrayTask.findIndex(task => task.id === id);


    if(index === -1){
        return alert('Такая задача не найдена');
    }

    if(!arrayTask[index].pinned && arrayTask[index].done){
        return alert('Чтобы закрепить, уберите отметку о выполнении!');
    }

    if(arrayTask[index].pinned){
        arrayTask[index].pinned = false;
    }
    else{
        arrayTask[index].pinned = true;
    }

    setTask(arrayTask)
    updateList()
}

function delTask(event){
    const task = event.target.closest('#task');
    const id = Number(task.dataset.taskId);

    const arrayTask = getTask();
    const newTaskArr = arrayTask.filter(task => task.id !== id);
    setTask(newTaskArr)
    updateList()
}

function EditTask(event){
    const task = event.target.closest('#task');
    const text = task.querySelector('#text');
    editId = Number(task.dataset.taskId);


    textarea.value = text.textContent;
    isEditTask = true;
    form.scrollIntoView({behavior: 'smooth'});
}

function saveEditTask(task){
    const arrayTasks = getTask();
    const editTaskId = arrayTasks.findIndex(task => task.id === editId);

    if(editTaskId !== -1){
        arrayTasks[editTaskId].task = task;
        setTask(arrayTasks);
        updateList();
    }
    else{
        alert('Такая задача не найдена!');
    }

    resetSendForm();
}

function resetSendForm(){
    editId = null;
    isEditTask = false;
    form.reset();
}

