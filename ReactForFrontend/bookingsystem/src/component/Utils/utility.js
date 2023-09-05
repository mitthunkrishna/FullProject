const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const validatePhone = (phone) => {
const phonePattern = /^[0-9]{10}$/;
return phonePattern.test(phone);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const validatePasswordRegex = (password) => {
    const passwordPattern = /^[a-zA-Z0-9]{3,30}$/;
    return passwordPattern.test(password);
}

module.exports = {validateEmail, validatePhone, validatePassword, validatePasswordRegex};