#!/bin/bash
# Script pour créer une branche render-deploy

# Créer et basculer sur la nouvelle branche
git checkout -b render-deploy

# Pousser la branche sur GitHub
git push -u origin render-deploy

# Revenir sur main
git checkout main

echo "✅ Branche render-deploy créée et poussée !"
echo "Vous pouvez maintenant la sélectionner dans Render"