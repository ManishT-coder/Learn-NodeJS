const express = require("express");
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const URL  = require('./models/url')
const path = require('path')

const app = express();
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({extends:false}))

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("MongoDB connected"))

app.set("view engine","ejs");
app.set("views",path.resolve("./view"))



app.use("/url",urlRoute)
app.use('/',staticRoute)

app.get('/url/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const Entry = await URL.findOneAndUpdate({
        shortId
    },{ $push :{
        visitHistory:{
            timestamp : Date.now()
        }
    }
}
);
res.redirect(Entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
