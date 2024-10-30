const modal = document.getElementById('default-modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const confirmActionButton = document.getElementById('confirmAction');
const searchBar = document.getElementById('searchBar');

// Récupérer les colonnes pour les tâches
const todoColumn = document.getElementById('todoColumn').querySelector('.space-y-4');
const inProgressColumn = document.getElementById('inProgressColumn').querySelector('.space-y-4');
const doneColumn = document.getElementById('doneColumn').querySelector('.space-y-4');

// Afficher le modal
openModalButton.addEventListener('click', function() {
    modal.classList.remove('hidden');
});

// Masquer le modal
closeModalButton.addEventListener('click', function() {
    modal.classList.add('hidden');
});

// Ajouter une nouvelle tâche dans la colonne choisie
confirmActionButton.addEventListener('click', function() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    // Concatène les informations de la tâche en une seule chaîne
    const taskData = `${title}|${description}|${category}|${deadline}|${priority}`;
    const taskId = `task_${Date.now()}`; // ID unique basé sur l'horodatage

    // Enregistre la tâche dans le Local Storage
    localStorage.setItem(taskId, taskData);

    // Crée et affiche l'élément de tâche
    createTaskElement(taskId, taskData);

    // Réinitialise le formulaire
    modal.classList.add('hidden');
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = 'todo';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskPriority').value = 'P1';
});

function createTaskElement(taskId, taskData) {
    // Sépare les valeurs de la chaîne
    const [title, description, category, deadline, priority] = taskData.split('|');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'border-l-4');
    taskDiv.classList.add(priority === 'P1' ? 'border-red-500' : priority === 'P2' ? 'border-yellow-500' : 'border-green-500');

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

    // Fonction de suppression du bouton "Delete"
    const deleteButton = taskDiv.querySelector('#delete');
    deleteButton.addEventListener('click', function() {
        taskDiv.remove(); // Supprime l'élément de la tâche du DOM

        // Supprime la tâche du Local Storage
        localStorage.removeItem(taskId); // Supprime l'entrée spécifique avec l'ID donné
    });

    // Ajoute la tâche à la colonne appropriée
    if (category === 'todo') {
        todoColumn.appendChild(taskDiv);
    } else if (category === 'inProgress') {
        inProgressColumn.appendChild(taskDiv);
    } else if (category === 'done') {
        doneColumn.appendChild(taskDiv);
    }
}

// Chargement des tâches au démarrage de la page
window.onload = function() {
    // Parcourt toutes les clés du Local Storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Vérifie si la clé correspond à une tâche
        if (key.startsWith('task_')) {
            const taskData = localStorage.getItem(key);
            createTaskElement(key, taskData);
        }
    }
};

// Recherche des tâches
searchBar.addEventListener('input', function() {
    const searchQuery = searchBar.value.toLowerCase();
    const allTasks = document.querySelectorAll('.space-y-4 > div');

    allTasks.forEach(task => {
        const title = task.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchQuery)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
});


// traitement du button Delete 

