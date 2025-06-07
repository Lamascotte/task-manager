/**
 * Composant Navigation (mobile)
 */
class Navigation {
    
    static render() {
        return `
            <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
                <div class="flex justify-around py-2">
                    <button class="nav-item flex flex-col items-center p-2 text-gray-600 hover:text-primary">
                        <i class="fas fa-home text-lg"></i>
                        <span class="text-xs mt-1">Accueil</span>
                    </button>
                    <button class="nav-item flex flex-col items-center p-2 text-gray-600 hover:text-primary">
                        <i class="fas fa-plus-circle text-lg"></i>
                        <span class="text-xs mt-1">Ajouter</span>
                    </button>
                    <button class="nav-item flex flex-col items-center p-2 text-gray-600 hover:text-primary">
                        <i class="fas fa-chart-bar text-lg"></i>
                        <span class="text-xs mt-1">Stats</span>
                    </button>
                    <button class="nav-item flex flex-col items-center p-2 text-gray-600 hover:text-primary">
                        <i class="fas fa-user text-lg"></i>
                        <span class="text-xs mt-1">Profil</span>
                    </button>
                </div>
            </nav>
        `;
    }

    static init() {
        // Ajouter un padding-bottom au body pour la navigation fixe
        document.body.style.paddingBottom = '80px';
    }
}