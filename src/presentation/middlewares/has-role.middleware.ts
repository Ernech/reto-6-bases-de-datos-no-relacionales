
import { Request, Response, NextFunction } from "express"
import { RoleModel } from "../../data/models/role";

export class CheckRoles{
    
    static hasRole =(roles:string[])=>{
    
        return async(req:Request, res:Response, next:NextFunction)=>{
    
    
            const {user} = req.body;
            const rolesId=[];

            for(const role of roles){
                const roleFromUser = await RoleModel.findOne({role,status:true});
                rolesId.push(roleFromUser?._id.toString());
            }
           
         
            
            for(const role of user.roles){             
                if(rolesId.includes(role.toString())){
                    next();
                    return;
                }
            }

            res.status(403).json({error:'You do not have permission to access to this resource'});
    
        }

}


}
