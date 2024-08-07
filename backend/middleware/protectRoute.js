import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({ error: "Unauthorized - No Token Provied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //we need to decode the token using that secret as we have sign by using that key earlier

    if(!decoded){ //if there is not decoded value or it is false
      return res.status(401).json({ error: "Unauthorized - No Token Provied" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; //Now we have that user in our request which is in our database
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;