import dbConnect from "../../db/dbConnect.mjs";
import subscriberModel from "../../db/models/subscriber.model.mjs";

export const getSubscribers = async () => {

    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    await dbConnect();

    try {

        let data = await subscriberModel.find({}); //.select('-__v')
        result = {status: 'ok', message: "Subscribers fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
       
    }

    return result

} 