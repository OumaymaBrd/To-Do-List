const modal = document.getElementById('default-modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const confirmActionButton = document.getElementById('confirmAction');
const searchBar = document.getElementById('searchBar');

// Colonnes pour les tâches
const todoColumn = document.getElementById('todoColumn').querySelector('.space-y-4');
const inProgressColumn = document.getElementById('inProgressColumn').querySelector('.space-y-4');
const doneColumn = document.getElementById('doneColumn').querySelector('.space-y-4');

// Ouvrir et fermer le modal
openModalButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));

// Ajouter une nouvelle tâche
confirmActionButton.addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    const taskData = `${title}|${description}|${category}|${deadline}|${priority}`;
    const taskId = `task_${Date.now()}`;

    // Sauvegarder la position initiale de la tâche dans localStorage
    const position = document.querySelectorAll(`#${category}Column .task`).length;
    localStorage.setItem(taskId, `${taskData}|${position}`);

    createTaskElement(taskId, taskData, position);

    modal.classList.add('hidden');
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = 'todo';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskPriority').value = 'P1';
});

// Fonction pour créer et ajouter une tâche
function createTaskElement(taskId, taskData, position) {
    const [title, description, category, deadline, priority] = taskData.split('|');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', 'bg-white', 'p-4', 'rounded-lg', 'shadow', 'border-l-4');
    taskDiv.classList.add(priority === 'P1' ? 'border-red-500' : priority === 'P2' ? 'border-yellow-500' : 'border-green-500');
    taskDiv.draggable = true;
    taskDiv.id = taskId;

    taskDiv.innerHTML = `
        <h3 class="font-medium">${title}</h3>
        <p class="text-sm text-gray-700">${description}</p>
        <p class="text-xs text-gray-500">Échéance : ${deadline}</p>
        <span class="text-xs font-semibold ${priority === 'P1' ? 'text-red-500' : priority === 'P2' ? 'text-yellow-500' : 'text-green-500'}">Priorité: ${priority}</span>
        <div class="mt-2">
            <button class="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2" id="delete">Delete</button>
            <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
        </div>
    `;

    // Suppression de la tâche
    const deleteButton = taskDiv.querySelector('#delete');
    deleteButton.addEventListener('click', () => {
        taskDiv.remove();
        localStorage.removeItem(taskId);
    });

    // Configuration de glisser-déposer
    taskDiv.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', taskId);
        taskDiv.classList.add('opacity-50');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('opacity-50');
    });

    // Ajouter la tâche à la bonne position dans la colonne
    const targetColumn = category === 'todo' ? todoColumn : category === 'inProgress' ? inProgressColumn : doneColumn;
    if (position >= targetColumn.children.length) {
        targetColumn.appendChild(taskDiv);
    } else {
        targetColumn.insertBefore(taskDiv, targetColumn.children[position]);
    }
}

// Configuration des colonnes pour accepter les tâches
[todoColumn, inProgressColumn, doneColumn].forEach(column => {
    column.addEventListener('dragover', event => {
        event.preventDefault();
        column.classList.add('bg-gray-200');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('bg-gray-200');
    });

    column.addEventListener('drop', event => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('text/plain');
        const taskDiv = document.getElementById(taskId);

        if (taskDiv) {
            column.appendChild(taskDiv);
            column.classList.remove('bg-gray-200');

            // Mise à jour de la catégorie et position dans localStorage
            const newCategory = column === todoColumn ? 'todo' : column === inProgressColumn ? 'inProgress' : 'done';
            const taskData = localStorage.getItem(taskId);
            const [title, description, , deadline, priority] = taskData.split('|');
            const position = Array.from(column.children).indexOf(taskDiv);
            const updatedTaskData = `${title}|${description}|${newCategory}|${deadline}|${priority}|${position}`;
            localStorage.setItem(taskId, updatedTaskData);
        }
    });
});

// Charger les tâches du Local Storage
window.onload = () => {
    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task_')) {
            const taskData = localStorage.getItem(key);
            const [title, description, category, deadline, priority, position] = taskData.split('|');
            tasks.push({ key, taskData, category, position: parseInt(position, 10) });
        }
    }
    
    // Trier les tâches par position avant de les créer dans leur colonne respective
    tasks.sort((a, b) => a.position - b.position).forEach(task => {
        createTaskElement(task.key, task.taskData, task.position);
    });
};

// Recherche de tâches
searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value.toLowerCase();
    const allTasks = document.querySelectorAll('.space-y-4 > div');

    allTasks.forEach(task => {
        const title = task.querySelector('h3').innerText.toLowerCase();
        task.style.display = title.includes(searchQuery) ? 'block' : 'none';
    });
});
