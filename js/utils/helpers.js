/**
 * Fonctions utilitaires réutilisables
 */

/**
 * Formate une date en chaîne lisible
 */
function formatDate(date) {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('fr-FR', options);
}

/**
 * Calcule le nombre de jours entre deux dates
 */
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.floor(Math.abs((date1 - date2) / oneDay));
}

/**
 * Génère un ID unique
 */
function generateId() {
    return Date.now();
}

/**
 * Valide si une chaîne n'est pas vide
 */
function isValidString(str) {
    return str && str.trim().length > 0;
}

/**
 * Échappe les caractères HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Affiche une notification toast
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fadeIn ${getNotificationClasses(type)}`;    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${getNotificationIcon(type)} mr-2"></i>
            <span>${escapeHtml(message)}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), DEFAULT_CONFIG.NOTIFICATION_TIMEOUT);
}

/**
 * Retourne les classes CSS pour les notifications
 */
function getNotificationClasses(type) {
    const classes = {
        success: 'bg-green-100 border-green-300 text-green-700',
        error: 'bg-red-100 border-red-300 text-red-700',
        info: 'bg-blue-100 border-blue-300 text-blue-700',
        warning: 'bg-yellow-100 border-yellow-300 text-yellow-700'
    };
    return classes[type] || classes.info;
}

/**
 * Retourne l'icône pour les notifications
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

/**
 * Remplit automatiquement le formulaire de connexion
 */
function fillLogin(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
}

/**
 * Confirme une action avec l'utilisateur
 */
function confirmAction(message) {
    return confirm(message);
}