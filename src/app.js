const connectDB = require('./config/database');
const express = require('express');
// const User = require('./models/user');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const user = await User.findOne({ emailId: userEmail });
//         if (!user) {
//             res.status(404).send("user does not exist");
//         } else {
//             res.send(user);
//         }
//     } catch(err) {
//         res.status(400).send("something went wrong");
//     }
// });

// app.get("/feed", async (req, res) => {
//     try {
//        const users = await User.find({});
//        res.send(users); 
//     } catch(err) {
//         res.status(404).send("something went wrong");
//     }
// });

// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully");
//     } catch(err) {
//         res.status(404).send("something went wrong");
//     }
// });

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try {
//         const ALLOWED_UPDATE = [ "userId", 
//             "photoUrl", "about", "gender", "age", "skills"
//         ];
//         const isUpdateAllowed = Object.keys(data).every((k) => 
//             ALLOWED_UPDATE.includes(k)
//         );
//         if (!isUpdateAllowed) {
//             res.status(400).send("Update not allowed");
//         }
//         if(data?.skills.length > 10) {
//             throw new Error("skills cannot be more than 10");
//         }
//         await User.findByIdAndUpdate({ _id: userId }, data, {
//             runValidators: true,
//         });
//         res.send("updated successfully");
//     } catch(err) {
//         res.status(404).send("something went wrong");
//     }
// });

connectDB().then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
        console.log("server successfully listening on port 3000");
    });
}).catch(err => {
    console.log("Database cannot be connected");
});