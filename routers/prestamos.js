import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storagePrestamo = Router();
dotenv.config();
let conex = undefined;
storagePrestamo.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storagePrestamo.get("/", (req,res)=>{
    conex.query(
        'SELECT p.fecha_prestamo,p.fecha_devolucion,p.estado FROM `prestamo` AS p',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storagePrestamo;