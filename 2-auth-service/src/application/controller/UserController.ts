import { Request, Response } from "express";


const getName=(req:Request,res:Response)=>{
    
    return res.json({name:'hello nithin joji'})
}

export {
  getName
}