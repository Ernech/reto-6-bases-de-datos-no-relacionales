import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({

    user:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    rating:{
        type: Number,
        required: [true, 'Score is necesary'],

    },

    comment:{
        type: String
    },

    status:{
        type:Boolean,
        default:true
    },
    restaurant:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'Restaurant'
    }

});

reviewSchema.methods.toJSON = function(){

    const {__v,status,...data} = this.toObject();

    return data;
}

export const ReviewModel = mongoose.model('Review',reviewSchema);