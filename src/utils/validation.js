const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("email is invalid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("enter strong password");
    }
};

const validateProfileEditData = (req) => {
    const allowedFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileEditData
};