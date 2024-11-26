import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const userScheme = new Schema({

    name : {type: String, required : true},
    age : {type: Number, default : 0 },
    email : {type: String, unique: true },
    hashedPassword: {type: String, required : true},
    picture : {type: String, default: '/users/no-user.png'},

})

export default mongoose.models.user || mongoose.model('user', userScheme);
