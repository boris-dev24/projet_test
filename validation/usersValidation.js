// test pour email de l'inscription d'un utilisateur

// https://uibakery.io/regex-library/email pour regex email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >=8 ;
}

module.exports = { validateEmail, validatePassword }; 
