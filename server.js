// const express = require('express');
// const fs = require('fs');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express';
import * as fs from 'fs';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const USERS_FILE = './data/users.json';
const TASKS_FILE = './data/tasks.json';

const readJSON = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8') || '[]');
    } catch (error) {
        console.error(`Erreur de lecture du fichier ${file}:`, error);
        return [];
    }
};

const writeJSON = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Erreur d'écriture du fichier ${file}:`, error);
    }
};

// Inscription d'un user
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    let users = readJSON(USERS_FILE);

    // Format de email
    // https://uibakery.io/regex-library/email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Format d'email non invalide !" });
    }

    // Verification de longueur du mot de passe
    if (password.length < 8) {
        return res.status(400).json({ message: "Votre mot de passe doit avoir 8 caractères" });
    }

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "Email deja lié à un compte !" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    writeJSON(USERS_FILE, users);
    res.status(201).json({ message: "Inscription réussie !" });
});


// Connexion d'un user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let users = readJSON(USERS_FILE);

    const user = users.find(user => user.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
    }

    res.status(200).json({ message: "Connexion réussie !", name: user.name, email: user.email });
});

// Ajout de tache
app.post('/tasks', (req, res) => {
    const { email, task } = req.body;
    let tasks = readJSON(TASKS_FILE);

    const newTask = { id: Date.now(), email, task };
    tasks.push(newTask);
    
    writeJSON(TASKS_FILE, tasks);
    res.status(201).json({ message: "Tâche ajoutée !" });
});

// Recuperation de tache quand on log in
app.get('/tasks', (req, res) => {
    const { email } = req.query;
    let tasks = readJSON(TASKS_FILE);

    res.json(tasks.filter(task => task.email === email));
});

// Modification de tache (mais il y a un probleme)
app.put('/tasks/:id', (req, res) => {
    let tasks = readJSON(TASKS_FILE);
    const taskId = parseInt(req.params.id);
    const { task } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tâche non trouvée !" });
    }

    tasks[taskIndex].task = task; // Update de la tache modifier
    writeJSON(TASKS_FILE, tasks); // Sauvegarde de la tache dans le json

    res.json({ message: "Tâche mise à jour !" });
});

// Effacer une tache
app.delete('/tasks/:id', (req, res) => {
    let tasks = readJSON(TASKS_FILE);
    const taskId = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== taskId);
    writeJSON(TASKS_FILE, tasks);

    res.json({ message: "Tâche supprimée !" });
});

// lancement du serveur
app.listen(PORT, () => console.log(` Serveur lancé sur http://localhost:${PORT}`));
