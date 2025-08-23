const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://drstrange947:mNjgaCUA84YpfGdg@cluster0.lyindqm.mongodb.net/devTinderDB"
    );
};

module.exports = connectDB;