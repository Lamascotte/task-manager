# Guide d'utilisation - Daily Task Logger

## 🚀 Démarrage rapide

1. **Ouvrir l'application**
   - Double-cliquez sur le fichier `index.html`
   - Ou ouvrez-le dans votre navigateur préféré

2. **Connexion**
   - Utilisez un des comptes de test disponibles
   - Cliquez sur les boutons de copie pour remplir automatiquement

## 👨‍💼 Interface Administrateur

### Accès
- **Identifiants :** admin / admin123
- **Rôle :** Gestion complète du système

### Fonctionnalités
- ✅ Créer/modifier/supprimer des clients
- ✅ Créer/modifier/supprimer des projets  
- ✅ Vue d'ensemble de toutes les données
- ✅ Gestion des relations client-projet

### Comment utiliser
1. **Ajouter un client :**
   - Cliquez sur "Ajouter" dans la section Clients
   - Remplissez le nom (obligatoire) et la description (optionnelle)
   - Sauvegardez

2. **Ajouter un projet :**
   - Cliquez sur "Ajouter" dans la section Projets
   - Sélectionnez un client existant
   - Remplissez le nom du projet et sa description
   - Sauvegardez

3. **Supprimer des éléments :**
   - Cliquez sur l'icône poubelle (🗑️)
   - Confirmez la suppression
   - ⚠️ Supprimer un client supprime aussi ses projets

## 👤 Interface Utilisateur

### Accès
- **Identifiants :** user / user123  
- **Rôle :** Enregistrement de tâches

### Fonctionnalités
- ✅ Enregistrer des tâches quotidiennes
- ✅ Association obligatoire client/projet
- ✅ Filtrage par période (tout/aujourd'hui/semaine)
- ✅ Statistiques personnelles
- ✅ Vue chronologique des tâches

### Comment utiliser
1. **Enregistrer une tâche :**
   - Remplissez le titre de la tâche
   - Décrivez ce que vous avez accompli
   - Sélectionnez un client puis un projet
   - Choisissez la date (par défaut : aujourd'hui)
   - Cliquez sur "Ajouter la tâche"

2. **Filtrer les tâches :**
   - **Toutes :** Affiche toutes vos tâches
   - **Aujourd'hui :** Tâches du jour seulement
   - **Cette semaine :** Tâches de la semaine courante

3. **Supprimer une tâche :**
   - Cliquez sur le ❌ en haut à droite de la tâche
   - Confirmez la suppression

## 📊 Statistiques

L'application affiche en temps réel :
- **Tâches totales :** Nombre total de tâches enregistrées
- **Aujourd'hui :** Tâches du jour
- **Cette semaine :** Tâches de la semaine
- **Clients :** Nombre de clients uniques dans vos tâches

## 📱 Responsive Design

- ✅ **Mobile-first :** Interface optimisée pour smartphone
- ✅ **Tablette :** Adaptation automatique pour tablettes  
- ✅ **Desktop :** Mise en page en colonnes pour grand écran
- ✅ **Navigation :** Menu utilisateur accessible partout

## 🔒 Sécurité

- ✅ **Authentification :** Connexion obligatoire
- ✅ **Sessions :** Maintien de la session utilisateur
- ✅ **Validation :** Contrôles de saisie côté client
- ✅ **Échappement :** Protection contre les injections XSS

## 💾 Données

- **Stockage :** LocalStorage du navigateur
- **Persistance :** Données conservées entre les sessions
- **Reset :** Effacer les données depuis les outils développeur
- **Test :** Données d'exemple incluses automatiquement

## 🔧 Dépannage

### L'application ne s'affiche pas
- Vérifiez que JavaScript est activé
- Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Ouvrez la console développeur (F12) pour voir les erreurs

### Données perdues
- Les données sont stockées localement dans votre navigateur
- Elles persistent sauf si vous videz le cache/cookies
- En cas de problème, rechargez la page

### Problèmes de connexion
- Utilisez exactement les identifiants fournis
- Respectez la casse (majuscules/minuscules)
- Rechargez la page si nécessaire

## 🚧 Limitations actuelles

- Pas de sauvegarde cloud
- Pas d'export des données
- Un seul utilisateur par navigateur
- Données limitées au navigateur local

Pour toute question ou problème, consultez le code source documenté ou contactez l'équipe de développement.