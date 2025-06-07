/**
 * Composant Header
 */
class Header {
    
    static render(user) {
        return `
            <header class="bg-white shadow-sm">
                <div class="container mx-auto px-4 py-5 flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="bg-primary w-10 h-10 rounded-lg flex items-center justify-center">
                            <i class="fas fa-clipboard-list text-white text-xl"></i>
                        </div>
                        <h1 class="ml-3 text-2xl font-bold text-dark">Daily Task Logger</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="hidden md:flex flex-col items-end">
                            <span class="font-medium">${escapeHtml(user.name)}</span>
                            <span class="text-gray-500 text-sm capitalize">${escapeHtml(user.role)}</span>
                        </div>
                        <div class="relative">
                            <button id="userMenuBtn" class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                                <i class="fas fa-user text-gray-600"></i>
                            </button>
                            <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                                <div class="py-2">
                                    <div class="px-4 py-2 text-sm text-gray-700 border-b">
                                        ${escapeHtml(user.name)}
                                    </div>
                                    <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                        <i class="fas fa-sign-out-alt mr-2"></i>
                                        Se déconnecter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
    static init(onLogout) {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userMenu = document.getElementById('userMenu');
        const logoutBtn = document.getElementById('logoutBtn');

        // Toggle du menu utilisateur
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });

        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', () => {
            userMenu.classList.add('hidden');
        });

        // Gestion de la déconnexion
        logoutBtn.addEventListener('click', onLogout);
    }
}