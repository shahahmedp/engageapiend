import { NextFunction, Request, Response } from "express";
import {validationResult } from 'express-validator'
import { Authjwt } from '../middlewares/authjwt'
import {VerifyCompany} from '../middlewares/verifyCompany'
import { companyCheck } from '../utils/Checkdatapacket';
import {CompanyController} from '../controller/company.controller';
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
    app.post("/api/post/cmpy",
        companyCheck,
        logger.info("company resgister api called"),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(dailogue.code404.code).json({"status":dailogue.code404.message,"message":errors})
            } else { next() }
        },
        [
            //middlewares
            Authjwt.VerifyToken, Authjwt.isCompany,VerifyCompany.checkDuplicatCMPNameCMPemail],
            //controllers
        CompanyController.companyPost);
/**
 * This routing method to get the resorce.
 *
 * @param req
 * @param res
 */
    app.get("/api/get/cmpy",
    logger.info("company get api called"), 
    [
        //middleware
        Authjwt.VerifyToken, Authjwt.isCompany],
        //controller
        CompanyController.companyGet);
/**
 * This routing method to get by id the resource.
 *
 * @param req
 * @param res
 */
    app.get("/api/getbyid/cmpy/:id",
    logger.info("get by id company api called "), 
    [
        //middleware
        Authjwt.VerifyToken, Authjwt.isCompany],
        //controller
        CompanyController.companyGetById);
/**
 * This routing method to update by id the resource.
 *
 * @param req
 * @param res
 */
    app.put("/api/putbyid/cmpy/:id",
    logger.info("putbyId api called of company"),
    //check request body
        companyCheck,

        (req:Request, res:Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(dailogue.code400.code).json({"status":dailogue.code400.message,"message":errors})
            } else { next() }
        },
        //middlewares
        [Authjwt.VerifyToken, Authjwt.isAdmin],
        //controller
        CompanyController.companyPutBYId);
/**
 * This routing method to delete by id the resource.
 *
 * @param req
 * @param res
 */
    app.delete("/api/deleteById/cmpy/:id", 
    logger.info("delete by id of company called "),
    //middlewares
    [Authjwt.VerifyToken, Authjwt.isAdmin],
    //controller
        CompanyController.companyDeleteById);

    // app.get('/api/GetUserINCmp/cmpy',
    //  [Authjwt.VerifyToken, Authjwt.isCompany||Authjwt.isAdmin],
    //  CompanyController.GetEmployee
    // )
}