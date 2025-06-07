/**
 * Dashboard Admin - Version Simple et Fonctionnelle
 */
class AdminDashboard {
    
    static render() {
        return `
            ${Header.render({ name: 'Administrateur', role: 'admin' })}
            ${AdminStatsCards.render()}
            
            <main class="container mx-auto px-4 py-6">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-dark mb-2">Dashboard Admin</h1>
                    <p class="text-gray-600">Vue d'ensemble et gestion complète</p>
                </div>

                <!-- Navigation simple -->
                <div class="flex flex-wrap gap-4 mb-6">
                    <button id="showAllTasks" class="nav-btn active">
                        <i class="fas fa-tasks mr-2"></i>Toutes les tâches
                    </button>
                    <button id="showClients" class="nav-btn">
                        <i class="fas fa-building mr-2"></i>Gestion clients
                    </button>
                    <button id="showProjects" class="nav-btn">
                        <i class="fas fa-project-diagram mr-2"></i>Gestion projets
                    </button>
                </div>

                <!-- Contenu dynamique -->
                <div id="adminContent">
                    <!-- Sera rempli dynamiquement -->
                </div>
            </main>
        `;
    }

    static init() {
        this.setupNavigation();
        this.updateStats();
        this.showAllTasks(); // Vue par défaut
    }

    static setupNavigation() {
        document.getElementById('showAllTasks').addEventListener('click', () => {
            this.switchView('tasks');
            this.showAllTasks();
        });
        
        document.getElementById('showClients').addEventListener('click', () => {
            this.switchView('clients');
            this.showClients();
        });
        
        document.getElementById('showProjects').addEventListener('click', () => {
            this.switchView('projects');
            this.showProjects();
        });

        // Header logout
        Header.init(() => {
            AuthService.logout();
            location.reload();
        });
    }

    static switchView(activeView) {
        // Mettre à jour les boutons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const viewMap = {
            'tasks': 'showAllTasks',
            'clients': 'showClients', 
            'projects': 'showProjects'
        };
        
        document.getElementById(viewMap[activeView]).classList.add('active');
    }

    static updateStats() {
        const stats = TaskService.getGlobalStatistics();
        AdminStatsCards.update(stats);
    }
    static showAllTasks() {
        const content = document.getElementById('adminContent');
        content.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-dark">Toutes les tâches</h2>
                        <div class="flex gap-3">
                            <input type="text" id="taskSearch" placeholder="Rechercher..." 
                                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                            <select id="userFilter" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                                <option value="">Tous les utilisateurs</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="allTasksList" class="divide-y divide-gray-200">
                    <!-- Tâches chargées ici -->
                </div>
            </div>
        `;
        
        this.loadAllTasks();
        this.setupTaskFilters();
    }

    static loadAllTasks() {
        const allTasks = TaskService.getAllTasksWithDetails();
        const container = document.getElementById('allTasksList');
        
        if (allTasks.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clipboard text-gray-400 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-600 mb-2">Aucune tâche</h3>
                    <p class="text-gray-500">Aucune tâche n'a été créée</p>
                </div>
            `;
            return;
        }

        // Trier par date (plus récentes en premier)
        const sortedTasks = allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        container.innerHTML = '';
        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            container.appendChild(taskElement);
        });
    }

    static createTaskElement(task) {
        const taskDate = new Date(task.date);
        const createdDate = new Date(task.createdAt);
        const today = new Date();
        
        const daysSince = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
        
        let timeBadge = '';
        if (daysSince === 0) {
            timeBadge = '<span class="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">Aujourd hui</span>';
        } else if (daysSince === 1) {
            timeBadge = '<span class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Hier</span>';
        } else if (daysSince < 7) {
            timeBadge = '<span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">' + daysSince + 'j</span>';
        }

        const taskDiv = document.createElement('div');
        taskDiv.className = 'p-4 hover:bg-gray-50 transition-colors';
        taskDiv.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        <h3 class="font-semibold text-gray-800">${escapeHtml(task.title)}</h3>
                        ${timeBadge}
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div class="flex items-center">
                            <i class="fas fa-user text-gray-400 text-xs mr-1"></i>
                            <span class="font-medium">${escapeHtml(task.userName)}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-building text-gray-400 text-xs mr-1"></i>
                            <span>${escapeHtml(task.clientName)}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-project-diagram text-gray-400 text-xs mr-1"></i>
                            <span>${escapeHtml(task.projectName)}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="far fa-calendar text-gray-400 text-xs mr-1"></i>
                            <span>${formatDate(taskDate)}</span>
                        </div>
                    </div>
                    
                    <div class="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        ${escapeHtml(task.details)}
                    </div>
                </div>
                
                <button onclick="AdminDashboard.deleteTask(${task.id})" class="text-gray-400 hover:text-red-500 transition-colors ml-4">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        `;

        return taskDiv;
    }
    static setupTaskFilters() {
        // Remplir le filtre utilisateur
        const users = StorageService.get(STORAGE_KEYS.USERS) || [];
        const userFilter = document.getElementById('userFilter');
        
        users.forEach(user => {
            if (user.role === 'user') { // Seulement les utilisateurs non-admin
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userFilter.appendChild(option);
            }
        });

        // Filtrage en temps réel
        const searchInput = document.getElementById('taskSearch');
        
        const filterTasks = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedUserId = userFilter.value;
            
            let filteredTasks = TaskService.getAllTasksWithDetails();
            
            if (searchTerm) {
                filteredTasks = filteredTasks.filter(task => 
                    task.title.toLowerCase().includes(searchTerm) ||
                    task.details.toLowerCase().includes(searchTerm) ||
                    task.clientName.toLowerCase().includes(searchTerm) ||
                    task.projectName.toLowerCase().includes(searchTerm) ||
                    task.userName.toLowerCase().includes(searchTerm)
                );
            }
            
            if (selectedUserId) {
                filteredTasks = filteredTasks.filter(task => 
                    task.userId === parseInt(selectedUserId)
                );
            }
            
            this.displayFilteredTasks(filteredTasks);
        };

        searchInput.addEventListener('input', filterTasks);
        userFilter.addEventListener('change', filterTasks);
    }

    static displayFilteredTasks(tasks) {
        const container = document.getElementById('allTasksList');
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-search text-gray-400 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-600 mb-2">Aucun résultat</h3>
                    <p class="text-gray-500">Aucune tâche ne correspond à vos critères</p>
                </div>
            `;
            return;
        }

        const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        container.innerHTML = '';
        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            container.appendChild(taskElement);
        });
    }

    static deleteTask(taskId) {
        if (confirmAction('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            TaskService.delete(taskId);
            showNotification('Tâche supprimée avec succès', 'success');
            this.loadAllTasks();
            this.updateStats();
        }
    }
    static showClients() {
        const content = document.getElementById('adminContent');
        content.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-dark">Gestion des clients</h2>
                    <button id="addClientBtn" class="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg flex items-center">
                        <i class="fas fa-plus mr-2"></i> Nouveau client
                    </button>
                </div>
                
                <form id="clientForm" class="hidden mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-medium mb-3">Nouveau client</h3>
                    <div class="space-y-3">
                        <input type="text" id="clientName" placeholder="Nom du client" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                        <textarea id="clientDescription" placeholder="Description (optionnel)" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                        <div class="flex space-x-3">
                            <button type="submit" class="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg">
                                Créer
                            </button>
                            <button type="button" id="cancelClient" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                                Annuler
                            </button>
                        </div>
                    </div>
                </form>

                <div id="clientsList">
                    <!-- Clients chargés ici -->
                </div>
            </div>
        `;
        
        this.loadClients();
        this.setupClientForm();
    }

    static loadClients() {
        const clientsList = document.getElementById('clientsList');
        const clients = ClientService.getAll();
        
        if (clients.length === 0) {
            clientsList.innerHTML = '<p class="text-gray-500 text-center py-4">Aucun client</p>';
            return;
        }

        clientsList.innerHTML = '';
        clients.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3';
            clientDiv.innerHTML = `
                <div>
                    <div class="font-medium text-gray-800">${escapeHtml(client.name)}</div>
                    ${client.description ? `<div class="text-sm text-gray-600">${escapeHtml(client.description)}</div>` : ''}
                </div>
                <button onclick="AdminDashboard.deleteClient(${client.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            clientsList.appendChild(clientDiv);
        });
    }
    static setupClientForm() {
        const addBtn = document.getElementById('addClientBtn');
        const form = document.getElementById('clientForm');
        const cancelBtn = document.getElementById('cancelClient');

        addBtn.addEventListener('click', () => {
            form.classList.toggle('hidden');
        });

        cancelBtn.addEventListener('click', () => {
            form.classList.add('hidden');
            form.reset();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            try {
                const clientData = {
                    name: document.getElementById('clientName').value,
                    description: document.getElementById('clientDescription').value
                };
                
                ClientService.add(clientData);
                showNotification('Client ajouté avec succès', 'success');
                form.classList.add('hidden');
                form.reset();
                this.loadClients();
                this.updateStats();
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }

    static showProjects() {
        const content = document.getElementById('adminContent');
        content.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-dark">Gestion des projets</h2>
                    <button id="addProjectBtn" class="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg flex items-center">
                        <i class="fas fa-plus mr-2"></i> Nouveau projet
                    </button>
                </div>
                
                <form id="projectForm" class="hidden mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-medium mb-3">Nouveau projet</h3>
                    <div class="space-y-3">
                        <select id="projectClientSelect" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                            <option value="">Sélectionner un client</option>
                        </select>
                        <input type="text" id="projectName" placeholder="Nom du projet" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                        <textarea id="projectDescription" placeholder="Description (optionnel)" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                        <div class="flex space-x-3">
                            <button type="submit" class="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg">
                                Créer
                            </button>
                            <button type="button" id="cancelProject" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                                Annuler
                            </button>
                        </div>
                    </div>
                </form>

                <div id="projectsList">
                    <!-- Projets chargés ici -->
                </div>
            </div>
        `;
        
        this.loadProjects();
        this.setupProjectForm();
    }
    static loadProjects() {
        const projectsList = document.getElementById('projectsList');
        const projects = ProjectService.getAll();
        
        if (projects.length === 0) {
            projectsList.innerHTML = '<p class="text-gray-500 text-center py-4">Aucun projet</p>';
            return;
        }

        projectsList.innerHTML = '';
        projects.forEach(project => {
            const client = ClientService.getById(project.clientId);
            const projectDiv = document.createElement('div');
            projectDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3';
            projectDiv.innerHTML = `
                <div>
                    <div class="font-medium text-gray-800">${escapeHtml(project.name)}</div>
                    <div class="text-sm text-gray-600">Client: ${escapeHtml(client ? client.name : 'Client supprimé')}</div>
                    ${project.description ? `<div class="text-sm text-gray-600">${escapeHtml(project.description)}</div>` : ''}
                </div>
                <button onclick="AdminDashboard.deleteProject(${project.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            projectsList.appendChild(projectDiv);
        });
    }

    static setupProjectForm() {
        const addBtn = document.getElementById('addProjectBtn');
        const form = document.getElementById('projectForm');
        const cancelBtn = document.getElementById('cancelProject');
        
        // Charger les clients dans le select
        const clientSelect = document.getElementById('projectClientSelect');
        const clients = ClientService.getAll();
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });

        addBtn.addEventListener('click', () => {
            form.classList.toggle('hidden');
        });

        cancelBtn.addEventListener('click', () => {
            form.classList.add('hidden');
            form.reset();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            try {
                const projectData = {
                    name: document.getElementById('projectName').value,
                    description: document.getElementById('projectDescription').value,
                    clientId: parseInt(document.getElementById('projectClientSelect').value)
                };
                
                ProjectService.add(projectData);
                showNotification('Projet ajouté avec succès', 'success');
                form.classList.add('hidden');
                form.reset();
                this.loadProjects();
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }

    static deleteClient(id) {
        if (confirmAction('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            ClientService.delete(id);
            showNotification('Client supprimé avec succès', 'success');
            this.loadClients();
            this.updateStats();
        }
    }

    static deleteProject(id) {
        if (confirmAction('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            ProjectService.delete(id);
            showNotification('Projet supprimé avec succès', 'success');
            this.loadProjects();
        }
    }
}