import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //It means that senderId will be taken from user id
    required: true,
  },
  receiverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message:{
    type: String,
    required: true,
  },
},
{ timestamps: true } //this will be help to make createdAt and updatedAt field
);

const Message = mongoose.model("Message", messageSchema);

export default Message;