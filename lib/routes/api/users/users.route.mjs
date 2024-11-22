import express from "express";
import { read } from "../../../handlers/file.handler.mjs";
import { getUsers } from "../../../handlers/users/users.handler.mjs";

const usersRoutes = express.Router();

// (R)ead GET  
usersRoutes.get('/api/users', async (req, res) => {

    // Vi kalder vores "handler", som henter alle vores bruger.
    let result = await getUsers();

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);


})



export default usersRoutes;