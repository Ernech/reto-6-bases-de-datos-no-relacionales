import mongoose, {Schema} from "mongoose";


const roleSchema = new Schema({

    role:{
        type: String,
        required:[true,'Role is required']
    },

    status:{
        type:Boolean,
        default: true
    }

});

roleSchema.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();
    
    return data;
}

export const RoleModel = mongoose.model('Role',roleSchema);