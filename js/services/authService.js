/**
 * Service d'authentification
 */
class AuthService {
    static currentUser = null;

    static initializeUsers() {
        // Forcer la réinitialisation pour corriger les données corrompues
        console.log('🔄 Forçage de la réinitialisation des utilisateurs');
        StorageService.save(STORAGE_KEYS.USERS, DEFAULT_USERS);
        console.log('✅ Utilisateurs réinitialisés:', DEFAULT_USERS);
    }

    static login(username, password) {
        const users = StorageService.get(STORAGE_KEYS.USERS) || [];
        console.log('🔍 Recherche utilisateur:', { username, password });
        console.log('👥 Liste des utilisateurs:', users);
        
        const user = users.find(u => {
            console.log('🔎 Comparaison:', { 
                stored: { username: u.username, password: u.password },
                input: { username, password },
                match: u.username === username && u.password === password
            });
            return u.username === username && u.password === password;
        });
        
        console.log('✅ Utilisateur trouvé:', user);
        
        if (user) {
            this.currentUser = {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            };
            StorageService.save(STORAGE_KEYS.CURRENT_USER, this.currentUser);
            return this.currentUser;
        }
        return null;
    }

    static logout() {
        this.currentUser = null;
        StorageService.remove(STORAGE_KEYS.CURRENT_USER);
    }

    static isAuthenticated() {
        if (!this.currentUser) {
            this.currentUser = StorageService.get(STORAGE_KEYS.CURRENT_USER);
        }
        return this.currentUser !== null;
    }

    static getCurrentUser() {
        return this.currentUser || StorageService.get(STORAGE_KEYS.CURRENT_USER);
    }

    static isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === USER_ROLES.ADMIN;
    }
}

// Initialiser les utilisateurs au chargement
document.addEventListener('DOMContentLoaded', () => {
    AuthService.initializeUsers();
});