/**
 * Version alternative compacte des StatsCards
 */
class StatsCardsCompact {
    
    static render() {
        return `
            <div class="container mx-auto px-4 py-3">
                <!-- Version ultra-compacte mobile -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <div class="stat-card-compact rounded-lg shadow-sm p-2 md:p-4 bg-white border border-gray-100">
                        <div class="flex items-center md:flex-col md:items-start">
                            <div class="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 md:mr-0 md:mb-2">
                                <i class="fas fa-tasks text-white text-xs md:text-sm"></i>
                            </div>
                            <div class="flex-1 md:w-full">
                                <div id="taskCount" class="text-base md:text-2xl font-bold text-gray-800">0</div>
                                <div class="text-xs md:text-sm text-gray-500">Total</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card-compact rounded-lg shadow-sm p-2 md:p-4 bg-white border border-gray-100">
                        <div class="flex items-center md:flex-col md:items-start">
                            <div class="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center mr-2 md:mr-0 md:mb-2">
                                <i class="fas fa-calendar-day text-white text-xs md:text-sm"></i>
                            </div>
                            <div class="flex-1 md:w-full">
                                <div id="todaysTasks" class="text-base md:text-2xl font-bold text-gray-800">0</div>
                                <div class="text-xs md:text-sm text-gray-500">Aujourd'hui</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card-compact rounded-lg shadow-sm p-2 md:p-4 bg-white border border-gray-100">
                        <div class="flex items-center md:flex-col md:items-start">
                            <div class="w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2 md:mr-0 md:mb-2">
                                <i class="fas fa-calendar-week text-white text-xs md:text-sm"></i>
                            </div>
                            <div class="flex-1 md:w-full">
                                <div id="thisWeek" class="text-base md:text-2xl font-bold text-gray-800">0</div>
                                <div class="text-xs md:text-sm text-gray-500">Semaine</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card-compact rounded-lg shadow-sm p-2 md:p-4 bg-white border border-gray-100">
                        <div class="flex items-center md:flex-col md:items-start">
                            <div class="w-6 h-6 md:w-8 md:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 md:mr-0 md:mb-2">
                                <i class="fas fa-building text-white text-xs md:text-sm"></i>
                            </div>
                            <div class="flex-1 md:w-full">
                                <div id="clientCount" class="text-base md:text-2xl font-bold text-gray-800">0</div>
                                <div class="text-xs md:text-sm text-gray-500">Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static update(stats) {
        document.getElementById('taskCount').textContent = stats.total;
        document.getElementById('todaysTasks').textContent = stats.today;
        document.getElementById('thisWeek').textContent = stats.thisWeek;
        document.getElementById('clientCount').textContent = stats.clients;
    }
}