"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authjwt_1 = require("../middlewares/authjwt");
const verifyCompany_1 = require("../middlewares/verifyCompany");
const Checkdatapacket_1 = require("../utils/Checkdatapacket");
const company_controller_1 = require("../controller/company.controller");
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, origin, Content-Type, Accept");
        next();
    });
    /**
 * This routing method to create the resorce .
 *
 * @param req
 * @param res
 */
    app.post("/api/post/cmpy", Checkdatapacket_1.companyCheck, logger_1.logger.info("company resgister api called"), (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(StatusConstants_1.StatusConstants.code404.code).json({ "status": StatusConstants_1.StatusConstants.code404.message, "message": errors });
        }
        else {
            next();
        }
    }, [
        //middlewares
        authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isCompany, verifyCompany_1.VerifyCompany.checkDuplicatCMPNameCMPemail
    ], 
    //controllers
    company_controller_1.CompanyController.companyPost);
    /**
     * This routing method to get the resorce.
     *
     * @param req
     * @param res
     */
    app.get("/api/get/cmpy", logger_1.logger.info("company get api called"), [
        //middleware
        authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isCompany
    ], 
    //controller
    company_controller_1.CompanyController.companyGet);
    /**
     * This routing method to get by id the resource.
     *
     * @param req
     * @param res
     */
    app.get("/api/getbyid/cmpy/:id", logger_1.logger.info("get by id company api called "), [
        //middleware
        authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isCompany
    ], 
    //controller
    company_controller_1.CompanyController.companyGetById);
    /**
     * This routing method to update by id the resource.
     *
     * @param req
     * @param res
     */
    app.put("/api/putbyid/cmpy/:id", logger_1.logger.info("putbyId api called of company"), 
    //check request body
    Checkdatapacket_1.companyCheck, (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(StatusConstants_1.StatusConstants.code400.code).json({ "status": StatusConstants_1.StatusConstants.code400.message, "message": errors });
        }
        else {
            next();
        }
    }, 
    //middlewares
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isAdmin], 
    //controller
    company_controller_1.CompanyController.companyPutBYId);
    /**
     * This routing method to delete by id the resource.
     *
     * @param req
     * @param res
     */
    app.delete("/api/deleteById/cmpy/:id", logger_1.logger.info("delete by id of company called "), 
    //middlewares
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isAdmin], 
    //controller
    company_controller_1.CompanyController.companyDeleteById);
    // app.get('/api/GetUserINCmp/cmpy',
    //  [Authjwt.VerifyToken, Authjwt.isCompany||Authjwt.isAdmin],
    //  CompanyController.GetEmployee
    // )
};
