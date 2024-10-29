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

            const taskDiv = document.createElement('div');
            taskDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'border-l-4');
            taskDiv.classList.add(priority === 'P1' ? 'border-red-500' : priority === 'P2' ? 'border-yellow-500' : 'border-green-500');
            taskDiv.innerHTML = `
                <h3 class="font-medium">${title}</h3>
                <p class="text-sm text-gray-700">${description}</p>
                <p class="text-xs text-gray-500">Échéance : ${deadline}</p>
                <span class="text-xs font-semibold ${priority === 'P1' ? 'text-red-500' : priority === 'P2' ? 'text-yellow-500' : 'text-green-500'}">Priorité: ${priority}</span>
                <div class="mt-2">
                    <button class="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Delete</button>
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                </div>
            `;

            if (category === 'todo') {
                todoColumn.appendChild(taskDiv);
            } else if (category === 'inProgress') {
                inProgressColumn.appendChild(taskDiv);
            } else if (category === 'done') {
                doneColumn.appendChild(taskDiv);
            }

            modal.classList.add('hidden');
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskCategory').value = 'todo';
            document.getElementById('taskDeadline').value = '';
            document.getElementById('taskPriority').value = 'P1';
        });

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