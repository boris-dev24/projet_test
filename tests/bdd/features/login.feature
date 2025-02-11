Feature: Scénarios de connexion

  Scenario: L'utilisateur peut se connecter avec des informations valides
    Given l'utilisateur est sur la page de connexion
    When L'utilisateur saisit un nom "boris", un email "boris@gmail.com" et un mot de passe "boris@gmail.com"
    And l'utilisateur soumet le formulaire de connexion
    Then l'utilisateur doit voir le message "Connexion réussie !"

  Scenario: L'utilisateur ne peut pas se connecter avec un email incorrect
    Given l'utilisateur est sur la page de connexion
    When  L'utilisateur saisit un email "fake@exemple.com" et un mot de passe "password123"
    And l'utilisateur soumet le formulaire de connexion
    Then je devrais voir un message "Email ou mot de passe incorrect !"

  Scenario: L'utilisateur ne peut pas se connecter avec un mot de passe incorrect
    Given l'utilisateur est sur la page de connexion
    When  L'utilisateur saisit un email "boris@gmail.com" et un mot de passe "password123"
    And l'utilisateur soumet le formulaire de connexion
    Then je devrais voir un message "Email ou mot de passe incorrect !"