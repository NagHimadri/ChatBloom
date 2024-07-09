import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages); //protectRoute is a middleware and it ensures that unauthenticated users can not able to call the function (In this case getMessages)
router.post("/send/:id", protectRoute , sendMessage);

export default router;