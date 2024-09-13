import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({

    name:{
        type: String,
        required: [true, 'Restaurant name is required'],

    },

    description:{
        type: String,
        default:""
    },
    
    city:{
        type: String,
        required: [true,'City is required']
    },

    address:{
        type: String,
        required:[true,'Address is required']
    },

    averageRating:{
        type: Number,
        default:0.0
    },

    Reviews:[{
      type: Schema.Types.ObjectId,
      ref: 'Review',
      default:[]
    }],

    Contacts:[{
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      default:[]
    }],

    status:{
        type: Boolean,
        default:true
    }
    
});

restaurantSchema.methods.toJSON = function(){

    const{__v,status,...data} = this.toObject();

    return data;
}

export const RestaurantModel = mongoose.model('Restaurant',restaurantSchema);