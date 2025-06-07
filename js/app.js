/**
 * Application principale
 */

class App {
    constructor() {
        this.currentUser = null;
        this.filterMode = FILTER_MODES.ALL;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthentication();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
    }

    checkAuthentication() {
        if (AuthService.isAuthenticated()) {
            this.currentUser = AuthService.getCurrentUser();
            this.showMainApp();
        } else {
            this.showLoginPage();
        }
    }

    handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        console.log('🔑 Tentative de connexion:', { username, password });
        console.log('📊 Utilisateurs disponibles:', StorageService.get(STORAGE_KEYS.USERS));
        
        const user = AuthService.login(username, password);
        
        console.log('👤 Résultat connexion:', user);
        
        if (user) {
            this.currentUser = user;
            this.showMainApp();
            showNotification('Connexion réussie !', 'success');
        } else {
            this.showError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
    }
    showLoginPage() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('appContent').classList.add('hidden');
    }

    showMainApp() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('appContent').classList.remove('hidden');
        this.loadMainInterface();
    }

    loadMainInterface() {
        if (AuthService.isAdmin()) {
            this.loadAdminInterface();
        } else {
            this.loadUserInterface();
        }
    }

    loadAdminInterface() {
        const appContent = document.getElementById('appContent');
        appContent.innerHTML = AdminPanel.render();
        AdminPanel.init();
    }

    loadUserInterface() {
        const appContent = document.getElementById('appContent');
        appContent.innerHTML = this.renderUserInterface();
        this.initUserInterface();
    }

    renderUserInterface() {
        return `
            ${Header.render(this.currentUser)}
            ${StatsCards.render()}
            
            <main class="container mx-auto px-4 py-6">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="lg:w-2/5">
                        ${TaskForm.render()}
                    </div>
                    <div class="lg:w-3/5">
                        ${TaskList.render()}
                    </div>
                </div>
            </main>
        `;
    }

    initUserInterface() {
        Header.init(this.handleLogout.bind(this));
        TaskForm.init(this.handleTaskSubmit.bind(this));
        TaskList.init(this.filterMode, this.handleFilterChange.bind(this));
        this.updateStats();
        this.updateTaskList();
    }
    handleTaskSubmit(taskData) {
        try {
            taskData.userId = this.currentUser.id;
            TaskService.add(taskData);
            showNotification(SUCCESS_MESSAGES.TASK_ADDED, 'success');
            this.updateStats();
            this.updateTaskList();
            TaskForm.reset();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    handleFilterChange(newFilterMode) {
        this.filterMode = newFilterMode;
        this.updateTaskList();
    }

    handleLogout() {
        AuthService.logout();
        this.currentUser = null;
        this.showLoginPage();
        showNotification('Déconnexion réussie', 'info');
    }

    updateStats() {
        const stats = TaskService.getStatistics(this.currentUser.id);
        StatsCards.update(stats);
    }

    updateTaskList() {
        const tasks = TaskService.getFilteredTasks(this.currentUser.id, this.filterMode);
        TaskList.update(tasks, this.handleDeleteTask.bind(this));
    }

    handleDeleteTask(taskId) {
        if (confirmAction(ERROR_MESSAGES.DELETE_CONFIRM)) {
            TaskService.delete(taskId);
            showNotification(SUCCESS_MESSAGES.ITEM_DELETED, 'success');
            this.updateStats();
            this.updateTaskList();
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    }
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    // Vérification debug au démarrage
    console.log('🚀 Démarrage de l\'application...');
    console.log('📋 Constantes chargées:', typeof STORAGE_KEYS !== 'undefined');
    console.log('💾 StorageService chargé:', typeof StorageService !== 'undefined');
    console.log('👥 Utilisateurs par défaut:', DEFAULT_USERS);
    
    // Attendre un peu pour s'assurer que tout est chargé
    setTimeout(() => {
        window.app = new App();
    }, 200);
});