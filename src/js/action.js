const modal = document.getElementById('default-modal');  // voila modal afficher  
const openModalButton = document.getElementById('openModal'); 
const closeModalButton = document.getElementById('closeModal');
const confirmActionButton = document.getElementById('confirmAction');
const searchBar = document.getElementById('searchBar');
const editModal = document.createElement('div');
editModal.classList.add('hidden', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-gray-900', 'bg-opacity-50', 'p-4');
editModal.innerHTML = `
    <div class="bg-gray-800 text-white p-6 rounded-md shadow-lg w-full max-w-lg mx-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Modifier la tâche</h2>
            <button id="cancelEdit" class="text-gray-400 hover:text-white">&times;</button>
        </div>
        <label for="editDescription" class="block text-sm font-medium mb-1">Nouvelle description</label>
        <textarea id="editDescription" rows="4" class="w-full mb-4 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"></textarea>

        <label for="editPriority" class="block text-sm font-medium mb-1">Modifier la priorité</label>
        <select id="editPriority" class="w-full mb-4 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
            <option value="P1" class="text-red-500">P1 - Haute priorité</option>
            <option value="P2" class="text-yellow-500">P2 - Priorité moyenne</option>
            <option value="P3" class="text-green-500">P3 - Basse priorité</option>
        </select>

        <div class="flex justify-end space-x-2">
            <button id="saveEdit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">Enregistrer</button>
        </div>
    </div>
`;
document.body.appendChild(editModal);

const successModal = document.createElement('div');
successModal.classList.add('hidden', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-gray-900', 'bg-opacity-50', 'p-4');
successModal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div class="flex justify-center mb-4">
            <div class="bg-green-100 rounded-full p-2">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        </div>
        <h2 class="text-center text-lg font-semibold text-gray-800">Succès de l'opération</h2>
        <p class="text-center text-gray-600 mt-2">La tâche a été ajoutée avec succès !</p>
        <div class="flex justify-center mt-6">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Fermer</button>
        </div>
    </div>
`;
document.body.appendChild(successModal);
const deleteModal = document.createElement('div');
deleteModal.classList.add('hidden', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-gray-900', 'bg-opacity-50', 'p-4');
deleteModal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div class="flex justify-center mb-4">
            <div class="bg-red-100 rounded-full p-2">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"></path>
                </svg>
            </div>
        </div>
        <h2 class="text-center text-lg font-semibold text-gray-800">Confirmer la suppression</h2>
        <p class="text-center text-gray-600 mt-2">Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.</p>
        <div class="flex justify-center mt-6 space-x-4">
            <button id="cancelDelete" class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100">Annuler</button>
            <button id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">Supprimer</button>
        </div>
    </div>
`;
document.body.appendChild(deleteModal);

let currentTaskId = null;

// elements pour fermer les modals
const closeSuccessModalButton = successModal.querySelector('#closeSuccessModal');
const confirmDeleteButton = deleteModal.querySelector('#confirmDelete');
const cancelDeleteButton = deleteModal.querySelector('#cancelDelete');

// Fermeture des modals
closeSuccessModalButton.addEventListener('click', () => {
    successModal.classList.add('hidden');
});
cancelDeleteButton.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
});

// Ouvrir et fermer le modal d'edition
const saveEditButton = editModal.querySelector('#saveEdit');
const cancelEditButton = editModal.querySelector('#cancelEdit');
const editDescriptionField = editModal.querySelector('#editDescription');
const editPriorityField = editModal.querySelector('#editPriority');

cancelEditButton.addEventListener('click', () => {
    editModal.classList.add('hidden');
    currentTaskId = null;
});

saveEditButton.addEventListener('click', () => {
    if (currentTaskId) {
        const newDescription = editDescriptionField.value;
        const newPriority = editPriorityField.value;
        const taskDiv = document.getElementById(currentTaskId);

        if (taskDiv) {
            // Mise a jour de l'affichage de la tache
            taskDiv.querySelector('p.text-sm').textContent = newDescription;
            taskDiv.querySelector('span').textContent = `Priorité: ${newPriority}`;
            
            // Mise a jour des classes en fonction de la priorite
            taskDiv.classList.remove('border-red-500', 'border-yellow-500', 'border-green-500');
            taskDiv.classList.add(newPriority === 'P1' ? 'border-red-500' : newPriority === 'P2' ? 'border-yellow-500' : 'border-green-500');
            taskDiv.querySelector('span').classList.remove('text-red-500', 'text-yellow-500', 'text-green-500');
            taskDiv.querySelector('span').classList.add(newPriority === 'P1' ? 'text-red-500' : newPriority === 'P2' ? 'text-yellow-500' : 'text-green-500');

            // Mise a jour des donnees dans le localStorage
            const taskData = localStorage.getItem(currentTaskId);
            const [title, , category, deadline] = taskData.split('|');
            const updatedTaskData = `${title}|${newDescription}|${category}|${deadline}|${newPriority}`;
            localStorage.setItem(currentTaskId, updatedTaskData);

            // Fermeture du modal apres la sauvegarde
            editModal.classList.add('hidden');
            currentTaskId = null;
        }
    }
});

//  mettre a jour les compteurs
function updat_Count() {
    document.getElementById('todoCount').textContent = `(${document.getElementById('todoColumn').querySelector('.space-y-4').children.length})`;
    document.getElementById('inProgressCount').textContent = `(${document.getElementById('inProgressColumn').querySelector('.space-y-4').children.length})`;
    document.getElementById('doneCount').textContent = `(${document.getElementById('doneColumn').querySelector('.space-y-4').children.length})`;
}

// Ouvrir et fermer le modal d'ajout
openModalButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));

// Ajouter une nouvelle tâche
document.addEventListener('DOMContentLoaded', () => {
    const titleAlertModal = document.getElementById('titleAlertModal');
    const closeTitleAlertButton = document.getElementById('closeTitleAlert');

    closeTitleAlertButton.addEventListener('click', () => {
        titleAlertModal.classList.add('hidden');
    });

    confirmActionButton.addEventListener('click', () => {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const category = document.getElementById('taskCategory').value;
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;

        if (!title) {
            titleAlertModal.classList.remove('hidden');
            return;
        }

        const taskData = `${title}|${description}|${category}|${deadline}|${priority}`;
        const taskId = `task_${Date.now()}`;

        localStorage.setItem(taskId, taskData);
        createTaskElement(taskId, taskData);

        modal.classList.add('hidden');
        successModal.classList.remove('hidden');

        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskCategory').value = 'todo';
        document.getElementById('taskDeadline').value = '';
        document.getElementById('taskPriority').value = 'P1';

        updat_Count();
    });
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

    const deleteButton = taskDiv.querySelector('#delete');
    deleteButton.addEventListener('click', () => {
        currentTaskId = taskId;
        deleteModal.classList.remove('hidden');

        confirmDeleteButton.onclick = () => {
            taskDiv.remove();
            localStorage.removeItem(taskId);
            deleteModal.classList.add('hidden');
            updat_Count();
        };
    });

    const editButton = taskDiv.querySelector('#edit');
    editButton.addEventListener('click', () => {
        currentTaskId = taskId;
        const taskData = localStorage.getItem(currentTaskId).split('|');
        editDescriptionField.value = taskData[1];
        editPriorityField.value = taskData[4];
        editModal.classList.remove('hidden');
    });

    
    if (category === 'todo') {
        document.getElementById('todoColumn').querySelector('.space-y-4').appendChild(taskDiv);
    } else if (category === 'inProgress') {
        document.getElementById('inProgressColumn').querySelector('.space-y-4').appendChild(taskDiv);
    } else if (category === 'done') {
        document.getElementById('doneColumn').querySelector('.space-y-4').appendChild(taskDiv);
    }

    updat_Count();
}

// Charger les tâches du localStorage et mettre à jour les compteurs lors du chargement de la page
window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task_')) {
            const taskData = localStorage.getItem(key);
            createTaskElement(key, taskData);
        }
    }
    updat_Count();
    document.textContent
    
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

// Condition sur la date sélectionnée
document.addEventListener('DOMContentLoaded', () => {
    const taskDeadlineInput = document.getElementById('taskDeadline');
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // Date maximale (dans 3 jours)
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 3);
    const formattedMaxDate = maxDate.toISOString().split('T')[0];

    // Définir les attributs min et max
    taskDeadlineInput.setAttribute('min', formattedToday);
    taskDeadlineInput.setAttribute('max', formattedMaxDate);
});


// 
document.getElementById('delete_titre_button').addEventListener('click',function supprimerTacheParTitre(test){
   {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const taskData = localStorage.getItem(key);
            
            // Convertir en JSON si les données sont en format JSON
            const [taskTitle] = taskData.split('|'); 
            
            if (taskTitle === test) {
                localStorage.removeItem(key); // Supprime la tâche du stockage local
                alert(`La tâche "${titre}" a été supprimée.`);
                break;
            }
        }
    }
    // version to do list 

})


