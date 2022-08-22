"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controller/auth.controller");
const Checkdatapacket_1 = require("../utils/Checkdatapacket");
const verifySignUp_1 = require("../middlewares/verifySignUp");
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
module.exports = function (app) {
    /**
     * This routing method to regsiter the user.
     *
     * @param req
     * @param res
     */
    app.post(
    //path
    "/api/auth/signup", logger_1.logger.info("registration api called"), 
    //check data payload
    Checkdatapacket_1.registerCheck, (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(StatusConstants_1.StatusConstants.code400.code).json({ "statuss": StatusConstants_1.StatusConstants.code400.message, "message": errors });
        }
        else {
            next();
        }
    }, [
        //middlewares to verify
        verifySignUp_1.VerifySignUp.checkDuplicatUsernameOrEmail,
        verifySignUp_1.VerifySignUp.checkRoleExisted
    ], 
    // controllers
    auth_controller_1.Auth.signUp);
    /**
* This routing method to login the user.
*
* @param req
* @param res
*/
    app.post("/api/auth/signin", 
    //paylode check
    logger_1.logger.info("login api called "), Checkdatapacket_1.signInCheck, (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(StatusConstants_1.StatusConstants.code400.code).json({ "status": StatusConstants_1.StatusConstants.code400.message, "message": errors });
        }
        else {
            next();
        }
    }, 
    //controller
    auth_controller_1.Auth.signIn);
};
