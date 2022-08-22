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
exports.CompanyController = void 0;
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
class CompanyController {
    /**
     * This controller is used to store company resource info.
     *
     * @param req
     * @param res
     */
    static companyPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("CompanyPOst api called");
            models_1.default.companies.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                website: req.body.website
            }).then((cmpny) => {
                logger_1.logger.info('company resources are stored');
                res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                    message: "company Detailes added",
                    response: cmpny.data
                });
            }).catch((err) => {
                logger_1.logger.info('company resources failed stored due to server error');
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    message: err.message || "Some error occured while creating the Tutorial ."
                });
            });
        });
    }
    /**
     * This controller is used to update company resource info.
     *
     * @param req
     * @param res
     */
    static companyPutBYId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("companyPutById api called ");
            const { id } = req.params;
            models_1.default.companies.update(Object.assign({}, req.body), { where: { id } }).then((upt) => {
                if (upt) {
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: "Company deatils have been updated successfully"
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
     * This controller is used to get company resource.
     *
     * @param req
     * @param res
     */
    static companyGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("companyGet api called");
            models_1.default.companies.findAll().then((data) => {
                res.status(StatusConstants_1.StatusConstants.code200.code).send({ "": StatusConstants_1.StatusConstants.code200.message, "response": data });
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message,
                    messagge: err.message || "server error"
                });
            });
        });
    }
    /**
     * This controller is used to get by Id company resource .
     *
     * @param req
     * @param res
     */
    static companyGetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("companyGetById was called");
            models_1.default.companies.findByPk(req.params.id).then((data) => {
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
                res.send(data);
            }).catch((err) => {
                res.status(500).send({
                    messagge: err.message || "server error"
                });
            });
        });
    }
    /**
     * This controller is used to delete by id company resource info.
     *
     * @param req
     * @param res
     */
    static companyDeleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("companydeleteByid is called");
            const { id } = req.params;
            models_1.default.companies.destroy({ where: { id } }).then((dl) => {
                if (dl) {
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: `id ${id} was deleted`
                    });
                }
                else {
                    res.status(StatusConstants_1.StatusConstants.code404.code).send({ "status": StatusConstants_1.StatusConstants.code404.message,
                        message: `id ${id} is not there`
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
exports.CompanyController = CompanyController;
