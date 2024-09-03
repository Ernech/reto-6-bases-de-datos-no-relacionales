

export class ReviewDTO{

    constructor(
        public readonly rating:number,
        public readonly comment: string,
        public readonly restaurantId:string
    ){}

    static create(object:{[key:string]:any}):[string?,ReviewDTO?]{

        const {rating,comment="",restaurantId} = object;

        if(!rating) return['Rating is required'];
        if(rating<0 || rating>5) return['Rating must be between 0 and 5']
        if(!restaurantId) return ['Restaurant is required'];
       
        return[undefined, new ReviewDTO(rating,comment,restaurantId)];

    }


}