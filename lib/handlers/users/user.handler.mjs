import dbConnect from "../../db/dbConnect.mjs";
import userModel from "../../db/models/user.model.mjs";
import { deleteFile } from "../file.handler.mjs";


export const createUser = async (user) => {

    // Vi opretter et default "result object"
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {
        
        // Vi kalder vores userModel med create metoden.
        let userData = await userModel.create(user)

        // Vi tilføjer resultatet til vore "result object",
        result = {status: 'ok', message: "User created YES WAY successfully", data: userData}

    } catch (error) {
    
        console.log(error)

    }

    // Vi aflevere resultatet.
    return result;

}

export const getUser = async (id) => {

    // Vi opretter et default "result object",
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {
        let data = await userModel.findById({_id : id});
        result = {status: 'ok', message: "User updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

     // Vi aflevere resultatet.
    return result

}

export const updateUser = async (user, newFile) => {

    // Vi opretter et default "result object",
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {

        // Hvis der er en ny fil med i opdateringen så sletter fi den gamle.
        if(newFile)
        {
            let userToDelete = await userModel.findById({_id : user.id});
            await deleteFile(userToDelete.picture);
        }
     

        let data = await userModel.findByIdAndUpdate(user.id, user, {new: true});
        result = {status: 'ok', message: "User updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    // Vi aflevere resultatet.
    return result

}

export const deleteUser = async (id) => {

    // Vi opretter et default "result object",
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {

        // Vi finder den gamle billede sti.
        let old = await userModel.findById({ _id: id });
        await deleteFile(old.picture);
        
        let data = await userModel.findByIdAndDelete(id);
        result = {status: 'ok', message: "User deleted successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}