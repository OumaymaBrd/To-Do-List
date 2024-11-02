// Sélection des éléments DOM
const modal = document.getElementById('default-modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const confirmActionButton = document.getElementById('confirmAction');
const searchBar = document.getElementById('searchBar');

const editModal = document.createElement('div');
editModal.classList.add('hidden', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-gray-900', 'bg-opacity-50', 'p-4');
editModal.innerHTML = `
    <div class="bg-gray-800 text-white p-6 rounded-md shadow-lg w-full max-w-lg mx-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Modifier la description</h2>
            <button id="cancelEdit" class="text-gray-400 hover:text-white">&times;</button>
        </div>
        <label for="editDescription" class="block text-sm font-medium mb-1">Nouvelle description</label>
        <textarea id="editDescription" rows="4" class="w-full mb-4 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"></textarea>
        <div class="flex justify-end space-x-2">
            <button id="saveEdit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">Enregistrer</button>
        </div>
    </div>
`;

document.body.appendChild(editModal);

let currentTaskId = null;

// Ouvrir et fermer le modal d'édition
const saveEditButton = editModal.querySelector('#saveEdit');
const cancelEditButton = editModal.querySelector('#cancelEdit');
const editDescriptionField = editModal.querySelector('#editDescription');

cancelEditButton.addEventListener('click', () => {
    editModal.classList.add('hidden');
    currentTaskId = null;
});

saveEditButton.addEventListener('click', () => {
    if (currentTaskId) {
        const newDescription = editDescriptionField.value;
        const taskDiv = document.getElementById(currentTaskId);

        if (taskDiv) {
            // Mettre à jour la description dans le DOM
            taskDiv.querySelector('p.text-sm').textContent = newDescription;

            // Mettre à jour la description dans le local storage
            const taskData = localStorage.getItem(currentTaskId);
            const [title, , category, deadline, priority] = taskData.split('|');
            const updatedTaskData = `${title}|${newDescription}|${category}|${deadline}|${priority}`;
            localStorage.setItem(currentTaskId, updatedTaskData);

            // Réinitialiser et fermer le modal
            editModal.classList.add('hidden');
            currentTaskId = null;
        }
    }
});

// Fonction pour mettre à jour les compteurs
function updateCounts() {
    document.getElementById('todoCount').textContent = `(${document.getElementById('todoColumn').querySelector('.space-y-4').children.length})`;
    document.getElementById('inProgressCount').textContent = `(${document.getElementById('inProgressColumn').querySelector('.space-y-4').children.length})`;
    document.getElementById('doneCount').textContent = `(${document.getElementById('doneColumn').querySelector('.space-y-4').children.length})`;
}

// Ouvrir et fermer le modal d'ajout
openModalButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));

// Ajouter une nouvelle tâche
confirmActionButton.addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
        alert("Le titre est obligatoire pour ajouter une tâche.");
        return;
    }

    const taskData = `${title}|${description}|${category}|${deadline}|${priority}`;
    const taskId = `task_${Date.now()}`;

    localStorage.setItem(taskId, taskData);
    createTaskElement(taskId, taskData);

    modal.classList.add('hidden');
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = 'todo';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskPriority').value = 'P1';

    updateCounts(); // Mise à jour des compteurs après l'ajout
});

// Fonction pour créer et ajouter une tâche
function createTaskElement(taskId, taskData) {
    const [title, description, category, deadline, priority] = taskData.split('|');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'border-l-4');
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
            <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs" id="edit">Edit</button>
        </div>
    `;

    // Ajouter un événement au bouton Edit
    const editButton = taskDiv.querySelector('#edit');
    editButton.addEventListener('click', () => {
        currentTaskId = taskId;
        editDescriptionField.value = description; // Pré-remplir avec la description actuelle
        editModal.classList.remove('hidden'); // Afficher le modal d'édition
    });

    // Suppression de la tâche
    const deleteButton = taskDiv.querySelector('#delete');
    deleteButton.addEventListener('click', () => {
        taskDiv.remove();
        localStorage.removeItem(taskId);
        updateCounts(); // Mise à jour des compteurs après la suppression
    });

    taskDiv.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', taskId);
        taskDiv.classList.add('opacity-50');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('opacity-50');
    });

    // Ajouter la tâche à la colonne appropriée
    if (category === 'todo') {
        document.getElementById('todoColumn').querySelector('.space-y-4').appendChild(taskDiv);
    } else if (category === 'inProgress') {
        document.getElementById('inProgressColumn').querySelector('.space-y-4').appendChild(taskDiv);
    } else if (category === 'done') {
        document.getElementById('doneColumn').querySelector('.space-y-4').appendChild(taskDiv);
    }

    updateCounts(); // Mise à jour des compteurs après la création
}

// Configuration des colonnes pour accepter les tâches
[document.getElementById('todoColumn').querySelector('.space-y-4'), document.getElementById('inProgressColumn').querySelector('.space-y-4'), document.getElementById('doneColumn').querySelector('.space-y-4')].forEach(column => {
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

            const taskData = localStorage.getItem(taskId);
            const [title, description, , deadline, priority] = taskData.split('|');
            const newCategory = column === document.getElementById('todoColumn').querySelector('.space-y-4') ? 'todo' : column === document.getElementById('inProgressColumn').querySelector('.space-y-4') ? 'inProgress' : 'done';
            const updatedTaskData = `${title}|${description}|${newCategory}|${deadline}|${priority}`;
            localStorage.setItem(taskId, updatedTaskData);

            updateCounts(); // Mise à jour des compteurs après le déplacement
        }
    });
});

// Charger les tâches du Local Storage et mettre à jour les compteurs lors du chargement de la page
window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task_')) {
            const taskData = localStorage.getItem(key);
            createTaskElement(key, taskData);
        }
    }
    updateCounts(); // Mise à jour initiale des compteurs
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
