class TaskService {
    
    static getAll() {
        return StorageService.get(STORAGE_KEYS.TASKS) || [];
    }

    static add(task) {
        const tasks = this.getAll();

        const newTask = {
            id: generateId(),
            title: task.title.trim(),
            details: task.details.trim(),
            clientId: task.clientId,
            projectId: task.projectId,
            date: task.date,
            userId: task.userId,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        StorageService.save(STORAGE_KEYS.TASKS, tasks);
        return newTask;
    }

    static update(id, taskData) {
        const tasks = this.getAll();
        const index = tasks.findIndex(t => t.id === id);
        
        if (index === -1) {
            throw new Error('Tâche non trouvée');
        }

        tasks[index] = {
            ...tasks[index],
            ...taskData,
            updatedAt: new Date().toISOString()
        };

        StorageService.save(STORAGE_KEYS.TASKS, tasks);
        return tasks[index];
    }

    static delete(id) {
        const tasks = this.getAll();
        const filteredTasks = tasks.filter(t => t.id !== id);
        StorageService.save(STORAGE_KEYS.TASKS, filteredTasks);
        return true;
    }
    static getByUserId(userId) {
        const tasks = this.getAll();
        return tasks.filter(t => t.userId === userId);
    }

    static getFilteredTasks(userId, filterMode) {
        const userTasks = this.getByUserId(userId);
        const today = new Date();
        
        switch (filterMode) {
            case FILTER_MODES.TODAY:
                return userTasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate.toDateString() === today.toDateString();
                });
            
            case FILTER_MODES.WEEK:
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - today.getDay());
                
                const lastDayOfWeek = new Date(today);
                lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                
                return userTasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
                });
            
            default:
                return userTasks;
        }
    }

    static getStatistics(userId) {
        const userTasks = this.getByUserId(userId);
        const today = new Date();
        
        const todayTasks = userTasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === today.toDateString();
        }).length;

        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        
        const lastDayOfWeek = new Date(today);
        lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        
        const thisWeekTasks = userTasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
        }).length;

        const uniqueClients = [...new Set(userTasks.map(task => task.clientId))].length;

        return {
            total: userTasks.length,
            today: todayTasks,
            thisWeek: thisWeekTasks,
            clients: uniqueClients
        };
    }

    // Nouvelles méthodes pour l'admin
    static getAllTasksWithDetails() {
        const tasks = this.getAll();
        const users = StorageService.get(STORAGE_KEYS.USERS) || [];
        
        return tasks.map(task => {
            const user = users.find(u => u.id === task.userId);
            const client = ClientService.getById(task.clientId);
            const project = ProjectService.getById(task.projectId);
            
            return {
                ...task,
                userName: user ? user.name : 'Utilisateur supprimé',
                clientName: client ? client.name : 'Client supprimé',
                projectName: project ? project.name : 'Projet supprimé'
            };
        });
    }

    static getGlobalStatistics() {
        const allTasks = this.getAll();
        const users = StorageService.get(STORAGE_KEYS.USERS) || [];
        const today = new Date();
        
        const todayTasks = allTasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === today.toDateString();
        }).length;

        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        
        const lastDayOfWeek = new Date(today);
        lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        
        const thisWeekTasks = allTasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
        }).length;

        const activeUsers = [...new Set(allTasks.map(task => task.userId))].length;
        const uniqueClients = [...new Set(allTasks.map(task => task.clientId))].length;

        return {
            total: allTasks.length,
            today: todayTasks,
            thisWeek: thisWeekTasks,
            users: activeUsers,
            clients: uniqueClients
        };
    }
}