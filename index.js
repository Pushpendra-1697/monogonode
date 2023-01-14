const { connection } = require('./Configs/config');
const { UserModel } = require('./Models/users.model');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    let { city, page = 1, limit = 10 } = req.query;
    try {
        if (page && limit) {
            if (Number(page) === 1) {
                let users = await UserModel.find().skip(0).limit(+limit);
                res.send(users);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let users = await UserModel.find().skip(s).limit(+limit);
                res.send(users);
            }
        }else if (page && limit && city) {
            console.log(city);
            let users = await UserModel.find({ city });
            res.send(users);
        } else {
            console.log("te");
            let users = await UserModel.find().skip(0).limit(+limit);
            res.send(users);
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }
});

app.post("/post", async (req, res) => {
    let users = req.body;
    // console.log(users);
    try {
        await UserModel.insertMany(users);
        res.send({ "msg": "Users Store in database" });
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }
});

app.delete("/delete", async (req, res) => {
    try {
        await UserModel.deleteMany({});
        res.send({ "msg": "Users delete in database" });
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }
});


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
        console.log("Trouble connecting to DB");
    }
    console.log(`Server is running on ${process.env.port} port`)
});