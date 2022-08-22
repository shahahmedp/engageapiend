"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authjwt_1 = require("../middlewares/authjwt");
const verifyEmployee_1 = require("../middlewares/verifyEmployee");
const Checkdatapacket_1 = require("../utils/Checkdatapacket");
const employee_controller_1 = require("../controller/employee.controller");
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
    app.post("/api/post/emp", 
    //validate payload
    Checkdatapacket_1.employeeCheck, (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json(errors);
        }
        else {
            next();
        }
    }, 
    //middleware for token and employe previlage verification
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isEmployee, verifyEmployee_1.VerifyEmployee.checkDuplicatCMPNameCMPemail], 
    //controller
    employee_controller_1.EmployeeController.employeePost);
    /**
* This routing method to get the resorce .
*
* @param req
* @param res
*/
    app.get("/api/get/emp", 
    //middleware for token and employe previlage verification 
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isEmployee], 
    //controller
    employee_controller_1.EmployeeController.employeeGet);
    /**
* This routing method to get by id the resorce  .
*
* @param req
* @param res
*/
    app.get("/api/getbyid/emp/:id", 
    //middleware for token and employe previlage verification
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isEmployee], 
    //controller
    employee_controller_1.EmployeeController.employeeGetById);
    /**
* This routing method to update by id the resorce .
*
* @param req
* @param res
*/
    app.put("/api/putbyid/emp/:id", 
    //check payload     
    Checkdatapacket_1.employeeCheck, (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json(errors);
        }
        else {
            next();
        }
    }, 
    //middleware for token and admin adn company previlage verification
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isAdmin || authjwt_1.Authjwt.isCompany], 
    //controller
    employee_controller_1.EmployeeController.employeePutBYId);
    /**
* This routing method to delete by id the resorce .
*
* @param req
* @param res
*/
    app.delete("/api/deleteById/emp/:id", 
    //middleware for token and admin and company previlage verification
    [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isAdmin || authjwt_1.Authjwt.isCompany], 
    //controller
    employee_controller_1.EmployeeController.employeeDeleteById);
};
