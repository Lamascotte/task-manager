# System Patterns - Daily Task Logger

## Overall Architecture

### Single Page Application (SPA) Pattern
- **Single HTML entry point** (`index.html`) with dynamic content loading
- **State-driven UI updates** via JavaScript DOM manipulation
- **Client-side routing** through view switching rather than page navigation
- **Progressive enhancement** from mobile to desktop layouts

### Layered Architecture
```
Presentation Layer    → Components (UI)
Business Logic Layer  → Services (domain logic)
Data Access Layer     → StorageService (localStorage abstraction)
Data Layer           → LocalStorage browser API
```

## Key Technical Decisions

### 1. Vanilla JavaScript Choice
**Rationale:** Zero external dependencies, maximum control, educational clarity
- **Benefits:** No build process, immediate deployment, full understanding
- **Constraints:** Manual DOM manipulation, no reactive framework features
- **Patterns Used:** Static class methods, functional approach for utilities

### 2. Component-Based UI Architecture
**Pattern:** Static class components with render/init/update lifecycle
```javascript
class ComponentName {
    static render() { return /* HTML string */ }
    static init() { /* Setup event listeners */ }
    static update(data) { /* Refresh with new data */ }
}
```

### 3. Service Layer Pattern
**Responsibility:** Encapsulate all business logic in dedicated service classes
- **CRUD Operations:** Standardized across all entities (Client, Project, Task, User)
- **Validation Logic:** Centralized in service methods
- **Data Transformation:** Rich objects created from storage data

### 4. Repository Pattern (Simplified)
**StorageService as Universal Repository:**
- **Abstraction:** Hide localStorage implementation details
- **Consistency:** Same interface for all data operations
- **Future-proofing:** Easy to swap localStorage for API calls

## Design Patterns in Use

### Observer Pattern (Event-Driven Updates)
- **DOM Events:** Components listen for user interactions
- **Manual Notifications:** Services trigger UI updates after data changes
- **Cascading Updates:** Stats refresh when tasks are modified

### Strategy Pattern (Filtering)
- **Filter Modes:** Different algorithms for task filtering (all/today/week)
- **Pluggable Logic:** Easy to add new filter types
- **Consistent Interface:** Same method signature across strategies

### Template Method Pattern (Component Lifecycle)
- **Standardized Flow:** render() → init() → update() sequence
- **Customizable Steps:** Each component implements its own specifics
- **Consistent Behavior:** Predictable component management

### Factory Pattern (ID Generation & Object Creation)
- **Unique IDs:** Centralized ID generation for all entities
- **Object Construction:** Consistent entity creation with default values
- **Timestamp Management:** Automatic createdAt/updatedAt handling

## Component Relationships

### Dependency Flow
```
App (Orchestrator)
├── AuthService (Session Management)
├── User Interface Components
│   ├── Header (User info + logout)
│   ├── StatsCards (Personal metrics)
│   ├── TaskForm (Task creation)
│   └── TaskList (Task display + filtering)
└── Admin Interface Components
    ├── AdminDashboard (Navigation + layout)
    ├── AdminStatsCards (Global metrics)
    └── Admin Views (Tasks/Clients/Projects management)
```

### Data Flow Patterns
1. **User Action** → Component Event Handler
2. **Component** → Service Method Call
3. **Service** → StorageService (Data Persistence)
4. **Service** → Component Update (UI Refresh)
5. **Component** → Notification (User Feedback)

## Critical Implementation Paths

### Authentication Flow
```
Login Attempt → AuthService.login() → User Validation → Session Storage → UI Role Switch
```

### Task Creation Flow
```
Form Submit → Validation → TaskService.add() → Storage → Stats Update → List Refresh → Notification
```

### Admin Data Exploration Flow
```
Filter Selection → Service Query → Data Enrichment → UI Update → Contextual Navigation Options
```

## State Management Strategy

### Client-Side State
- **Authentication State:** Current user stored in localStorage
- **UI State:** Ephemeral (current view, active filters, form data)
- **Application Data:** All entities persisted in localStorage with keys

### State Synchronization
- **Manual Updates:** Components explicitly refresh after data changes
- **Optimistic UI:** Immediate updates followed by persistence
- **Error Handling:** Rollback UI changes on operation failure

## Error Handling Patterns

### Defensive Programming
- **Input Validation:** All user inputs validated before processing
- **Type Checking:** Explicit checks for expected data types
- **Graceful Degradation:** Application continues functioning with incomplete data

### User Experience
- **Error Notifications:** Toast messages for operation feedback
- **Confirmation Dialogs:** For destructive actions
- **Loading States:** Visual feedback during operations

## Performance Considerations

### Optimization Strategies
- **Minimal DOM Manipulation:** Batch updates when possible
- **Event Delegation:** Efficient event handling for dynamic content
- **Lazy Loading:** Admin views loaded only when accessed
- **Debouncing:** Search input to prevent excessive filtering

### Memory Management
- **Static Methods:** No instance creation for stateless operations
- **Event Cleanup:** Proper listener removal (prepared for future enhancement)
- **Data Minimization:** Only store essential information

This architecture enables rapid development while maintaining code quality and extensibility for future enhancements.