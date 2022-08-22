import {Request,Response, NextFunction} from 'express'
import db from '@model';
import {logger} from '@utils/logger'
import {StatusConstants as dailogue} from '@constant/StatusConstants';
 

export class VerifyEmployee{
    
/**
 * This middleware is used to check duplicate user name or email in db.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async checkDuplicatCMPNameCMPemail(req: Request, res: Response, next: NextFunction){
        logger.info("checkDuplicatCMPNameCMPemail is called ")
        await db.employee.findOne({
            where:{firstName: req.body.firstName}
        }).then((usr: any)=>{
            if(usr){
                res.status(dailogue.code400.code).send({"status":dailogue.code400.message,
                    message:"Failed Username is already in use!"
                });
                return
            }
            //here we checking the email in db
            db.employee.findOne({
                where:{
                    email: req.body.email
                }
            }).then((user: any) =>{
                if(user){
                    res.status(dailogue.code400.code).send({"status":dailogue.code400.message,
                        message: "Failed! Email is already in use!"
                    });
                    return;
                }
                next()    
             })
        }).catch((err:any)=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,"message":err})
        })
    }
}