/**
 * Composant StatsCards pour l'admin (version globale - simplifiée)
 */
class AdminStatsCards {
    
    static render() {
        return `
            <div class="container mx-auto px-4 py-4">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                    <div class="stat-card rounded-xl shadow p-3 md:p-4 flex flex-col bg-white">
                        <div class="flex items-center mb-2">
                            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                <i class="fas fa-tasks text-blue-600 text-sm"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-500 truncate">Total tâches</div>
                                <div id="adminTaskCount" class="text-lg md:text-2xl font-bold text-gray-800">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card rounded-xl shadow p-3 md:p-4 flex flex-col bg-white">
                        <div class="flex items-center mb-2">
                            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                <i class="fas fa-calendar-day text-green-600 text-sm"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-500 truncate">Aujourd'hui</div>
                                <div id="adminTodaysTasks" class="text-lg md:text-2xl font-bold text-gray-800">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card rounded-xl shadow p-3 md:p-4 flex flex-col bg-white">
                        <div class="flex items-center mb-2">
                            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                <i class="fas fa-calendar-week text-purple-600 text-sm"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-500 truncate">Semaine</div>
                                <div id="adminThisWeek" class="text-lg md:text-2xl font-bold text-gray-800">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card rounded-xl shadow p-3 md:p-4 flex flex-col bg-white">
                        <div class="flex items-center mb-2">
                            <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                <i class="fas fa-users text-indigo-600 text-sm"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-500 truncate">Utilisateurs</div>
                                <div id="adminUserCount" class="text-lg md:text-2xl font-bold text-gray-800">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card rounded-xl shadow p-3 md:p-4 flex flex-col bg-white">
                        <div class="flex items-center mb-2">
                            <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                                <i class="fas fa-building text-orange-600 text-sm"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-500 truncate">Clients</div>
                                <div id="adminClientCount" class="text-lg md:text-2xl font-bold text-gray-800">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static update(stats) {
        document.getElementById('adminTaskCount').textContent = stats.total;
        document.getElementById('adminTodaysTasks').textContent = stats.today;
        document.getElementById('adminThisWeek').textContent = stats.thisWeek;
        document.getElementById('adminUserCount').textContent = stats.users;
        document.getElementById('adminClientCount').textContent = stats.clients;
    }
}