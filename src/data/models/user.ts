import mongoose, {Schema} from "mongoose";
import { RoleModel } from "./role";

const userSchema = new Schema({

    name:{
        type:String,
        required:[true, 'Name is required']
    },

    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },

    password:{
        type:String,
        required:[true, 'Password is required']
    },
    roles:[{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Role'
    }],

    state:{
        type:Boolean,
        default: true,
        required: true,
    }
});

userSchema.methods.toJSON = function(){
    const {__v,status,password,...data} = this.toObject();
    
    return data;
}

export const UserModel = mongoose.model('User', userSchema);


