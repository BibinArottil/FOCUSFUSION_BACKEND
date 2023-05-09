const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const photographerRoutes = require("./routes/photographerRouter");

require("dotenv").config();
require("./config/dbConfig");

app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND,"https://focusfusion.bibin.tech"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/photographer", photographerRoutes);

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`Sever is running at ${port}`)
); 

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND,
  },
});

let users=[]

const addUser = (userId,socketId)=>{
  !users.some((user)=>user.userId===userId) && users.push({userId,socketId})
}

const removeUser=(socketId)=>{
  users=users.filter(user=>user.socketId!==socketId)
}

const getUser=(userId)=>{
  return users.find(user=>user.userId===userId)
}

io.on("connection",(socket)=>{
  //when connect
  console.log("a user connected")
  //take userId and socketId from user
  socket.on("addUser",userId=>{
    addUser(userId,socket.id)
    io.emit("getUsers",users)
  })

  //send and get message
  socket.on("sendMessage",({senderId,receiverId,text})=>{
    const user = getUser(receiverId)
    io.to(user?.socketId).emit("getMessage",{
      senderId,
      text
    })
  })

  //when disconnect
  socket.on("disconnect",()=>{
    console.log("a user disconnected")
    removeUser(socket.id)
    io.emit("getUsers",users)
  })
})

