import { NextFunction, Request , Response } from "express";
import { check, validationResult } from 'express-validator'
import {Auth} from '@controller/auth.controller'
import {registerCheck,signInCheck} from '@utils/Checkdatapacket'
import {VerifySignUp} from '@middleware/verifySignUp';
import {logger} from '@utils/logger'
import {StatusConstants as dailogue} from '@constant/StatusConstants';
   
   
module.exports = function(app: any){
/**
 * This routing method to regsiter the user.
 *
 * @param req
 * @param res
 */

    app.post(
        //path
        "/api/auth/signup",
        //check data payload
       registerCheck,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(dailogue.code400.code).json({"statuss":dailogue.code400.message,"message":errors})
            }else{
                next()
            }
        },
        [
            //middlewares to verify
            VerifySignUp.checkDuplicatUsernameOrEmail,
            VerifySignUp.checkRoleExisted
        ],
        // controllers
        Auth.signUp
        )
        /**
 * This routing method to login the user.
 *
 * @param req
 * @param res
 */

     app.post("/api/auth/signin",
     //paylode check
     signInCheck,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(dailogue.code400.code).json({"status":dailogue.code400.message,"message":errors})
        }else{next()}
    },
    //controller
    Auth.signIn
    )
}