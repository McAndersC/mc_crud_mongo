import dbConnect from "../../db/dbConnect.mjs";
import subscriberModel from "../../db/models/subscriber.model.mjs";

export const createSubscriber = async (subscriber) => {

    // Vi opretter et default "result object"
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {
        
        // Vi kalder vores userModel med create metoden.
        let userData = await subscriberModel.create(subscriber)

        // Vi tilføjer resultatet til vore "result object",
        result = {status: 'ok', message: "Subscriber created YES WAY successfully", data: userData}

    } catch (error) {
    
        console.log(error)

    }

    // Vi aflevere resultatet.
    return result;

}

export const getSubscriber = async (id) => {

    // Vi opretter et default "result object"
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    
    await dbConnect();

    try {
    
        // Vi kalder vores userModel med create metoden.
        let subscriberData = await subscriberModel.findById({_id : id});
        console.log("asdads", subscriberData)
        // Vi tilføjer resultatet til vore "result object",
        result = {status: 'ok', message: "Subscriber fetched successfully", data: subscriberData}

    } catch (error) {
    
        console.log(error)

    }

    return result;

} 

export const updateSubscriber = async (subscriber) => {


    // Vi opretter et default "result object",
    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    // Skaber forbindelse til dabasen.
    await dbConnect();

    try {

        let data = await subscriberModel.findByIdAndUpdate(subscriber.id, subscriber, {new: true});
        result = {status: 'ok', message: "Subscriber updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result;
}

export const deleteSubscriber = async (id) => {

        // Vi opretter et default "result object",
        let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

        // Skaber forbindelse til dabasen.
        await dbConnect();

        try {

            let data = await subscriberModel.findByIdAndDelete(id);
            result = {status: 'ok', message: "Subscriber deleted successfully", data: data}
    
        } catch (error) {   
    
            console.log(error)
        }
    
        return result;

}