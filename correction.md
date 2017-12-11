# PROJET INF4375

## DESCRIPTION DU PROJET
  Le projet consiste à récupérer un ensemble de données provenant de la ville de Montréal et d'offrir desservices à partir de ces données. Il s'agit de données ouvertes à propos d'installations pour faire desactivités sportives.

## Auteur
  Nom: Joy-Rey Babagbeto
  Code Permanent: BABJ21119609

## Lancer le projet

  Pour lancer le projet, une fois que le fichier est extrait,s'assurer que le serveur est lancé. Ouvrir un terminal, se rendre dans le dossier du projet, faire la commande "npm install" pour installer les dépendances puis lancer le projet avec "npm start". Le projet est maintenant lancer et vous pouvez accéeder à l'interface graphique en allant sur http://localhost:3000/ dans votre fureteur.

## Remarque

  J'ai rencontrer des problèmes à un moment donner avec mon javascript dans le fureteur chrome. Lorsque j'ai exposé mon problème au professeur il m'as suggérer de changer de fureteur et d'utiliser firefox, ce que j'ai fait et cela a très bien fonctionner. Donc si l'application ne fonctionne pas dans chrome veuillez utiliser firefox. Merci .

# Pour tester les points développés

## A1 15xp
  1. Aller à la ligne de commande, lancer le projet comme décris plus haut.
  2. Ouvrir ensuite un autre terminal et lancer mongodb, se connecter à la bd "activites".
  3. Il existera 3 collections: "glissades", "patinoires", "piscines", chacune contenant une de données en format json.

##A2 5xp
  L'importation des données de fait tous les jours à minuit comme indiquer dans l'énoncé mais si vous voulez faire l'importation à une autre fréquence vous le pouvez.
  1. Ouvrir le fichier index.js situé dans le répertoire routes.
  2. Modifier le  premier paramètre(la fréquence) dans l'appel cron.schedule.
  3. Sauvegarder le fichier.
  4. Lancer le programme et attendre la mise à jour des données.

##A3 5xp
  Pour l'écoute des requêtes http sur le port 3000:
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/

  Pour la documentation:
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/doc

##A4 10xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse "http://localhost:3000/installations?arrondissement=" puis rajouter un paramètre (le nom d'un arrondissement).
  Exemple: "http://localhost:3000/installations?arrondissement=LaSalle"
  3. Vous obtiendrez en format JSON les données concernant toutes les installations étant dans l'arrondissement spécifié (LaSalle dans le cas de notre exemple).

##A5 10xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/
  3. Taper un nom d'arrondissement dans le champ texte réserver à cet effet puis cliquer sur le bouton Envoyer
  Exemple: Le Sud-Ouest
  4. Vous obtiendrez un tableau avec les noms des installations situés dans cet arrondissement.
  5. Si un nom d'arrondissement invalide est entrer vous obtiendrez un tableau vide avec juste l'en-tête de ce dernier

##A6 10xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/
  3. Choisir dans la liste déroulante affichée, le nom de l'installation dont on veut connaître les informations puis cliquer sur Rechercher
  4. Vous obtiendrez les informations connues de cette installation

##C1 10xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/installations/mauvaiseCondition
  3. Vous obtiendrez une liste des installations en mauvaise condition.

##C2 10xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/installations/mauvaiseCondition/xml
  3. Vous obtiendrez une liste en format xml des installations en mauvaise condition.

##C3 5xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Se rendre dans le fureteur puis indiquer l'adresse http://localhost:3000/installations/mauvaiseCondition/csv
  3. Vous obtiendrez une liste en format csv des installations en mauvaise condition.

##D1 15xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Aller dans Postman (Téléchargez le logiciel si vous ne l'avez pas puis l'ouvrir)
  3. Sélectionner PATCH et mettre l'url: http://localhost:3000/installations/modifier
  4. Aller dans mongodb, copier le id d'une glissade dans la collection glissades.
  5. Envoyer dans postman un fichier json avec la modification voulue.
  Exemple:
  {
    "id": "coller l'id qui avait été copier",
    "nom_arr": "Champlain"
  }
  6. Si le fichier envoyer est bien formé la modification sera faite et vous verrez un message de succès

##D2 5xp
  1. Lancer le projet en ligne de commande si ce n'est pas encore fait.
  2. Aller dans Postman (Téléchargez le logiciel si vous ne l'avez pas puis l'ouvrir)
  3. Sélectionner DELETE et mettre l'url: http://localhost:3000/installations/supprimer
  4. Aller dans mongodb, copier le id d'une glissade dans la collection glissades.
  5. Envoyer dans postman un fichier json avec l'id copié.
  Exemple:
  {
    "id": "coller l'id qui avait été copier"
  }
  6. Si le fichier envoyer est bien formé la suppression sera faite et vous verrez un message de succès