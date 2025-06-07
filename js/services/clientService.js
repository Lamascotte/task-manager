/**
 * Service de gestion des clients
 */
class ClientService {
    
    static getAll() {
        return StorageService.get(STORAGE_KEYS.CLIENTS) || [];
    }

    static add(client) {
        const clients = this.getAll();
        
        // Vérifier si le client existe déjà
        const exists = clients.some(c => c.name.toLowerCase() === client.name.toLowerCase());
        if (exists) {
            throw new Error(ERROR_MESSAGES.CLIENT_EXISTS);
        }

        const newClient = {
            id: generateId(),
            name: client.name.trim(),
            description: client.description ? client.description.trim() : '',
            createdAt: new Date().toISOString()
        };

        clients.push(newClient);
        StorageService.save(STORAGE_KEYS.CLIENTS, clients);
        return newClient;
    }

    static update(id, clientData) {
        const clients = this.getAll();
        const index = clients.findIndex(c => c.id === id);
        
        if (index === -1) {
            throw new Error('Client non trouvé');
        }

        clients[index] = {
            ...clients[index],
            ...clientData,
            updatedAt: new Date().toISOString()
        };

        StorageService.save(STORAGE_KEYS.CLIENTS, clients);
        return clients[index];
    }
    static delete(id) {
        const clients = this.getAll();
        const filteredClients = clients.filter(c => c.id !== id);
        
        // Supprimer aussi les projets associés
        ProjectService.deleteByClientId(id);
        
        StorageService.save(STORAGE_KEYS.CLIENTS, filteredClients);
        return true;
    }

    static getById(id) {
        const clients = this.getAll();
        return clients.find(c => c.id === id);
    }
}