const { adminAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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
} catch(err) {
    res.status(400).send("Error saving the User: " + err.message)
}   
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("user does not exist");
        } else {
            res.send(user);
        }
    //   const user = await User.find({ emailId: userEmail });
    //   if (user.length === 0) {
    //     res.status(404).send("no users");
    //   } else {
    //     res.send(user);
    //   }
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});

app.get("/profile", userAuth, async (req, res) => {
   try {
    const user = req.user;
    res.send(user);
   } catch(err) {
    res.status(404).send("something went wrong");
   }
});

app.get("/feed", async (req, res) => {
    try {
       const users = await User.find({});
       res.send(users); 
    } catch(err) {
        res.status(404).send("something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err) {
        res.status(404).send("something went wrong");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATE = [ "userId", 
            "photoUrl", "about", "gender", "age", "skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATE.includes(k)
        );
        if (!isUpdateAllowed) {
            res.status(400).send("Update not allowed");
        }
        if(data?.skills.length > 10) {
            throw new Error("skills cannot be more than 10");
        }
        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true,
        });
        res.send("updated successfully");
    } catch(err) {
        res.status(404).send("something went wrong");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId});
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
    } catch(err) {
        res.status(404).send("something went wrong");
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + "connection is sent");
});

connectDB().then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
        console.log("server successfully listening on port 3000");
    });
}).catch(err => {
    console.log("Database cannot be connected");
});