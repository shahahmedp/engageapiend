import {Request,Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";
import {secretKey} from '@config/auth.config'
import db from "@model";
import {logger} from '@utils/logger'
import {StatusConstants as dailogue} from '@constant/StatusConstants';
const User = db.user;

export class Authjwt{
    
/**
 * This middleware is used to verify the token.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async VerifyToken(req:Request,res:Response,next:NextFunction){
        logger.info("verify token method called ")
        let token = req.headers["x-access-token"];
        //check token in request
        if(!token){
            return res.status(dailogue.code403.code).send({"status":dailogue.code403.message,
                message: "no token provided!"
            });
        }
        //verify token
        jwt.verify(token.toString(),secretKey.secret,(err,decoded)=>{
                if(err){
                return res.status(dailogue.code401.code).send({"status":dailogue.code401.message,
                    message: "Unauthorized"
                });}else{
                    req.body.userId=decoded;
                    next()
                }
        })
       }

/**
 * This middleware is used to check Admin previlage.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async isAdmin(req: Request,res:Response,next:NextFunction){
        logger.info("isadmin middleare was called to check previlage")
        db.user.findAll({
                where:{id:req.body.userId.id},
                include:db.role
            }).then((isad: any)=>{
                //compare role from db to roles given by user
                for(let i=0;i<isad[0].roles.length;i++){
                    if(isad[0].roles[i].role=="Admin"){
                        next()
                        return;
                    }
                }
                res.status(dailogue.code403.code).send({"status":dailogue.code403.message,"message":"your dont have admin previlages"})
                return;
            }).catch((err:any)=>{
                res.status(dailogue.code500.code).send({"status":dailogue.code500.message,"message":err})
            })
    }

/**
 * This middleware is used to check company previlage.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async isCompany(req: Request,res:Response,next:NextFunction){
        logger.info("isCompany middleare was called to check previlage")
        db.user.findAll({
                where:{id:req.body.userId.id},
                include:db.role
            }).then((isad: any)=>{
                //check roles from db to request
                for(let i=0;i<isad[0].roles.length;i++){
                    if(isad[0].roles[i].role=="Company"){
                        next()
                        return;
                    }
                }
                res.status(dailogue.code403.code).send({"status":dailogue.code403.message,"message":"your dont have Company previlages"})
                return;
            }).catch((err:any)=>{
                res.status(500).send(err)
            })
    }

/**
 * This middleware is used to chcek user previlage.
 *
 * @param req
 * @param res
 * @param next
 */
    public static async isEmployee(req: Request,res:Response,next:NextFunction){
        logger.info("isEmployee middleare was called to check previlage")
        
        db.user.findAll({
            where:{id:req.body.userId.id},
            include:db.role
        }).then((isad: any)=>{
            //compare db and request roles
            for(let i=0;i<isad[0].roles.length;i++){
                if(isad[0].roles[i].role=="user"){
                    next()
                    return;
                }
            }
            res.status(dailogue.code403.code).send({"status":dailogue.code403.message,"message":"your dont have user previlages"})
            return;
        }).catch((err:any)=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,"message":err})
        })
        }
        
}
