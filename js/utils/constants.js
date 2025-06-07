/**
 * Constantes globales de l'application
 * Centralise toutes les valeurs fixes utilisées dans l'app
 */

// Rôles utilisateur
const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

// Clés de stockage local
const STORAGE_KEYS = {
    TASKS: 'tasks',
    CLIENTS: 'clients', 
    PROJECTS: 'projects',
    CURRENT_USER: 'currentUser',
    USERS: 'users'
};

// États de filtrage des tâches
const FILTER_MODES = {
    ALL: 'all',
    TODAY: 'today',
    WEEK: 'week'
};

// Messages d'erreur
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Nom d\'utilisateur ou mot de passe incorrect',
    REQUIRED_FIELDS: 'Veuillez remplir tous les champs obligatoires',
    CLIENT_EXISTS: 'Ce client existe déjà',
    PROJECT_EXISTS: 'Ce projet existe déjà pour ce client',
    DELETE_CONFIRM: 'Êtes-vous sûr de vouloir supprimer cet élément ?'
};

// Messages de succès
const SUCCESS_MESSAGES = {
    TASK_ADDED: 'Tâche ajoutée avec succès',
    CLIENT_ADDED: 'Client ajouté avec succès',
    PROJECT_ADDED: 'Projet ajouté avec succès',
    ITEM_DELETED: 'Élément supprimé avec succès'
};

// Configuration par défaut
const DEFAULT_CONFIG = {
    ITEMS_PER_PAGE: 10,
    ANIMATION_DURATION: 300,
    NOTIFICATION_TIMEOUT: 3000
};
// Utilisateurs par défaut (comptes de test)
const DEFAULT_USERS = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: USER_ROLES.ADMIN,
        name: 'Administrateur Système'
    },
    {
        id: 2, 
        username: 'user',
        password: 'user123',
        role: USER_ROLES.USER,
        name: 'Utilisateur Standard'
    }
];