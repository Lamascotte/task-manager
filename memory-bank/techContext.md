# Tech Context - Daily Task Logger

## Technology Stack

### Core Technologies
- **HTML5:** Semantic markup with modern structure
- **CSS3:** Custom properties, Grid, Flexbox for layouts
- **JavaScript ES6+:** Classes, arrow functions, template literals, destructuring
- **Tailwind CSS:** Utility-first CSS framework via CDN
- **Font Awesome:** Icon library via CDN

### Browser APIs Used
- **LocalStorage API:** Primary data persistence
- **DOM API:** Dynamic content manipulation
- **Console API:** Debugging and development logging
- **Performance API:** Timing measurements for optimization

## Development Setup

### File Structure
```
task-manager/
├── index.html                 # Single entry point
├── css/styles.css             # Custom styles + overrides
├── js/
│   ├── app.js                 # Application orchestrator
│   ├── utils/                 # Shared utilities
│   ├── services/              # Business logic
│   └── components/            # UI components
└── memory-bank/               # Development documentation
```

### No Build Process Required
- **Direct file serving:** Open index.html in browser
- **Hot reload:** Manual refresh for changes
- **Development tools:** Browser DevTools for debugging
- **Version control:** Git-friendly with no generated files

## Technical Constraints

### Browser Compatibility
- **Target:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Features Required:** ES6 classes, template literals, localStorage
- **Responsive Support:** CSS Grid and Flexbox
- **Touch Support:** Mobile-first responsive design

### Performance Limitations
- **Data Volume:** Optimized for 100-1000 tasks
- **Memory Usage:** All data loaded in memory (localStorage limitation)
- **Network:** Zero network calls (purely client-side)
- **Storage Limits:** ~5-10MB localStorage browser quota

### Security Constraints
- **Client-Side Only:** No server-side validation possible
- **Data Exposure:** All data visible in browser DevTools
- **XSS Protection:** Manual HTML escaping required
- **Authentication:** Simulated only (no real security)

## Dependencies

### External CDN Resources
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Zero npm Dependencies
- **Rationale:** Simplicity, no build complexity, immediate deployment
- **Trade-off:** Manual implementation of common patterns
- **Benefit:** Full understanding and control of all code

## Tool Usage Patterns

### Development Tools
- **Browser DevTools:** Primary debugging environment
- **Console Logging:** Structured debugging with prefixed messages
- **Network Tab:** Verify no unintended network calls
- **Application Tab:** LocalStorage inspection and management

### Code Organization Principles
- **File per Component:** Single responsibility for each file
- **Static Methods:** No instance creation for stateless operations
- **Consistent Naming:** camelCase for variables, PascalCase for classes
- **JSDoc Comments:** Documentation for public methods

## Data Storage Strategy

### LocalStorage Implementation
```javascript
// Standardized storage interface
StorageService.save(key, data)    // JSON.stringify + localStorage.setItem
StorageService.get(key)           // localStorage.getItem + JSON.parse
StorageService.remove(key)        // localStorage.removeItem
StorageService.clear()            // localStorage.clear
```

### Data Structure Design
```javascript
// Entities with consistent structure
{
    id: number,                   // Unique identifier
    createdAt: string,            // ISO timestamp
    updatedAt?: string,           // Optional modification timestamp
    // ... entity-specific fields
}
```

### Storage Keys Convention
```javascript
const STORAGE_KEYS = {
    TASKS: 'tasks',
    CLIENTS: 'clients',
    PROJECTS: 'projects',
    USERS: 'users',
    CURRENT_USER: 'currentUser'
};
```

## Development Workflows

### Feature Development
1. **Service First:** Implement business logic in appropriate service
2. **Component Second:** Create or update UI component
3. **Integration Third:** Wire component to service in app.js
4. **Testing Fourth:** Manual testing across roles and devices

### Debugging Approach
- **Console Logging:** Strategic placement for data flow tracking
- **Breakpoint Debugging:** Browser DevTools for complex logic
- **LocalStorage Inspection:** Verify data persistence and structure
- **Responsive Testing:** DevTools device simulation

### Code Quality Checks
- **Manual Review:** Code readability and pattern consistency
- **Browser Console:** Zero JavaScript errors requirement
- **Cross-browser Testing:** Verify functionality across target browsers
- **Mobile Testing:** Real device testing for touch interactions

## Future Technical Evolution

### Backend Integration Preparation
- **Service Layer Abstraction:** Easy swap from localStorage to API calls
- **Async/Await Ready:** Methods structured for future API integration
- **Error Handling:** Patterns prepared for network failures
- **Data Validation:** Client-side logic ready for server confirmation

### Progressive Web App (PWA) Ready
- **Service Worker Structure:** Prepared for offline functionality
- **Manifest Ready:** App installation capability framework
- **Cache Strategy:** Optimized for static asset caching
- **Offline UX:** Graceful degradation patterns implemented

### Performance Optimization Paths
- **Virtual Scrolling:** For large task lists (when needed)
- **Data Pagination:** Server-driven when backend available
- **Component Lazy Loading:** Deferred admin component loading
- **Memory Optimization:** Garbage collection patterns

This technical foundation provides a solid base for current functionality while preparing pathways for future enhancements.