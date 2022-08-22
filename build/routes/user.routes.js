"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authjwt_1 = require("../middlewares/authjwt");
//import {user} from '../controller/user.controller'
module.exports = function (app) {
    app.get("/api/test/all", [authjwt_1.Authjwt.VerifyToken, authjwt_1.Authjwt.isAdmin], (req, res) => {
        res.send("token authentication successfull");
    });
    //app.get("/api/test/admin",[Authjwt.verifyToken, Authjwt.isAdmin], user.AdminBoard);
};
