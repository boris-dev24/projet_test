Feature: Inscription utilisateur

  Feature: Inscription utilisateur

  Scenario: Un utilisateur s'inscrit avec des informations valides
    Given L'utilisateur est sur la page d'inscription
    When L'utilisateur saisit un nom "User", un email "user@gmail.com" et un mot de passe "userconnect123"
    And L'utilisateur soumet le formulaire d'inscription
    Then L'utilisateur doit voir un message "Inscription réussie !"
    And Le statut de la réponse doit être 201

  Scenario: Un utilisateur ne peut pas s'inscrire avec un email invalide
    Given L'utilisateur est sur la page d'inscription
    When L'utilisateur saisit un nom "Test User", un email "invalid-email" et un mot de passe "password123"
    And L'utilisateur soumet le formulaire d'inscription
    Then L'utilisateur doit voir un message "Format d'email non invalide !"
    And Le statut de la réponse doit être 400

  Scenario: Un utilisateur ne peut pas s'inscrire avec un mot de passe trop court
    Given L'utilisateur est sur la page d'inscription
    When L'utilisateur saisit un nom "Test User", un email "test@example.com" et un mot de passe "123"
    And L'utilisateur soumet le formulaire d'inscription
    Then L'utilisateur doit voir un message "Votre mot de passe doit avoir 8 caractères"
    And Le statut de la réponse doit être 400