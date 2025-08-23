const { adminAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const express = require('express');
const User = require('./models/user');
const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "virat",
        lastName: "kohli",
        emailId: "vk18@123",
        password: "1234560"
    }
    // creating a new instance of the userModel
    const user = new User(userObj);
try {
    await user.save();
    res.send("User Added successfully");
} catch(err) {
    res.status(400).send("Error saving the User" + err.message)
}   
});

connectDB().then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
        console.log("server successfully listening on port 3000");
    });
}).catch(err => {
    console.log("Database cannot be connected");
});