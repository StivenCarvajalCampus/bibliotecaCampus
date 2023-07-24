import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Autores } from './../controllerDTO/autores.js';
import { validate } from 'class-validator';
const proxyAutores = async(req,res,next)=>{
    try {
 
        const newautores = new Autores();
        Object.assign(newautores, req.query);
        try {
            const validationErrors = await validate(newautores);
            let data = plainToClass(Autores,req.query,{excludeExtraneousValues:true});
            req.query = data;
            next();
        } catch (error) {
            res.status(error.status).send(error);
        }
    
       
    } catch (error) {
    }
    }
export default proxyAutores;