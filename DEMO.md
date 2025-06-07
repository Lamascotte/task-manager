# Daily Task Logger - Démonstration

## 🏗️ Architecture du projet

L'application suit une architecture modulaire respectant les principes du clean code :

```
📁 task-manager/
├── 📄 index.html              # Point d'entrée
├── 📄 README.md               # Documentation principale  
├── 📄 GUIDE.md                # Guide d'utilisation
├── 📁 css/
│   └── 📄 styles.css          # Styles personnalisés
├── 📁 js/
│   ├── 📄 app.js              # Application principale
│   ├── 📁 utils/              # Utilitaires réutilisables
│   │   ├── 📄 constants.js    # Constantes globales
│   │   ├── 📄 helpers.js      # Fonctions utilitaires  
│   │   ├── 📄 config.js       # Configuration
│   │   └── 📄 testData.js     # Données de démonstration
│   ├── 📁 services/           # Logique métier
│   │   ├── 📄 authService.js  # Authentification
│   │   ├── 📄 storageService.js # Stockage
│   │   ├── 📄 clientService.js  # Gestion clients
│   │   ├── 📄 projectService.js # Gestion projets
│   │   └── 📄 taskService.js    # Gestion tâches
│   └── 📁 components/         # Composants UI
│       ├── 📄 header.js       # En-tête
│       ├── 📄 navigation.js   # Navigation mobile
│       ├── 📄 statsCards.js   # Cartes statistiques
│       ├── 📄 taskForm.js     # Formulaire tâches
│       ├── 📄 taskList.js     # Liste des tâches
│       └── 📄 adminPanel.js   # Panel administrateur
```

## 🎨 Design System

### Couleurs
- **Primaire :** #3b82f6 (Bleu)
- **Secondaire :** #60a5fa (Bleu clair)
- **Accent :** #1d4ed8 (Bleu foncé)
- **Succès :** #10b981 (Vert)
- **Erreur :** #ef4444 (Rouge)
- **Avertissement :** #f59e0b (Orange)

### Typographie
- **Police :** Inter, système par défaut
- **Tailles :** text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px)
- **Poids :** font-medium (500), font-bold (700)

### Spacing
- **Padding :** p-2 (8px), p-4 (16px), p-6 (24px)
- **Margin :** m-2 (8px), m-4 (16px), m-6 (24px)  
- **Gap :** gap-4 (16px), gap-6 (24px)

## 🚀 Fonctionnalités implementées

### ✅ Authentification
- [x] Page de connexion responsive
- [x] Validation des identifiants
- [x] Session persistante
- [x] Gestion des rôles (Admin/User)
- [x] Déconnexion sécurisée

### ✅ Interface Administrateur
- [x] Gestion CRUD des clients
- [x] Gestion CRUD des projets  
- [x] Validation des données
- [x] Relations client-projet
- [x] Suppression en cascade

### ✅ Interface Utilisateur
- [x] Formulaire de saisie des tâches
- [x] Sélection client/projet obligatoire
- [x] Filtrage par période
- [x] Affichage chronologique
- [x] Statistiques en temps réel