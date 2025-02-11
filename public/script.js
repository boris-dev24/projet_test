let currentUser = null;

// Mes modals! ouverture et fermeture
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// 🚀 INSCRIPTION UTILISATEUR
async function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Vérification du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Format d'email invalide !");
        return;
    }

    // Vérification longueur du mot de passe
    if (password.length < 8) {
        alert("Le mot de passe doit avoir minimum 8 caractères !");
        return;
    }

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Merci pour votre inscription !");
        closeModal('registerModal');
    } else {
        alert(data.message || "Erreur! Veuillez réessayer.");
    }
}

// 🚀 CONNEXION UTILISATEUR
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        currentUser = { name: data.name, email: data.email };
        document.getElementById('userName').innerText = currentUser.name;
        document.getElementById('home').style.display = "none";
        document.getElementById('app').style.display = "block";
        loadTasks();
        closeModal('loginModal');
    } else {
        alert(data.message);
    }
}

// 🚀 AJOUT DE TÂCHE
async function addTask() {
    if (!currentUser) return alert("Connectez-vous!");

    const task = document.getElementById('task').value.trim();
    if (!task) return alert("Le champ ne peut pas être vide !");

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email, task })
    });

    document.getElementById('task').value = ""; // Effacer l'input après ajout
    loadTasks();
}

// 🚀 MODIFIER UNE TÂCHE
async function editTask(id) {
    const taskElement = document.getElementById(`task-${id}`);
    const currentText = taskElement.innerText;

    // Vérifier s'il y a déjà une modification en cours
    if (document.getElementById(`edit-${id}`)) return;

    // Remplacer le texte par un champ input
    taskElement.innerHTML = `
        <input type="text" id="edit-${id}" value="${currentText}" class="edit-input">
        <button onclick="saveTask(${id})" class="save">Sauvegarder</button>
        <button onclick="cancelEdit(${id}, '${currentText}')" class="cancel">Annuler</button>
    `;
}

// 🚀 ANNULER UNE MODIFICATION
function cancelEdit(id, originalText) {
    document.getElementById(`task-${id}`).innerHTML = originalText;
}

// 🚀 SAUVEGARDER UNE MODIFICATION
async function saveTask(id) {
    const newTask = document.getElementById(`edit-${id}`).value.trim();
    if (!newTask) return alert("Le champ ne peut pas être vide !");

    const res = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask })
    });

    if (res.ok) {
        loadTasks(); // Recharger la liste après modification
    } else {
        alert("Erreur lors de la modification !");
    }
}

// 🚀 CHARGER LES TÂCHES DE L'UTILISATEUR
async function loadTasks() {
    if (!currentUser) return;

    const res = await fetch(`/tasks?email=${currentUser.email}`);
    const tasks = await res.json();

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    tasks.forEach(t => {
        taskList.innerHTML += `
            <li>
                <span id="task-${t.id}">${t.task}</span>
                <button class="edit" onclick="editTask(${t.id})">Modifier</button>
                <button class="delete" onclick="deleteTask(${t.id})">Effacer</button>
            </li>`;
    });
}

// 🚀 SUPPRIMER UNE TÂCHE
async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

// 🚀 DÉCONNEXION
function logout() {
    currentUser = null;
    document.getElementById('home').style.display = "block";
    document.getElementById('app').style.display = "none";
}
