
export class ContactDTO{

    constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly restaurant:string
    ){}

    static create(object:{[key:string]:any}):[string?,ContactDTO?]{

        const {name,description,restaurantId}= object;

        if(!name) return ['Name is required']
        if(!description) return ['Description is required'];
        if(!restaurantId) return ['Restaurant is required']

        return [undefined, new ContactDTO(name,description,restaurantId)];
    }
    

}