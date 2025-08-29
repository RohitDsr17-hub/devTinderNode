const mongoose = require('mongoose');

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
    },
    password: {
        type: String,
        required: true
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

const User = mongoose.model("User", userSchema);

module.exports = User;