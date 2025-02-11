// test pour voir si chaque utilisateur peut effacer ses taches




const { deleteTask } = require('../../services/taskService');

describe("Suppression sécurisée des tâches", () => {

    let tasks = [];

    beforeEach(() => {
        tasks = [
            { id: 1, userEmail: "user@example.com", title: "Acheter du lait" },
            { id: 2, userEmail: "user@example.com", title: "Aller à la gym" },
            { id: 3, userEmail: "other@example.com", title: "Faire du sport" }
        ];
    });

    test("Supprimer une tâche appartenant à l'utilisateur", () => {
        const updatedTasks = deleteTask(tasks, 1, "user@example.com");
        expect(updatedTasks).toHaveLength(2);
        expect(updatedTasks.find(t => t.id === 1)).toBeUndefined();
    });

    test("Ne pas supprimer une tâche appartenant à un autre utilisateur", () => {
        expect(() => deleteTask(tasks, 3, "user@example.com")).toThrow("Vous ne pouvez pas supprimer cette tâche !");
    });

});
