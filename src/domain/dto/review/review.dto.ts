

export class ReviewDTO{

    constructor(
        public readonly rating:number,
        public readonly comment: string,
        public readonly restaurant:string,
        public readonly userId:string
    ){}

    static create(object:{[key:string]:any}):[string?,ReviewDTO?]{

        const {rating,comment="",restaurant,userId} = object;

        if(!rating) return['Rating is required'];
        if(rating<0 || rating>5) return['Rating must be between 0 and 5']
        if(!restaurant) return ['Restaurant is required'];
        if(!userId) return ['UserId is required'];

        return[undefined, new ReviewDTO(rating,comment,restaurant,userId)];

    }


}