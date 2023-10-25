
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');


function addTaskToDom(task) {
    const li = document.createElement('li');
  
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.done ? "checked" : ""} class="custom-checkbox">
      <label for="${task.id}">${task.text}</label>
      <img src="delete-icon.png" class="delete" data-id="${task.id}">
    `;
    taskList.append(li);
    // Append the 'li' element to your desired parent element in the DOM
    // Example: parentElement.appendChild(li);
  }

function renderList () {

    taskList.innerHTML = '';
    for(let i=0;i<tasks.length ; i++){
          addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
    

}

function markTaskAsComplete (taskId) {
      const task = tasks.filter(function(task){
            return task.id == taskId;
        });

        if(task.length >0){
           const currentTask = task[0];

           currentTask.done =  !currentTask.done;
           renderList ();
        }
}

function deleteTask (taskId) {
  console.log(taskId);
        const newtask = tasks.filter(function(task){
            return task.id != taskId;
        });
 console.log(newtask);
        tasks = newtask;
    renderList ();
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList ();
    }
 

}


function handlePressEvent(e){
   if(e.key == 'Enter') {
     const text = e.target.value;
     console.log('text' , text);

     const task ={
        text,
        id : new Date().getUTCMilliseconds(),
        done:false
     }
      
     e.target.value = '';
     addTask(task);

   }
}

function handlebylinstener(e){
// console.log(e);
const target = e.target;
console.log(target);
if(target.className == 'delete') {
   const taskId = target.dataset.id;
   console.log(taskId);
   deleteTask(taskId);
   return;
}else if(target.className == 'custom-checkbox'){
  const taskId = target.id;
  markTaskAsComplete(taskId);
  return;
}


}

addTaskInput.addEventListener('keyup',handlePressEvent);

document.addEventListener('click',handlebylinstener);
