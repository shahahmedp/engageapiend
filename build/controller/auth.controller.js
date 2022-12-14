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
exports.Auth = void 0;
const models_1 = __importDefault(require("../models"));
const logger_1 = require("../utils/logger");
const StatusConstants_1 = require("../constants/StatusConstants");
const auth_config_1 = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
class Auth {
    /**
 * This controller is used to do Register user.
 *
 * @param req
 * @param res
 */
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("SignUP Controller as reached");
            yield models_1.default.user.create({
                userName: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            }).then((user) => __awaiter(this, void 0, void 0, function* () {
                //check role array is empty or not 
                if (req.body.roles.length) {
                    yield req.body.roles.map((obj) => {
                        models_1.default.role.findOne({ where: {
                                role: obj
                            } }).then((rl) => {
                            //store role of user in association
                            models_1.default.userrole.create({
                                roleId: rl.id,
                                userId: user.id
                            });
                        });
                    });
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                        message: `User ${req.body.username} was registered successfully` });
                }
                else {
                    //if empty then register with user previlage 
                    yield models_1.default.userrole.create({
                        roleId: 3,
                        userId: user.id
                    });
                    res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message, message: `User ${req.body.username} was registered successfully` });
                }
            })).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, message: err.message });
            });
        });
    }
    /**
 * This controller is used to do Authenticate user.
 *
 * @param req
 * @param res
 */
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info("signIN controller reached");
            yield models_1.default.user.findOne({
                where: { userName: req.body.username }
            }).then((user) => {
                if (!user) {
                    res.status(StatusConstants_1.StatusConstants.code404.code).send({ "status": StatusConstants_1.StatusConstants.code404.message, message: "User Not found ." });
                }
                //comparing password
                var passwordIsValid = bcrypt.compareSync(req.body.password, user === null || user === void 0 ? void 0 : user.password);
                //if not password is same 
                if (!passwordIsValid) {
                    res.status(401).send({
                        accessToken: null,
                        message: "invalid password!"
                    });
                }
                //generating jwt token to send response
                var token = jwt.sign({ id: user === null || user === void 0 ? void 0 : user.id }, auth_config_1.secretKey.secret, {
                    expiresIn: auth_config_1.secretKey.expiresIn // 24 hours
                });
                res.status(StatusConstants_1.StatusConstants.code200.code).send({ "status": StatusConstants_1.StatusConstants.code200.message,
                    id: user === null || user === void 0 ? void 0 : user.id,
                    username: user === null || user === void 0 ? void 0 : user.userName,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    accessToken: token });
            }).catch((err) => {
                res.status(StatusConstants_1.StatusConstants.code500.code).send({ "status": StatusConstants_1.StatusConstants.code500.message, message: err.message });
            });
        });
    }
}
exports.Auth = Auth;
