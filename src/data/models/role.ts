import mongoose, {Schema} from "mongoose";


const roleSchema = new Schema({

    role:{
        type: String,
        required:[true,'Role is required']
    },

    state:{
        type:Boolean,
        default: true,
        required: true,
    }

});

export const RoleModel = mongoose.model('Role',roleSchema);