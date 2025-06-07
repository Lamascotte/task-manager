/**
 * Données de test pour l'application
 * Ce fichier ajoute automatiquement des clients et projets de démonstration
 */

// Fonction pour initialiser les données de test
function initializeTestData() {
    console.log('🔧 Initialisation des données de test...');
    
    // Forcer l'initialisation des utilisateurs
    const existingUsers = StorageService.get(STORAGE_KEYS.USERS);
    if (!existingUsers || existingUsers.length === 0) {
        console.log('👥 Création des utilisateurs par défaut');
        StorageService.save(STORAGE_KEYS.USERS, DEFAULT_USERS);
    }
    
    // Ne pas initialiser si des données clients existent déjà
    const existingClients = StorageService.get(STORAGE_KEYS.CLIENTS);
    if (existingClients && existingClients.length > 0) {
        console.log('✅ Données clients déjà présentes');
        return;
    }

    // Clients de test
    const testClients = [
        {
            id: 1001,
            name: "Entreprise ABC",
            description: "Société de développement logiciel",
            createdAt: new Date().toISOString()
        },
        {
            id: 1002,
            name: "StartUp Innovante",
            description: "Startup technologique spécialisée en IA",
            createdAt: new Date().toISOString()
        },
        {
            id: 1003,
            name: "Commerce Local",
            description: "Boutique en ligne de produits locaux",
            createdAt: new Date().toISOString()
        }
    ];

    // Projets de test
    const testProjects = [
        {
            id: 2001,
            name: "Site Web Corporate",
            description: "Refonte complète du site web d'entreprise",
            clientId: 1001,
            createdAt: new Date().toISOString()
        },
        {
            id: 2002,
            name: "Application Mobile",
            description: "Développement d'une app mobile iOS/Android",
            clientId: 1001,
            createdAt: new Date().toISOString()
        },
        {
            id: 2003,
            name: "Intelligence Artificielle",
            description: "Système de recommandations personnalisées",
            clientId: 1002,
            createdAt: new Date().toISOString()
        },
        {
            id: 2004,
            name: "E-commerce Platform",
            description: "Plateforme de vente en ligne moderne",
            clientId: 1003,
            createdAt: new Date().toISOString()
        }
    ];

    // Sauvegarder les données de test
    StorageService.save(STORAGE_KEYS.CLIENTS, testClients);
    StorageService.save(STORAGE_KEYS.PROJECTS, testProjects);

    console.log('✅ Données de test initialisées avec succès');
}

// Initialiser automatiquement au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Attendre que les services soient chargés
    setTimeout(initializeTestData, 100);
});