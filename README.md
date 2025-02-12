# Developpement de suites de tests

## Fonctionnalité de l'application
Une application qui permet d'authentifier des utilisateurs, la gestion des tâches, et utilise un fichier JSON. Les utilisateurs peuvent s'inscrire et se connecter, ajouter, modifier, verifier et supprimer des tâches. 

### Backend
o Implémentez les routes API . 
o Stockez les données utilisateur et les tâches dans chacun de leur fichier JSON respectif

### Frontend
o Nous avons utilisé une page HTML et des modals pour les inscriptions et connexion


## Type de test demandé

### Test unitaires avec Jest
Nous avons rédigés un fichier contenant dix(10) tests.

Au niveau de la validation d'email :

1.Test pour format d'email valide : (test@exemple.com) et (user.name@domaine.com)
2.Test de format d'e-mail invalide : (test@.com)(test@com)(test@domaine)
3.Test de longueur de mot de passe valide
4.Test de longueur de mot de passe invalide
5.Test d'e-mail déjà utilisé 


Au niveau des taches :

1.Test d'ajout de tâche avec validation du titre 
2.Test d'ajout de tâche sans titre de tache
3.Test de suppression de tâche par l'utilisateur 
4.Test de suppression de tâche par un autre utilisateur
5.Test de consultation des tâches de l'utilisateur 





### Test BDD avec Cucumber
Pour la realisation des test BDD
nous avons creer un fichier .features pour les scénario.

et un fichier step.js pour les etapes .

ensuite on execute avec npm run test-cucumber




### Test E2E avec playwright

Nous avons fait un redirection en ecrivant : npx playwright codegen http://localhost:3000 --output=tests/e2e/addTask.test.js   et npx playwright codegen http://localhost:3000 --output=tests/e2e/deleteTasks.test.js

Cela a ouvert un deuxieme navigateur. Nous avons effectué les taches dessus qui ont été redirigé vers les dossiers associé à chaque test.


Pour faire valider les tests :

npx playwright test tests/e2e/addTasks.test.js et
npx playwright test tests/e2e/deleteTasks.test.js.






## CI/CD avec GitHub Actions 
Pour implémenter les pipelines CI/CD sur github, nous avons creer deux workFlows(.github/worflows). par la suite on effectue des push sur github

### Test unitaires et BDD
.github/worflows/unit-bdd-tests.yml

### Test E2E
.github/worflows/unit-E2E-tests.yml



