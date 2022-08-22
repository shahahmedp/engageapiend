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
exports.VerifySignUp = void 0;
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
class VerifySignUp {
    /**
     * This middleware is used to check duplicate user name or email in db.
     *
     * @param req
     * @param res
     * @param next
     */
    static checkDuplicatUsernameOrEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("check username&email in db");
            yield models_1.default.user.findOne({
                where: { userName: req.body.username }
            }).then((usr) => {
                if (usr) {
                    res.status(StatusConstants_1.StatusConstants.code400.code).send({ "status": StatusConstants_1.StatusConstants.code400.message,
                        message: "Failed Username is already in use!"
                    });
                    return;
                }
                //know it check email in db
                models_1.default.user.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then((user) => {
                    if (user) {
                        res.status(StatusConstants_1.StatusConstants.code400.code).send({ "status": StatusConstants_1.StatusConstants.code400.message,
                            message: "Failed! Email is already in use!"
                        });
                        return;
                    }
                    next();
                });
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, "message": err });
            });
        });
    }
    /**
     * This middleware is used to checkrole existence in db.
     *
     * @param req
     * @param res
     */
    static checkRoleExisted(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("to check roles existeed in db");
            if (req.body.roles.length) {
                yield models_1.default.role.findAll({
                    where: {
                        role: {
                            [sequelize_1.Op.or]: req.body.roles
                        }
                    }
                }).then((rl) => __awaiter(this, void 0, void 0, function* () {
                    if (req.body.roles.length !== rl.length) {
                        res.status(StatusConstants_1.StatusConstants.code400.code).send({ "status": StatusConstants_1.StatusConstants.code400.message, "message": `the roles ${req.body.roles} are not valid please enter valid roles` });
                    }
                    else {
                        next();
                    }
                })).catch((err) => {
                    res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, "message": err });
                });
            }
            else {
                next();
            }
        });
    }
}
exports.VerifySignUp = VerifySignUp;
