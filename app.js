// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Function Load all event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
    // Create li element:
    const li = document.createElement('li');
    // Add a class name to li element:
    li.className = 'collection-item';
    // Create text node and append to li element:
    li.appendChild(document.createTextNode(task));
    // Create new link a element:
    const link = document.createElement('a');
    // Add class name to a element:
    link.className = 'delete-item secondary-content';
    // Add icon html:
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li element:
    li.appendChild(link);
    
    // Append li element to ul element:
    taskList.appendChild(li);
    console.log(li);
    })
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task !');
    }

    // Create li element:
    const li = document.createElement('li');
    // Add a class name to li element:
    li.className = 'collection-item';
    // Create text node and append to li element:
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link a element:
    const link = document.createElement('a');
    // Add class name to a element:
    link.className = 'delete-item secondary-content';
    // Add icon html:
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li element:
    li.appendChild(link);
    
    // Append li element to ul element:
    taskList.appendChild(li);
    console.log(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    //taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
