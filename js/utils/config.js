/**
 * Configuration de l'application
 */

const APP_CONFIG = {
    // Informations générales
    name: 'Daily Task Logger',
    version: '1.0.0',
    
    // Interface utilisateur
    ui: {
        animationDuration: 300,
        notificationTimeout: 3000,
        maxItemsPerPage: 10
    },
    
    // Formats de dates
    dateFormat: {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        }
    },
    
    // Validation
    validation: {
        minTaskTitleLength: 3,
        maxTaskTitleLength: 100,
        minClientNameLength: 2,
        maxClientNameLength: 50,
        minProjectNameLength: 2,
        maxProjectNameLength: 50
    },
    
    // Couleurs du thème
    colors: {
        primary: '#3b82f6',
        secondary: '#60a5fa', 
        accent: '#1d4ed8',
        dark: '#1e293b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
    },
    
    // Fonctionnalités
    features: {
        enableNotifications: true,
        enableAnimations: true,
        enableDarkMode: false,
        enableExport: false
    }
};