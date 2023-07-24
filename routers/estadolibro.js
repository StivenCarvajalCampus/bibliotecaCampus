import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageEstadolibro = Router();
dotenv.config();
let conex = undefined;
storageEstadolibro.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageEstadolibro.get("/", (req,res)=>{
    conex.query(
        'SELECT es.nombre, es.descripcion FROM `estado_libro` AS es',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageEstadolibro;