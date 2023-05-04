const chatModel = require('../../models/photographer/chatModel') 

exports.newChat = async(req,res)=>{
    try {
        const {senderId, receiverId } = req.body
        const findChat = await chatModel.findOne({$and:[{users:[senderId,receiverId]}]})
        if(findChat){
        res.status(200).json(findChat)
        }else{
            const newChat = new chatModel({
                users:[senderId,receiverId]
            })
            const saveChat = await newChat.save() 
            res.status(200).json(saveChat)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getChat= async(req,res)=>{
    try {
        const chat = await chatModel.find({
            users:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.userChat = async(req,res)=>{
    try {
        const id = req.body.nowChatId
        const chat = await chatModel.findById(id)
        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
    }
}