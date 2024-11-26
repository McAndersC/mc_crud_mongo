import express from "express";
import { deleteFile, read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";
import * as mime from "mime-types"
import multer from "multer";
import { createUser, deleteUser, getUser, updateUser } from "../../../handlers/users/user.handler.mjs";
import bcrypt from 'bcryptjs';


const userRoute = express.Router();

// Multer Setup for storage.
const userStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/users")
    },
    filename: function (req, file, cb) {
        
        let newFileName = getNewUID() + "." + mime.extension(file.mimetype)
        let ext = mime.extension(file.mimetype)

        cb(null, newFileName);
    }
});

const upload = multer({ storage: userStorage });

// (C)reate POST
userRoute.post("/api/user", upload.single("picture"), async (req, res) => {

    // Vi samler vores body data op fra postman eller Klient <form>´en.

    let newUser = {
        ...req.body
    }

    newUser.hashedPassword = await bcrypt.hash(req.body.password, 10)
    // Hvis der er en "file" på vores request = req.file.
    // Så har vi billede data og kan tilføje vores nye billedesti til "modellen" user.
    // newUser.picture = sti/path til billede.
    if(req.file) {

        newUser.picture = "/users/" + req.file.filename;

    }

    // Så kalder vi vores "handler", som opretter vores nye bruger.
    const result = await createUser(newUser);

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    
    return res.status(200).send(result);
    // return res.status(200).send(result);

});

// (R)ead GET By Query ID
userRoute.get("/api/user", async (req, res) => {

    let userId = req.query.id;

    // Så kalder vi vores "handler", som opretter vores nye bruger.
    const result = await getUser(userId);

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);

});

// (U)pdate PUT  
userRoute.put("/api/user", upload.single("picture"), async (req, res) => {

    // Vi samler vores body data op fra postman eller Klient <form>´en.
    // Vi undersøger om der er en fil med i requestet og hvis der IKKE er så beholder vi det billede vi allerede har.
    // || = OR operator.
    // picture : req.file || req.body.picture.

    let updatedUser = {
        ...req.body,
        picture : req.file || req.body.picture
    }

    // Hvis der er en "file" på vores request = req.file.
    // Så har vi billede data og kan tilføje vores nye billedesti til "modellen" user.
    // newUser.picture = sti/path til billede.
    if(req.file) {

    
        updatedUser.picture = "/users/" + req.file.filename;

    }

    // Så kalder vi vores "handler", som opdaterer vores bruger, vi sender true eller false med som
    // andet parameter for at afgøre om vi skal slette det nuværende billede.
    // req.file ? true : false
    let result = await updateUser(updatedUser, req.file ? true : false);

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);

});

// (D)elete DELETE Med Body Id
userRoute.delete("/api/user", upload.single("picture"), async (req, res) => {

    // Vi samler vores body data op fra postman eller Klient <form>´en.
    let userIdToDelete = req.body.id;
    
    // Så kalder vi vores "handler", som sletter vores bruger.
    let result = await deleteUser(userIdToDelete);

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);

});

// (D)elete DELETE Med PARAMS 
userRoute.delete("/api/user/:id", upload.single("picture"), async (req, res) => {

    // Vi samler vores id op via RUTENs parameter :id 
    // Den ligger på params.
    let userIdToDelete = req.params.id;
    
    // Så kalder vi vores "handler", som sletter vores bruger.
    let result = await deleteUser(userIdToDelete);

    // Vi modtager et resultat som vi sender tilbage som response til postman / klienten.
    // I dette tilfælde har alle 200 status.
    return res.status(200).send(result);

});

export default userRoute;