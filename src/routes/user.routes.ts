import {Request,Response} from 'express'
import {Authjwt} from '../middlewares/authjwt'
//import {user} from '../controller/user.controller'

module.exports = function(app: any){
    app.get("/api/test/all", [Authjwt.VerifyToken,Authjwt.isAdmin],(req:Request, res:Response)=>{
        res.send("token authentication successfull");
    });
    //app.get("/api/test/admin",[Authjwt.verifyToken, Authjwt.isAdmin], user.AdminBoard);
}