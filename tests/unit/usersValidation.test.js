// Valider les infos des users a l'inscription et la connection



const { validateEmail, validatePassword } = require('../../validation/usersValidation');

describe("Validation des utilisateurs", () => {

    test("courriel valide", () => {
        expect(validateEmail("test@example.com")).toBe(true);
        expect(validateEmail("user.name@domain.com")).toBe(true);
    });

    test("courriel invalide", () => {
        expect(validateEmail("invalid-email")).toBe(false); // il n'y a pas de @, domain
        expect(validateEmail("user@.com")).toBe(false); // il n'y a pas de domaine
        expect(validateEmail("user@com")).toBe(false); // il n'y a pas de domaine et de point
    });

    test("mot de passe valide", () => {
        expect(validatePassword("unmotDePASSE1!")).toBe(true); // mdp peut avoir des caractere speciaux et peux etre lettre
        expect(validatePassword("12345678")).toBe(true); // mdp doit etre 8 caractere min et peut etre juste des chiffres
    });

    test("Mot de passe invalide (moins de 8 caractères)", () => {
        expect(validatePassword("short")).toBe(false); // mdp court et lettre slmt invalide
        expect(validatePassword("12345")).toBe(false);
    });

});


