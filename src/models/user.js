const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 45
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowerCase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Inavlid Email Adress" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Inavlid password" + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender Data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/256/149/149071.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Inavlid photo url" + value);
            }
        }
    },
    about: {
        type: String,
        default: "Status Busy",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Dev@sairam10", { expiresIn: '1h' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const token = await bcrypt.compare(passwordInputByUser, passwordHash);
    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;