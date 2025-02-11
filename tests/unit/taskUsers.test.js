// La validation des taches. Ajout et suppression



const { addTask, editTask, deleteTask } = require('../../services/taskService');

describe("Opérations sur les tâches", () => {

    let tasks = [];

    beforeEach(() => {
        tasks = [
            { id: 1, userEmail: "user@example.com", title: "Faire des devoirs" },
            { id: 2, userEmail: "user@example.com", title: "Sortir le chien" }
        ];
    });

    test("Ajouter une tâche valide", () => {
        const newTask = addTask(tasks, "user@example.com", "Apprendre Jest");
        expect(newTask).toHaveLength(3);
        expect(newTask[2].title).toBe("Apprendre Jest");
    });

    test("Ne pas ajouter une tâche vide", () => {
        expect(() => addTask(tasks, "user@example.com", "")).toThrow("Le titre de la tâche ne peut pas être vide");
    });

    test("Modifier une tâche existante", () => {
        const updatedTasks = editTask(tasks, 1, "Acheter du pain");
        expect(updatedTasks[0].title).toBe("Acheter du pain");
    });

    test("Ne pas modifier une tâche inexistante", () => {
        expect(() => editTask(tasks, 99, "Nouvelle tâche")).toThrow("Tâche non trouvée");
    });

});


