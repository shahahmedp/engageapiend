import {Request,Response} from 'express'
import db from '../models';
import {logger} from '../utils/logger'
import {StatusConstants as dailogue} from '../constants/StatusConstants';

export class EmployeeController{

/**
 * This controller is used to store Employee resource info.
 *
 * @param req
 * @param res
 */
    public static async employeePost(req: Request, res: Response){
        logger.info("employeepost is  called")
        db.employee.create({
           ...req.body
        }).then((cmpny: any)=>{
            res.status(dailogue.code200.code).send({
                status:dailogue.code200.message,
                response: cmpny.data
        })
        }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,
                message:err.message||"Some error occured while creating the Tutorial ."
            })
        })
    }
/**
 * This controller is used to update Employee resource info.
 *
 * @param req
 * @param res
 */
    public static async employeePutBYId(req: Request, res: Response){
        logger.info("employeePutBYId is called")
        logger.info
        const {id}=req.params;
        db.employee.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cmp:req.body.cmp.toString(),
            email: req.body.email,
            phone: req.body.phone
        }, { where: { id } }).then((up: any)=>{
            //check id is there or not
            if(up){
                res.status(dailogue.code200.code).send({"status":dailogue.code200.message,
                    message:"employee deatils have been updated successfully"
                })
            }else{
                res.status(dailogue.code404.code).send({"status":dailogue.code404.message,
                    message:`id ${id} is not there`
                })
            }
        }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,
                message: err.message||"server is not working properly"
            })
        })
    }
/**
 * This controller is used to get Employee resource info.
 *
 * @param req
 * @param res
 */
    public static async employeeGet(req: Request, res: Response){
        logger.info("employeeGet api called")
        db.employee.findAll().then((data: any)=>{
            res.status(dailogue.code200.code).send({"status":dailogue.code200.message,"Response":data});
        }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,
                messagge : err.message|| "server error"
            })
        });
    }
/**
 * This controller is used to get by id Employee resource info.
 *
 * @param req
 * @param res
 */
    public static async employeeGetById(req: Request, res: Response){
        logger.info("employeeGetById api called");
        db.employee.findByPk(req.params.id).then((data: any)=>{
            if(data){
                res.status(dailogue.code200.code).send({"status":dailogue.code200.message,
                    message:data
                })
            }else{
                res.status(dailogue.code404.code).send({"status":dailogue.code404.message,
                    message:`id ${req.params.id} is not there`
                })
            }
         }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,
                messagge : err.message|| "server error"
            })
        })    
    }
/**
 * This controller is used to delete by id Employee resource info.
 *
 * @param req
 * @param res
 */
    public static async employeeDeleteById(req: Request, res: Response){
        logger.info("employeDeleteByID was created");
        const {id}=req.params;
        db.employee.destroy({ where: { id } }).then((dl: any)=>{
            if(dl){
                res.status(dailogue.code200.code).send({"status":dailogue.code200.message,
                    message:`id ${req.params.id} was deleted`
                })
            }else{
                res.status(dailogue.code404.code).send({"status":dailogue.code404.message,
                    message:`id ${req.params.id} is not there`
                })
            }
        }).catch((err: { message: any; })=>{
            res.status(dailogue.code500.code).send({"status":dailogue.code500.message,
                message:err.message|| "server error"
            })
        }) 
    }
}