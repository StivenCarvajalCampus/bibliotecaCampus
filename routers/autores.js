import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageAutores = Router();
dotenv.config();
let conex = undefined;
storageAutores.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageAutores.get("/", (req,res)=>{
    conex.query(
        'SELECT a.nombre, a.apellido, a.nacionalidad FROM `autor` AS a',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageAutores;