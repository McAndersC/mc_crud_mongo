import express from "express";
import { read } from "../../../handlers/file.handler.mjs";
import { getSubscribers } from "../../../handlers/subscribers/subscibers.handler.mjs";

const subscribersRoutes = express.Router();

// (R)ead GET  
subscribersRoutes.get('/api/subscribers', async (req, res) => {

    // Vi kalder vores "handler", som henter alle vores bruger.
    let result = await getSubscribers();

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);

})


export default subscribersRoutes;