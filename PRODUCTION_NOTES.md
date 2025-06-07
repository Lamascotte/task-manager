# Notes de production

## Avertissement Tailwind CDN

L'avertissement "cdn.tailwindcss.com should not be used in production" est normal et attendu.

**Décision** : Garder le CDN pour ce POC car :
- ✅ Simplicité de déploiement (pas de build process)
- ✅ Performance acceptable pour un POC
- ✅ Évite la complexité de PostCSS/Webpack

**Pour une vraie production** : Migrer vers Tailwind CLI ou PostCSS.

## Structure du projet

Ce projet est une SPA (Single Page Application) vanilla JavaScript :
- Pas de bundler (Webpack, Vite, etc.)
- Pas de transpilation
- Chargement direct des modules

C'est un choix délibéré pour la simplicité du POC.