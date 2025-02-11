Feature: Ajout de tâche

  Scenario: Un utilisateur ajoute une nouvelle tâche
    Given L'utilisateur est connecté
    When L'utilisateur ajoute une tâche "Acheter du lait"
    Then La tâche "Acheter du lait" doit apparaître dans la liste des tâches

  Scenario: Un utilisateur ne peut pas ajouter de tâche s'il n'est pas connecté
    Given l'utilisateur n'est pas connecté
    When l'utilisateur essaie d'ajouter une tâche "Faire les courses"
    Then l'utilisateur doit voir un message "Connectez-vous !"

  Scenario: Un utilisateur peut modifier une tâche avec succès
    Given l'utilisateur est connecté avec l'email "boris@gmail.com" et le mot de passe "boris@gmail.com"
    And l'utilisateur a une tâche "Faire les courses"
    When l'utilisateur modifie la tâche "Faire les courses" en "Acheter des légumes"
    Then la tâche "Acheter des légumes" doit apparaître dans la liste des tâches

  Scenario: Un utilisateur peut supprimer une tâche avec succès
    Given l'utilisateur est connecté avec l'email "boris@gmail.com" et le mot de passe "boris@gmail.com"
    And l'utilisateur a une tâche "Faire les courses"
    When l'utilisateur supprime la tâche "Faire les courses"
    Then la tâche "Faire les courses" ne doit plus apparaître dans la liste des tâches