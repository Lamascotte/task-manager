/**
 * Composant ClientDetailView - Vue détaillée d'un client
 */
class ClientDetailView {
    
    static render(clientId) {
        const client = ClientService.getById(clientId);
        if (!client) {
            return '<div class="text-center py-8">Client non trouvé</div>';
        }

        const projects = ProjectService.getByClientId(clientId);
        const tasks = TaskService.getByClientId(clientId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg">
                <!-- Header avec infos client -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <button onclick="AdminDashboard.showClients()" class="text-gray-600 hover:text-gray-800 flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i> Retour aux clients
                        </button>
                        <div class="flex gap-2">
                            <button onclick="AdminDashboard.editClient(${client.id})" class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="AdminDashboard.deleteClient(${client.id})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-building text-white text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-dark">${escapeHtml(client.name)}</h2>
                            ${client.description ? `<p class="text-gray-600">${escapeHtml(client.description)}</p>` : ''}
                        </div>
                    </div>
                    
                    <!-- Stats rapides -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-blue-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-600">${projects.length}</div>
                            <div class="text-sm text-gray-600">Projets</div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600">${tasks.length}</div>
                            <div class="text-sm text-gray-600">Tâches</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-purple-600">${this.getActiveDays(tasks)}</div>
                            <div class="text-sm text-gray-600">Jours actifs</div>
                        </div>
                        <div class="bg-orange-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-orange-600">${this.getActiveUsers(tasks)}</div>
                            <div class="text-sm text-gray-600">Utilisateurs</div>
                        </div>
                    </div>
                </div>
                
                <!-- Tabs -->
                <div class="border-b border-gray-200">
                    <div class="flex">
                        <button class="tab-btn active" data-tab="projects">
                            <i class="fas fa-project-diagram mr-2"></i>Projets
                        </button>
                        <button class="tab-btn" data-tab="tasks">
                            <i class="fas fa-tasks mr-2"></i>Tâches
                        </button>
                        <button class="tab-btn" data-tab="timeline">
                            <i class="fas fa-clock mr-2"></i>Timeline
                        </button>
                    </div>
                </div>
                
                <!-- Contenu des tabs -->
                <div id="tabContent">
                    ${this.renderProjectsTab(projects, clientId)}
                </div>
            </div>
        `;
    }

    static renderProjectsTab(projects, clientId) {
        if (projects.length === 0) {
            return `
                <div class="p-8 text-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-folder-open text-gray-400 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-600 mb-2">Aucun projet</h3>
                    <p class="text-gray-500 mb-4">Ce client n'a pas encore de projet</p>
                    <button onclick="AdminDashboard.showNewProject(${clientId})" class="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-plus mr-2"></i> Créer un projet
                    </button>
                </div>
            `;
        }

        return `
            <div class="p-6">
                <div class="grid gap-4">
                    ${projects.map(project => {
                        const taskCount = TaskService.getByProjectId(project.id).length;
                        return `
                            <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer" 
                                 onclick="AdminDashboard.showProjectDetail(${project.id})">
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-gray-800">${escapeHtml(project.name)}</h3>
                                        ${project.description ? `<p class="text-sm text-gray-600 mt-1">${escapeHtml(project.description)}</p>` : ''}
                                        <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span><i class="fas fa-tasks mr-1"></i> ${taskCount} tâches</span>
                                            <span><i class="fas fa-calendar mr-1"></i> Créé le ${formatDate(project.createdAt)}</span>
                                        </div>
                                    </div>
                                    <i class="fas fa-chevron-right text-gray-400"></i>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    static renderTasksTab(tasks) {
        if (tasks.length === 0) {
            return `
                <div class="p-8 text-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clipboard-list text-gray-400 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-600 mb-2">Aucune tâche</h3>
                    <p class="text-gray-500">Aucune tâche n'a été enregistrée pour ce client</p>
                </div>
            `;
        }

        const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return `
            <div class="divide-y divide-gray-200">
                ${sortedTasks.map(task => {
                    const user = StorageService.get(STORAGE_KEYS.USERS).find(u => u.id === task.userId);
                    const project = ProjectService.getById(task.projectId);
                    
                    return `
                        <div class="p-4 hover:bg-gray-50">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-800">${escapeHtml(task.title)}</h4>
                                    <p class="text-sm text-gray-600 mt-1">${escapeHtml(task.details)}</p>
                                    <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span><i class="fas fa-user mr-1"></i> ${user ? escapeHtml(user.name) : 'N/A'}</span>
                                        <span class="cursor-pointer text-blue-600 hover:underline" 
                                              onclick="AdminDashboard.showProjectDetail(${task.projectId})">
                                            <i class="fas fa-project-diagram mr-1"></i> 
                                            ${project ? escapeHtml(project.name) : 'N/A'}
                                        </span>
                                        <span><i class="fas fa-calendar mr-1"></i> ${formatDate(task.date)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    static renderTimelineTab(tasks) {
        // Timeline simple des activités
        const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const last30Days = sortedTasks.slice(0, 30);

        if (last30Days.length === 0) {
            return this.renderTasksTab(tasks); // Réutiliser l'état vide
        }

        return `
            <div class="p-6">
                <h3 class="text-lg font-semibold mb-4">Activité récente</h3>
                <div class="space-y-4">
                    ${last30Days.map(task => {
                        const user = StorageService.get(STORAGE_KEYS.USERS).find(u => u.id === task.userId);
                        const daysSince = Math.floor((new Date() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24));
                        
                        return `
                            <div class="flex items-start">
                                <div class="w-2 h-2 bg-primary rounded-full mt-2 mr-4"></div>
                                <div class="flex-1">
                                    <p class="text-sm text-gray-600">
                                        <span class="font-medium">${user ? escapeHtml(user.name) : 'N/A'}</span>
                                        a ajouté une tâche
                                        ${daysSince === 0 ? "aujourd'hui" : daysSince === 1 ? "hier" : `il y a ${daysSince} jours`}
                                    </p>
                                    <p class="text-sm font-medium text-gray-800 mt-1">${escapeHtml(task.title)}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    static init(clientId) {
        // Gérer les tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab, clientId);
            });
        });
    }

    static switchTab(tab, clientId) {
        // Mettre à jour les boutons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });

        // Mettre à jour le contenu
        const content = document.getElementById('tabContent');
        const client = ClientService.getById(clientId);
        const projects = ProjectService.getByClientId(clientId);
        const tasks = TaskService.getByClientId(clientId);

        switch (tab) {
            case 'projects':
                content.innerHTML = this.renderProjectsTab(projects, clientId);
                break;
            case 'tasks':
                content.innerHTML = this.renderTasksTab(tasks);
                break;
            case 'timeline':
                content.innerHTML = this.renderTimelineTab(tasks);
                break;
        }
    }

    static getActiveDays(tasks) {
        const uniqueDays = new Set(tasks.map(t => new Date(t.date).toDateString()));
        return uniqueDays.size;
    }

    static getActiveUsers(tasks) {
        const uniqueUsers = new Set(tasks.map(t => t.userId));
        return uniqueUsers.size;
    }
}