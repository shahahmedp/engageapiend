"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
class EmployeeController {
    /**
     * This controller is used to store Employee resource info.
     *
     * @param req
     * @param res
     */
    static employeePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("employeepost is  called");
            models_1.default.employee.create(Object.assign({}, req.body)).then((cmpny) => {
                res.status(StatusConstants_1.StatusConstants.code200.code).send({
                    status: StatusConstants_1.StatusConstants.code200.message,
                    response: cmpny.data
                });
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    message: err.message || "Some error occured while creating the Tutorial ."
                });
            });
        });
    }
    /**
     * This controller is used to update Employee resource info.
     *
     * @param req
     * @param res
     */
    static employeePutBYId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("employeePutBYId is called");
            logger_1.logger.info;
            const { id } = req.params;
            models_1.default.employee.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cmp: req.body.cmp.toString(),
                email: req.body.email,
                phone: req.body.phone
            }, { where: { id } }).then((up) => {
                //check id is there or not
                if (up) {
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: "employee deatils have been updated successfully"
                    });
                }
                else {
                    res.status(StatusConstants_1.StatusConstants.code404.code).send({ "status": StatusConstants_1.StatusConstants.code404.message,
                        message: `id ${id} is not there`
                    });
                }
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    message: err.message || "server is not working properly"
                });
            });
        });
    }
    /**
     * This controller is used to get Employee resource info.
     *
     * @param req
     * @param res
     */
    static employeeGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("employeeGet api called");
            models_1.default.employee.findAll().then((data) => {
                res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message, "Response": data });
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    messagge: err.message || "server error"
                });
            });
        });
    }
    /**
     * This controller is used to get by id Employee resource info.
     *
     * @param req
     * @param res
     */
    static employeeGetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("employeeGetById api called");
            models_1.default.employee.findByPk(req.params.id).then((data) => {
                if (data) {
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: data
                    });
                }
                else {
                    res.status(StatusConstants_1.StatusConstants.code404.code).send({ "status": StatusConstants_1.StatusConstants.code404.message,
                        message: `id ${req.params.id} is not there`
                    });
                }
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    messagge: err.message || "server error"
                });
            });
        });
    }
    /**
     * This controller is used to delete by id Employee resource info.
     *
     * @param req
     * @param res
     */
    static employeeDeleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("employeDeleteByID was created");
            const { id } = req.params;
            models_1.default.employee.destroy({ where: { id } }).then((dl) => {
                if (dl) {
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: `id ${req.params.id} was deleted`
                    });
                }
                else {
                    res.status(StatusConstants_1.StatusConstants.code404.code).send({ "status": StatusConstants_1.StatusConstants.code404.message,
                        message: `id ${req.params.id} is not there`
                    });
                }
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    message: err.message || "server error"
                });
            });
        });
    }
}
exports.EmployeeController = EmployeeController;
