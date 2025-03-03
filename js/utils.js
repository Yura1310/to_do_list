
export function getTask(){
    const taskJSON = localStorage.getItem('task');
    return taskJSON ? JSON.parse(taskJSON) : [];

}

export function setTask(task){
    localStorage.setItem('task',JSON.stringify(task));
}

export function generateId(){
    const times = Date.now();
    const random = Math.floor(Math.random() *10000);
    const randomTwo = Math.floor(Math.random() *10000);
    return times + random + randomTwo;
}

export function updateList(){
    document.querySelector('#cont').textContent = '';
    const arrayTask = getTask();
    renderTask(arrayTask);
}

function renderTask(task){
    if(!task || !task.length) return;

    task.sort((a,b)=> {
        if(a.done !== b.done){
            return a.done ? 1:-1;
        }

        if(a.pinned !== b.pinned){
            return a.pinned ? -1:1;
        }

        return a.position - b.position;
    })
    .forEach((value, i) => {
        const {id, task, pinned, done} = value;
        const item = 
            `
            <li class="h-full w-full text-3xl p-[4px] bg-white rounded-[10px]">
                <div class="h-full w-full flex ${done ? 'line-through opacity-50 bg-green' : ''} ${pinned ? 'font-bold' : ''}" id="task" data-task-id = "${id}">
                        <div class="h-fit w-full text-21xl bg-white rounded-l-[6px] p-1 text-balance break-normal">
                            <p id="text">${task}</p>
                        </div>
                        <div class="h-full w-fit flex gap-[8px] justify-center items-center bg-white rounded-r-[6px] pr-[4px]" id="task_btns">
                            <button id="task_done" class="w-[30px] hover:w-[40px] rounded-[4px] border-green-500 duration-300 ease-in ${done ? 'border-4' : ''}"">
                                <img src="img/free-icon-completed-task-12247480.png" alt="">
                            </button>
                            <button id="task_edit" class="w-[20px] hover:w-[40px] duration-300 ease-in">
                                <img src="img/free-icon-pencil-1166723.png" alt="">
                            </button>
                            <button id="task_pinned" class="w-[30px] hover:w-[40px] rounded-[4px] border-red-500 duration-300 ease-in ${pinned ? 'border-4' : ''}">
                                <img src="img/free-icon-pin-push-5342742.png" alt="">
                            </button>
                            <button id="task_del" class="w-[20px] hover:w-[40px] duration-300 ease-in">
                                <img src="img/free-icon-x-mark-9916878.png" alt="">
                            </button>
                        </div>
                </div>
            </li>
            `
        document.querySelector('#cont').insertAdjacentHTML('beforeend',item)
    })
}