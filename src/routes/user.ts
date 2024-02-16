import express from "express";
import { logIn, logOut, register } from "../controller/userController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/user/login", logIn);
router.post("/user/logout", auth, logOut);
router.post("/user/register", register);

export default router;