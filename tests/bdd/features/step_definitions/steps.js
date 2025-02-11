
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import fetch from 'node-fetch';

// Scénario : Inscription avec des informations valides
Given('L\'utilisateur est sur la page d\'inscription', async function () {
    
    this.page = 'register';
});

When('L\'utilisateur saisit un nom {string}, un email {string} et un mot de passe {string}', async function (name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
});

When('L\'utilisateur soumet le formulaire d\'inscription', async function () {
    // Envoie la requête POST pour soumettre l'inscription
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
        }),
    });

    // Sauvegarde la réponse et le statut HTTP pour les assertions
    this.response = await response.json();
    this.status = response.status;
});

Then('L\'utilisateur doit voir un message {string}', function (expectedMessage) {
    
    assert.equal(this.response.message, expectedMessage);
});

Then('Le statut de la réponse doit être {int}', function (expectedStatus) {
    
    assert.equal(this.status, expectedStatus);
});

// Scénario : Inscription avec un email invalide
When('L\'utilisateur saisit un email invalide {string}', async function (email) {
    this.email = email; 
});

// Scénario : Inscription avec un mot de passe trop court
When('L\'utilisateur saisit un mot de passe trop court {string}', async function (password) {
    this.password = password; 
});


// Scénario : Connexion avec des informations valides
Given('l\'utilisateur est sur la page de connexion', async function () {
    
    this.page = 'login';
});



When('l\'utilisateur soumet le formulaire de connexion', async function () {
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: this.email,
            password: this.password,
        }),
    });

    
    this.response = await response.json();
    this.status = response.status;
});

Then('l\'utilisateur doit voir le message {string}', function (expectedMessage) {
    // Vérifie que le message de réponse correspond au message attendu
    assert.equal(this.response.message, expectedMessage);
});



// Scénario : Connexion avec un email incorrect
When('L\'utilisateur saisit un email {string} et un mot de passe {string}', async function (email, password) {
    this.email = email;
    this.password = password;
});



Then('je devrais voir un message {string}', function (expectedMessage) {
    // Vérifie que le message d'erreur correspond au message attendu
    assert.equal(this.response.message, expectedMessage);
});

// scénario: connexion avec un mot de passe incorrect


// scénario: taches
Given('L\'utilisateur est connecté', async function() {
    this.currentUser = { email: 'boris@gmail.com', name: 'boris' };
});

When('L\'utilisateur ajoute une tâche {string}', async function(task) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: this.currentUser.email,
            task: task
        })
    });

    this.response = await response.json();
});

Then('La tâche {string} doit apparaître dans la liste des tâches', async function(task) {
    const response = await fetch(`http://localhost:3000/tasks?email=${this.currentUser.email}`);
    const tasks = await response.json();

    assert.ok(tasks.some(t => t.task === task));
});


// Scénario : Un utilisateur ne peut pas ajouter de tâche s'il n'est pas connecté

Given('l\'utilisateur n\'est pas connecté', function () {
    this.currentUser = null; 
});

When('l\'utilisateur essaie d\'ajouter une tâche {string}', async function (task) {
    
    this.response = { message: "Connectez-vous !" };
});

Then('l\'utilisateur doit voir un message {string}', function (expectedMessage) {
    assert.equal(this.response.message, expectedMessage); 
});


// Scénario : Un utilisateur peut modifier une tâche avec succès


Given('l\'utilisateur est connecté avec l\'email {string} et le mot de passe {string}', async function (email, password) {
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    this.currentUser = await response.json(); // Sauvegarder l'utilisateur connecté
});

Given('l\'utilisateur a une tâche {string}', async function (task) {
    // Ajouter une tâche pour l'utilisateur connecté
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.currentUser.email, task }),
    });
});

When('l\'utilisateur modifie la tâche {string} en {string}', async function (oldTask, newTask) {
    // Récupérer l'ID de la tâche à modifier
    const tasksResponse = await fetch(`http://localhost:3000/tasks?email=${this.currentUser.email}`);
    const tasks = await tasksResponse.json();
    const taskToUpdate = tasks.find(t => t.task === oldTask);

    // Modifier la tâche
    const response = await fetch(`http://localhost:3000/tasks/${taskToUpdate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
    });

    this.response = await response.json(); // Sauvegarder la réponse
});

Then('la tâche {string} doit apparaître dans la liste des tâches', async function (task) {
    // Vérifier que la tâche modifiée est dans la liste
    const tasksResponse = await fetch(`http://localhost:3000/tasks?email=${this.currentUser.email}`);
    const tasks = await tasksResponse.json();
    assert.ok(tasks.some(t => t.task === task), `La tâche "${task}" n'est pas dans la liste.`);
});


// Scénario : Un utilisateur peut supprimer une tâche avec succès


When('l\'utilisateur supprime la tâche {string}', async function (task) {
    // Récupérer l'ID de la tâche à supprimer
    const tasksResponse = await fetch(`http://localhost:3000/tasks?email=${this.currentUser.email}`);
    const tasks = await tasksResponse.json();
    const taskToDelete = tasks.find(t => t.task === task);

    // Supprimer la tâche
    const response = await fetch(`http://localhost:3000/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
    });

    this.response = await response.json(); // Sauvegarder la réponse
});

Then('la tâche {string} ne doit plus apparaître dans la liste des tâches', async function (task) {
    // Vérifier que la tâche supprimée n'est plus dans la liste
    const tasksResponse = await fetch(`http://localhost:3000/tasks?email=${this.currentUser.email}`);
    const tasks = await tasksResponse.json();
    assert.ok(!tasks.some(t => t.task === task), `La tâche "${task}" est toujours dans la liste.`);
});