import dbConnect from "../../db/dbConnect.mjs";
import userModel from "../../db/models/user.model.mjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInUser = async (credentials) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {
        
        await dbConnect();

        let user = await userModel.findOne({email: credentials.email});

        if(!user) {

            result = {status: 'error', message: "An Error Occurred", data: []};
    
        } else {
         
            let validPass = await bcryptjs.compare(credentials.password, user.hashedPassword);

            console.log('Valid Pass', validPass)
    
            if(!validPass) {
               return result = {status: 'error', message: "An Error Occurred", data: []};
            }

            const token = jwt.sign(
                {
                  _id : user._id,
                  email : user.email,
                  name: user.name,
                  picture: user.picture
                },
                process.env.JWT_SECRET, {
                  expiresIn : process.env.JWT_EXPIRES_IN
                }
              )
      
            result = {status: 'ok', message: `${user.name} signed in successfully`, data: {token : token}}
        }

      
    } catch (error) {   

   
        result = {status: 'error', message: "Token Expired", data: {}}
    }

    return result
};