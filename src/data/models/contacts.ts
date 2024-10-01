import mongoose,{ Schema } from "mongoose";

const contactSchema = new Schema({

    name: {
        type: String,
        required:[true,'Contact name is required']
    },

    description:{
        type: String,
        required:[true,'Description is required']
    },

    status:{
        type: Boolean,
        default:true
    }

});

contactSchema.methods.toJSON = function(){
    const {__v,status,...data} = this.toObject();
    
    return data;
}

export const ContactModel = mongoose.model('User', contactSchema);

