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
exports.Authjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
const User = models_1.default.user;
class Authjwt {
    /**
     * This middleware is used to verify the token.
     *
     * @param req
     * @param res
     * @param next
     */
    static VerifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("verify token method called ");
            let token = req.headers["x-access-token"];
            //check token in request
            if (!token) {
                return res.status(StatusConstants_1.StatusConstants.code403.code).send({ "status": StatusConstants_1.StatusConstants.code403.message,
                    message: "no token provided!"
                });
            }
            //verify token
            jsonwebtoken_1.default.verify(token.toString(), auth_config_1.secretKey.secret, (err, decoded) => {
                if (err) {
                    return res.status(StatusConstants_1.StatusConstants.code401.code).send({ "status": StatusConstants_1.StatusConstants.code401.message,
                        message: "Unauthorized"
                    });
                }
                else {
                    req.body.userId = decoded;
                    next();
                }
            });
        });
    }
    /**
     * This middleware is used to check Admin previlage.
     *
     * @param req
     * @param res
     * @param next
     */
    static isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("isadmin middleare was called to check previlage");
            models_1.default.user.findAll({
                where: { id: req.body.userId.id },
                include: models_1.default.role
            }).then((isad) => {
                //compare role from db to roles given by user
                for (let i = 0; i < isad[0].roles.length; i++) {
                    if (isad[0].roles[i].role == "Admin") {
                        next();
                        return;
                    }
                }
                res.status(StatusConstants_1.StatusConstants.code403.code).send({ "status": StatusConstants_1.StatusConstants.code403.message, "message": "your dont have admin previlages" });
                return;
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, "message": err });
            });
        });
    }
    /**
     * This middleware is used to check company previlage.
     *
     * @param req
     * @param res
     * @param next
     */
    static isCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("isCompany middleare was called to check previlage");
            models_1.default.user.findAll({
                where: { id: req.body.userId.id },
                include: models_1.default.role
            }).then((isad) => {
                //check roles from db to request
                for (let i = 0; i < isad[0].roles.length; i++) {
                    if (isad[0].roles[i].role == "Company") {
                        next();
                        return;
                    }
                }
                res.status(StatusConstants_1.StatusConstants.code403.code).send({ "status": StatusConstants_1.StatusConstants.code403.message, "message": "your dont have Company previlages" });
                return;
            }).catch((err) => {
                res.status(500).send(err);
            });
        });
    }
    /**
     * This middleware is used to chcek user previlage.
     *
     * @param req
     * @param res
     * @param next
     */
    static isEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("isEmployee middleare was called to check previlage");
            models_1.default.user.findAll({
                where: { id: req.body.userId.id },
                include: models_1.default.role
            }).then((isad) => {
                //compare db and request roles
                for (let i = 0; i < isad[0].roles.length; i++) {
                    if (isad[0].roles[i].role == "user") {
                        next();
                        return;
                    }
                }
                res.status(StatusConstants_1.StatusConstants.code403.code).send({ "status": StatusConstants_1.StatusConstants.code403.message, "message": "your dont have user previlages" });
                return;
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, "message": err });
            });
        });
    }
}
exports.Authjwt = Authjwt;
