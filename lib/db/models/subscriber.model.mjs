import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const subscriberScheme = new Schema({

    name : {type: String, required : true },
    email : {type: String, required : true },

})

export default mongoose.models.subscriber || mongoose.model('subscriber', subscriberScheme);

// {
//     "name": "Anders GO",
//     "age": "22",
//     "picture": "/users/no-user.jpg"
// },