class TaskList {
    
    static render() {
        return `
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-dark">Mes tâches</h2>
                <div class="flex space-x-2">
                    <button id="viewAll" class="btn-filter px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">Toutes</button>
                    <button id="viewToday" class="btn-filter px-3 py-1 bg-secondary text-white rounded-lg text-sm font-medium">Aujourd'hui</button>
                    <button id="viewWeek" class="btn-filter px-3 py-1 bg-secondary text-white rounded-lg text-sm font-medium">Cette semaine</button>
                </div>
            </div>
            
            <div id="tasksContainer" class="space-y-4">
                <div class="empty-state flex flex-col items-center justify-center bg-white rounded-xl shadow-lg py-12">
                    <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-clipboard text-primary text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-dark mb-2">Aucune tâche</h3>
                    <p class="text-gray-600 text-center max-w-xs">Ajoutez votre première tâche pour commencer</p>
                </div>
            </div>
        `;
    }

    static init(filterMode, onFilterChange) {
        this.onFilterChange = onFilterChange;
        this.setupFilterButtons(filterMode);
    }
    static setupFilterButtons(activeMode) {
        const buttons = {
            viewAll: FILTER_MODES.ALL,
            viewToday: FILTER_MODES.TODAY,
            viewWeek: FILTER_MODES.WEEK
        };

        Object.keys(buttons).forEach(buttonId => {
            const button = document.getElementById(buttonId);
            const mode = buttons[buttonId];
            
            if (mode === activeMode) {
                button.classList.remove('bg-secondary');
                button.classList.add('bg-primary', 'active');
            } else {
                button.classList.remove('bg-primary', 'active');
                button.classList.add('bg-secondary');
            }

            button.addEventListener('click', () => {
                this.onFilterChange(mode);
                this.setupFilterButtons(mode);
            });
        });
    }

    static update(tasks, onDelete) {
        const container = document.getElementById('tasksContainer');
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state flex flex-col items-center justify-center bg-white rounded-xl shadow-lg py-12">
                    <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-clipboard text-primary text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-dark mb-2">Aucune tâche</h3>
                    <p class="text-gray-600 text-center max-w-xs">Aucune tâche trouvée pour cette période</p>
                </div>
            `;
            return;
        }

        // Trier les tâches par date (plus récentes en premier)
        const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = '';
        
        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task, onDelete);
            container.appendChild(taskElement);
        });
    }
    static createTaskElement(task, onDelete) {
        const client = ClientService.getById(task.clientId);
        const project = ProjectService.getById(task.projectId);
        
        const taskDate = new Date(task.date);
        const createdDate = new Date(task.createdAt);
        const today = new Date();
        
        const daysSince = daysBetween(today, createdDate);
        
        let timeBadge = '';
        if (daysSince === 0) {
            timeBadge = '<span class="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">Aujourd\'hui</span>';
        } else if (daysSince === 1) {
            timeBadge = '<span class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Hier</span>';
        } else if (daysSince < 7) {
            timeBadge = `<span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">${daysSince}j</span>`;
        }

        const taskDiv = document.createElement('div');
        taskDiv.className = 'card-hover bg-white rounded-xl shadow p-5 animate-fadeIn';
        taskDiv.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center">
                        <h3 class="font-bold text-gray-800 text-lg">${escapeHtml(task.title)}</h3>
                        ${timeBadge}
                    </div>
                    <div class="flex items-center mt-1 space-x-4">
                        <div class="flex items-center">
                            <i class="fas fa-building text-gray-500 text-xs mr-1.5"></i>
                            <span class="text-gray-700 text-sm">${escapeHtml(client?.name || 'Client supprimé')}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-project-diagram text-gray-500 text-xs mr-1.5"></i>
                            <span class="text-gray-700 text-sm">${escapeHtml(project?.name || 'Projet supprimé')}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="far fa-calendar text-gray-500 text-xs mr-1.5"></i>
                            <span class="text-gray-700 text-sm">${formatDate(taskDate)}</span>
                        </div>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-red-500 transition-colors ml-4" data-task-id="${task.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                <p class="text-gray-700">${escapeHtml(task.details)}</p>
            </div>
        `;

        // Ajouter l'événement de suppression
        const deleteBtn = taskDiv.querySelector('[data-task-id]');
        deleteBtn.addEventListener('click', () => onDelete(task.id));

        return taskDiv;
    }
}