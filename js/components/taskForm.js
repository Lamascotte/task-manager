/**
 * Composant TaskForm
 */
class TaskForm {
    
    static render() {
        return `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-xl font-bold text-dark mb-4">Enregistrer une tâche</h2>
                
                <form id="taskForm" class="space-y-4">
                    <div>
                        <label for="taskTitle" class="block text-gray-700 font-medium mb-1">Titre de la tâche *</label>
                        <input type="text" id="taskTitle" required 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            placeholder="Que avez-vous fait ?">
                    </div>
                    
                    <div>
                        <label for="taskDetails" class="block text-gray-700 font-medium mb-1">Détails *</label>
                        <textarea id="taskDetails" required rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            placeholder="Décrivez ce que vous avez accompli..."></textarea>
                    </div>
                    
                    <div class="form-grid">
                        <div>
                            <label for="clientSelect" class="block text-gray-700 font-medium mb-1">Client *</label>
                            <select id="clientSelect" required 
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                                <option value="">Sélectionner un client</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="projectSelect" class="block text-gray-700 font-medium mb-1">Projet *</label>
                            <select id="projectSelect" required 
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                                <option value="">Sélectionner un projet</option>
                            </select>
                        </div>
                    </div>                    
                    <div>
                        <label for="taskDate" class="block text-gray-700 font-medium mb-1">Date *</label>
                        <input type="date" id="taskDate" required 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                    </div>
                    
                    <button type="submit" class="w-full bg-primary hover:bg-accent text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                        <i class="fas fa-plus-circle mr-2"></i> Ajouter la tâche
                    </button>
                </form>
            </div>
        `;
    }

    static init(onSubmit) {
        this.loadClients();
        this.setupEventListeners(onSubmit);
        this.setDefaultDate();
    }

    static setupEventListeners(onSubmit) {
        const form = document.getElementById('taskForm');
        const clientSelect = document.getElementById('clientSelect');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                title: document.getElementById('taskTitle').value,
                details: document.getElementById('taskDetails').value,
                clientId: parseInt(document.getElementById('clientSelect').value),
                projectId: parseInt(document.getElementById('projectSelect').value),
                date: document.getElementById('taskDate').value
            };

            onSubmit(formData);
        });

        clientSelect.addEventListener('change', this.loadProjects.bind(this));
    }
    static loadClients() {
        const clientSelect = document.getElementById('clientSelect');
        const clients = ClientService.getAll();
        
        clientSelect.innerHTML = '<option value="">Sélectionner un client</option>';
        
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });
    }

    static loadProjects() {
        const clientSelect = document.getElementById('clientSelect');
        const projectSelect = document.getElementById('projectSelect');
        const clientId = parseInt(clientSelect.value);
        
        projectSelect.innerHTML = '<option value="">Sélectionner un projet</option>';
        
        if (clientId) {
            const projects = ProjectService.getByClientId(clientId);
            
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.name;
                projectSelect.appendChild(option);
            });
        }
    }

    static setDefaultDate() {
        document.getElementById('taskDate').valueAsDate = new Date();
    }

    static reset() {
        document.getElementById('taskForm').reset();
        this.setDefaultDate();
        document.getElementById('projectSelect').innerHTML = '<option value="">Sélectionner un projet</option>';
    }
}