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
exports.VerifyCompany = void 0;
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
class VerifyCompany {
    /**
 * This middleware is used to check duplicate user name or email in db.
 *
 * @param req
 * @param res,
 * @param next
 */
    static checkDuplicatCMPNameCMPemail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("checkDuplicatCMPNameCMPemail is called ");
            yield models_1.default.companies.findOne({
                where: { name: req.body.name }
            }).then((usr) => {
                if (usr) {
                    res.status(StatusConstants_1.StatusConstants.code400.code).send({ "status": StatusConstants_1.StatusConstants.code400.message,
                        message: "Failed Username is already in use!"
                    });
                    return;
                }
                //then we are checking email existence
                models_1.default.companies.findOne({
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
}
exports.VerifyCompany = VerifyCompany;
