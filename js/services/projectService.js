class ProjectService {
    
    static getAll() {
        return StorageService.get(STORAGE_KEYS.PROJECTS) || [];
    }

    static add(project) {
        const projects = this.getAll();
        
        const exists = projects.some(p => 
            p.name.toLowerCase() === project.name.toLowerCase() && 
            p.clientId === project.clientId
        );
        
        if (exists) {
            throw new Error(ERROR_MESSAGES.PROJECT_EXISTS);
        }

        const newProject = {
            id: generateId(),
            name: project.name.trim(),
            description: project.description ? project.description.trim() : '',
            clientId: project.clientId,
            createdAt: new Date().toISOString()
        };

        projects.push(newProject);
        StorageService.save(STORAGE_KEYS.PROJECTS, projects);
        return newProject;
    }

    static update(id, projectData) {
        const projects = this.getAll();
        const index = projects.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new Error('Projet non trouvé');
        }

        projects[index] = {
            ...projects[index],
            ...projectData,
            updatedAt: new Date().toISOString()
        };

        StorageService.save(STORAGE_KEYS.PROJECTS, projects);
        return projects[index];
    }
    static delete(id) {
        const projects = this.getAll();
        const filteredProjects = projects.filter(p => p.id !== id);
        StorageService.save(STORAGE_KEYS.PROJECTS, filteredProjects);
        return true;
    }

    static getByClientId(clientId) {
        const projects = this.getAll();
        return projects.filter(p => p.clientId === clientId);
    }

    static deleteByClientId(clientId) {
        const projects = this.getAll();
        const filteredProjects = projects.filter(p => p.clientId !== clientId);
        StorageService.save(STORAGE_KEYS.PROJECTS, filteredProjects);
        return true;
    }

    static getById(id) {
        const projects = this.getAll();
        return projects.find(p => p.id === id);
    }
}