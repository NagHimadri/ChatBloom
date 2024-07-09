import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select("-password"); //This will find all users but not the current logged in user AND also we don't want the passwords of each user

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error is getUsersForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}