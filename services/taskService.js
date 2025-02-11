




function addTask(tasks, userEmail, title) {
    if (!title.trim()) {
        throw new Error("Le titre de la tâche ne peut pas être vide");
    }
    const newTask = { id: tasks.length + 1, userEmail, title };
    return [...tasks, newTask];
}

function editTask(tasks, id, newTitle) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        throw new Error("Tâche non trouvée");
    }
    tasks[taskIndex].title = newTitle;
    return tasks;
}

function deleteTask(tasks, id, userEmail) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        throw new Error("Tâche non trouvée");
    }

    if (tasks[taskIndex].userEmail !== userEmail) {
        throw new Error("Vous ne pouvez pas supprimer cette tâche !");
    }

    return tasks.filter(task => task.id !== id);
}

module.exports = { addTask, editTask, deleteTask };


