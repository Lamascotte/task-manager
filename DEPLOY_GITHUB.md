# 🚀 Guide de déploiement GitHub Pages

## 📋 Étapes complètes pour déployer votre Daily Task Logger

### 1️⃣ Installer Git (si pas déjà fait)

1. **Télécharger Git** : https://git-scm.com/download/win
2. **Installer** avec les options par défaut
3. **Vérifier l'installation** :
   ```bash
   git --version
   ```

### 2️⃣ Configurer Git

Ouvrez Git Bash ou PowerShell et configurez votre identité :

```bash
git config --global user.name "Lamascotte"
git config --global user.email "sandouvivien@gmail.com"
```

### 3️⃣ Initialiser le repository local

Dans le dossier de votre projet :

```bash
cd C:\Users\USER\Documents\dev\task-manager

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Daily Task Logger v2.0"
```

### 4️⃣ Créer le repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Connectez-vous à votre compte
3. Cliquez sur le **+** en haut à droite → **New repository**
4. Configurez :
   - **Repository name** : `task-manager`
   - **Description** : "Application moderne de gestion des tâches avec dashboard admin intelligent"
   - **Public** (pour GitHub Pages gratuit)
   - ❌ **NE PAS** initialiser avec README (vous l'avez déjà)
5. Cliquez sur **Create repository**

### 5️⃣ Connecter et pousser votre code

GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Ajouter l'origine distante (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/task-manager.git

# Pousser le code
git branch -M main
git push -u origin main
```

### 6️⃣ Activer GitHub Pages

1. Sur votre repository GitHub, allez dans **Settings** (⚙️)
2. Descendez jusqu'à **Pages** dans le menu de gauche
3. Dans **Source**, sélectionnez :
   - **Deploy from a branch**
   - Branch : **main**
   - Folder : **/ (root)**
4. Cliquez sur **Save**

### 7️⃣ Attendre le déploiement

- GitHub va déployer votre site (2-5 minutes)
- L'URL sera : `https://VOTRE-USERNAME.github.io/task-manager`
- Un badge vert ✅ apparaîtra quand c'est prêt

### 8️⃣ Mettre à jour le README

Modifiez la ligne 10 du README.md :
```markdown
### 🚀 [Voir la démo en direct](https://VOTRE-USERNAME.github.io/task-manager)
```

Puis :
```bash
git add README.md
git commit -m "Update demo URL"
git push
```

## 🎉 C'est fait !

Votre application est maintenant en ligne et accessible à tous !

### 🔄 Pour les futures mises à jour

```bash
# Faire vos modifications
# Puis :
git add .
git commit -m "Description des changements"
git push
```

GitHub Pages se mettra à jour automatiquement !

## 🆘 Problèmes courants

### "Permission denied (publickey)"
→ Utilisez HTTPS au lieu de SSH :
```bash
git remote set-url origin https://github.com/VOTRE-USERNAME/task-manager.git
```

### Page 404 sur GitHub Pages
→ Attendez 5-10 minutes, le déploiement peut prendre du temps

### Changements non visibles
→ Videz le cache de votre navigateur (Ctrl+F5)

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez la section **Actions** de votre repo pour les erreurs
2. Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)

Bonne chance avec votre déploiement ! 🚀