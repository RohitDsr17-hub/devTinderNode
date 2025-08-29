const { adminAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const express = require('express');
const User = require('./models/user');
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
console.log(req.body);

    // const userObj = {
    //     firstName: "dhoni",
    //     lastName: "MS",
    //     emailId: "msdhoni@123",
    //     password: "123hdubdc"
    // }
    // creating a new instance of the userModel
    const user = new User(req.body);
try {
    await user.save();
    res.send("User Added successfully");
} catch(err) {
    res.status(400).send("Error saving the User" + err.message)
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

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true,
        });
        res.send("updated successfully");
    } catch(err) {
        res.status(404).send("something went wrong");
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