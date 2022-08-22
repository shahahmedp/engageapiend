import {Request,Response, NextFunction} from 'express'
import { Sequelize, Op } from 'sequelize';
import db from '@model';
import {logger} from '@utils/logger'
import {StatusConstants as dailogue} from '@constant/StatusConstants';

export class VerifySignUp{
/**
 * This middleware is used to check duplicate user name or email in db.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async checkDuplicatUsernameOrEmail(req: Request, res: Response, next: NextFunction){
        logger.info("check username&email in db")
        await db.user.findOne({
            where:{userName: req.body.username}
        }).then((usr: any)=>{
            if(usr){
                res.status(dailogue.code400.code).send({"status":dailogue.code400.message,
                    message:"Failed Username is already in use!"
                });
                return;
            }
            //know it check email in db
            db.user.findOne({
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
                next();
             })
        }).catch((err:any)=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,"message":err})
        })
    }
/**
 * This middleware is used to checkrole existence in db.
 *
 * @param req
 * @param res
 */
    public static async checkRoleExisted(req: Request, res: Response, next: NextFunction){
        logger.info("to check roles existeed in db")
        if(req.body.roles.length){
           await db.role.findAll({
                    where: {
                        role:{
                            [Op.or]:req.body.roles
                        }
                    }}).then(async (rl: any)=>{
                        if(req.body.roles.length!==rl.length){
                            res.status(dailogue.code400.code).send({"status":dailogue.code400.message,"message":`the roles ${req.body.roles} are not valid please enter valid roles`})    
                        }else {
                            next()
                        }
                }).catch((err:any)=>{
                    res.status(dailogue.code500.code).send({"status":dailogue.code500.message,"message":err})
                })
        }else{
            next();
        }
         }
}