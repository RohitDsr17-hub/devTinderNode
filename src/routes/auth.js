const express = require('express');

const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        // const userObj = {
        //     firstName: "dhoni",
        //     lastName: "MS",
        //     emailId: "msdhoni@123",
        //     password: "123hdubdc"
        // }
        // validation of data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        // creating a new instance of the userModel

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        });

        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error saving the User: " + err.message)
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("email id doesn't exist");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // create a JWT token

            const token = await user.getJWT();

            // add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("user login successful");
        } else {
            throw new Error("password not correct");
        }
    } catch (err) {
        // res.status(404).send("something went wrong");
        console.error("Login error:", err.message);
    res.status(400).send({ error: err.message });
    }
});

module.exports = authRouter;