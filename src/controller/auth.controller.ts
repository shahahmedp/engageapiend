import {Request,Response} from 'express'
import db from '../models';
import {logger} from '../utils/logger'
import {StatusConstants as dailogue} from '../constants/StatusConstants';
import {secretKey} from '../config/auth.config';
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

export class Auth{
    /**
 * This controller is used to do Register user.
 *
 * @param req
 * @param res
 */
    public static async signUp(req: Request, res: Response){
        logger.info("SignUP Controller as reached")
        await db.user.create({
            userName: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
         }).then(async (user: any)=>{
            //check role array is empty or not 
            if(req.body.roles.length){
                await req.body.roles.map((obj: any)=>{
                    db.role.findOne({where:{
                        role:obj
                    }}).then((rl: any)=>{
                        //store role of user in association
                        db.userrole.create({
                            roleId: rl.id,
                            userId:user.id
                            })
                    })
                })
                res.status(dailogue.code200.code).send({"status":dailogue.code200.message,
                    message:`User ${req.body.username} was registered successfully`});
            }else{
                //if empty then register with user previlage 
                await db.userrole.create({
                    roleId: 3,
                    userId:user.id
                    });  
                res.status(dailogue.code200.code).send({"status":dailogue.code200.message,message:`User ${req.body.username} was registered successfully`});       
            }
            }).catch((err: { message: any; })=>{
                res.status(dailogue.code500.code).send({"status":dailogue.code500.message,message: err.message}); 
            })
        }
    /**
 * This controller is used to do Authenticate user.
 *
 * @param req
 * @param res
 */
    public static async signIn(req: Request, res: Response){
        logger.info("signIN controller reached")
        await db.user.findOne({
            where:{userName: req.body.username}
        }).then((user: { password: any; id: any; userName: any; email: any; })=>{
            if(!user){
                res.status(dailogue.code404.code).send({"status":dailogue.code404.message,message: "User Not found ."});
            }
            //comparing password
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user?.password
            )
            //if not password is same 
            if(!passwordIsValid){
                res.status(401).send({
                    accessToken: null,
                    message: "invalid password!"
                });
            }
            //generating jwt token to send response
            var token = jwt.sign({ id: user?.id}, secretKey.secret, {
                expiresIn: secretKey.expiresIn // 24 hours
              });
              res.status(dailogue.code200.code).send({"status":dailogue.code200.message,
                id: user?.id,
                username: user?.userName,
                email: user?.email,
                accessToken: token
            })
        }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,message: err.message});
        });    
    }
}