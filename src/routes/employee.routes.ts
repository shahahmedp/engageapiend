import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator'
import { Authjwt } from '../middlewares/authjwt';
import {VerifyEmployee} from '../middlewares/verifyEmployee'
import { employeeCheck } from '../utils/Checkdatapacket';
import {EmployeeController} from '../controller/employee.controller';
import {logger} from '../utils/logger'
import {StatusConstants as dailogue} from '../constants/StatusConstants';
 

module.exports = function (app: any) {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Headers", "x-access-token, origin, Content-Type, Accept");
        next();
    });
       /**
 * This routing method to create the resorce .
 *
 * @param req
 * @param res
 */
    app.post("/api/post/emp",
    //validate payload
        employeeCheck,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors)
            } else { next() }
        },
        //middleware for token and employe previlage verification
        [Authjwt.VerifyToken, Authjwt.isEmployee,VerifyEmployee.checkDuplicatCMPNameCMPemail],
        //controller
        EmployeeController.employeePost);
           /**
 * This routing method to get the resorce .
 *
 * @param req
 * @param res
 */
    app.get("/api/get/emp",
    //middleware for token and employe previlage verification 
    [Authjwt.VerifyToken, Authjwt.isEmployee],
    //controller
        EmployeeController.employeeGet);
           /**
 * This routing method to get by id the resorce  .
 *
 * @param req
 * @param res
 */
    app.get("/api/getbyid/emp/:id", 
    //middleware for token and employe previlage verification
    [Authjwt.VerifyToken, Authjwt.isEmployee],
    //controller
        EmployeeController.employeeGetById);
           /**
 * This routing method to update by id the resorce .
 *
 * @param req
 * @param res
 */
    app.put("/api/putbyid/emp/:id",
    //check payload     
    employeeCheck,
        (req:Request, res:Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors)
            } else { next() }
        },
        //middleware for token and admin adn company previlage verification
        [Authjwt.VerifyToken, Authjwt.isAdmin||Authjwt.isCompany],
        //controller
        EmployeeController.employeePutBYId);
           /**
 * This routing method to delete by id the resorce .
 *
 * @param req
 * @param res
 */    
    app.delete("/api/deleteById/emp/:id", 
    //middleware for token and admin and company previlage verification
    [Authjwt.VerifyToken, Authjwt.isAdmin||Authjwt.isCompany],
    //controller
        EmployeeController.employeeDeleteById);

}