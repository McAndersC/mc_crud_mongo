import express from "express";
import { signInUser } from "../../handlers/auth/auth.handler.mjs";
const authRoutes = express.Router();

authRoutes.post("/api/auth/signin", async (req, res) => {

    let result = await signInUser(req.body);
    return res.status(200).send(result);

});

export default authRoutes;