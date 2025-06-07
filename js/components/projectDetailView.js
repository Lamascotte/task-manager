/**
 * Composant ProjectDetailView - Vue détaillée d'un projet
 */
class ProjectDetailView {
    
    static render(projectId) {
        const project = ProjectService.getById(projectId);
        if (!project) {
            return '<div class="text-center py-8">Projet non trouvé</div>';
        }

        const client = ClientService.getById(project.clientId);
        const tasks = TaskService.getByProjectId(projectId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg">
                <!-- Header -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <button onclick="AdminDashboard.showProjects()" class="text-gray-600 hover:text-gray-800 flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i> Retour aux projets
                        </button>
                        <button onclick="AdminDashboard.deleteProject(${project.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mr-4">
                            <i class="fas fa-project-diagram text-white text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-dark">${escapeHtml(project.name)}</h2>
                            ${project.description ? `<p class="text-gray-600">${escapeHtml(project.description)}</p>` : ''}
                            <p class="text-sm text-gray-500 mt-1">
                                Client : 
                                <span class="text-blue-600 hover:underline cursor-pointer" 
                                      onclick="AdminDashboard.showClientDetail(${client.id})">
                                    ${escapeHtml(client.name)}
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-4">
                        <div class="bg-green-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600">${tasks.length}</div>
                            <div class="text-sm text-gray-600">Tâches</div>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-600">${this.getActiveUsers(tasks)}</div>
                            <div class="text-sm text-gray-600">Contributeurs</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-purple-600">${this.getDaysActive(project)}</div>
                            <div class="text-sm text-gray-600">Jours actif</div>
                        </div>
                    </div>
                </div>
                
                <!-- Liste des tâches -->
                <div class="p-6">
                    <h3 class="text-lg font-semibold mb-4">Tâches du projet</h3>
                    ${this.renderTasks(tasks)}
                </div>
            </div>
        `;
    }

    static renderTasks(tasks) {
        if (tasks.length === 0) {
            return `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clipboard-list text-gray-400 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-600 mb-2">Aucune tâche</h3>
                    <p class="text-gray-500">Aucune tâche n'a été créée pour ce projet</p>
                </div>
            `;
        }

        const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return `
            <div class="space-y-3">
                ${sortedTasks.map(task => {
                    const user = StorageService.get(STORAGE_KEYS.USERS).find(u => u.id === task.userId);
                    return `
                        <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                            <h4 class="font-medium text-gray-800">${escapeHtml(task.title)}</h4>
                            <p class="text-sm text-gray-600 mt-1">${escapeHtml(task.details)}</p>
                            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span><i class="fas fa-user mr-1"></i> ${user ? escapeHtml(user.name) : 'N/A'}</span>
                                <span><i class="fas fa-calendar mr-1"></i> ${formatDate(task.date)}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    static getActiveUsers(tasks) {
        return new Set(tasks.map(t => t.userId)).size;
    }

    static getDaysActive(project) {
        const created = new Date(project.createdAt);
        const now = new Date();
        return Math.floor((now - created) / (1000 * 60 * 60 * 24));
    }
}