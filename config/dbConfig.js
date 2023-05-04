const mongoose = require("mongoose");

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection successful");
}).catch((error)=>{
    console.log("DB connection failed");
})