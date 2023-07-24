import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageCategoria = Router();
dotenv.config();
let conex = undefined;
storageCategoria.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageCategoria.get("/", (req,res)=>{
    conex.query(
        'SELECT c.nombre FROM `categoria` AS c',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageCategoria;