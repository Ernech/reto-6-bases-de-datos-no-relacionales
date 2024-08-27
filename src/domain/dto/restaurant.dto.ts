


export class RestaurantDTO{

    constructor(
        public readonly name:string,
        public readonly description:string,
        public readonly city: string,
        public readonly address:string

    ){}


    static create(object:{[key:string]:any}):[string?,RestaurantDTO?]{

        const {name,description,city,addres} = object;

        if(!name) return['Name is required,undefined'];
        if(!city) return ['City is required'];
        if(!addres) return ['Addres is required'];   

        return[undefined, new RestaurantDTO(name,description,city,addres)];

    }

}