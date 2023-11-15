document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
  
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
  
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
  
        const updateCheckbox = document.createElement('input');
        updateCheckbox.type = 'checkbox';
        updateCheckbox.checked = task.completed;
        updateCheckbox.addEventListener('change', () => updateTask(task.id, updateCheckbox.checked));
  
        li.appendChild(deleteButton);
        li.appendChild(updateCheckbox);
        taskList.appendChild(li);
      });
    };
  
    const addTask = async (event) => {
      event.preventDefault();
  
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: taskInput.value }),
      });
  
      if (response.ok) {
        taskInput.value = '';
        fetchTasks();
      }
    };
  
    const deleteTask = async (taskId) => {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchTasks();
      }
    };
  
    const updateTask = async (taskId, completed) => {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
  
      if (response.ok) {
        fetchTasks();
      }
    };
  
    taskForm.addEventListener('submit', addTask);
    fetchTasks();
  });