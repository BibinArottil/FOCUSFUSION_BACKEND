const messageModel = require('../../models/photographer/messageModel')

exports.newMessage=async(req,res)=>{
    try {
        const newMessage = new messageModel(req.body)
        const savedMessage =await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMessage=async(req,res)=>{
    try {
        const messages = await messageModel.find({
            chatId:req.params.chatId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}