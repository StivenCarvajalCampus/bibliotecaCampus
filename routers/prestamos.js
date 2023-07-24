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

storagePrestamo.get("/prestados", (req,res)=>{
    conex.query(
        'SELECT p.fecha_devolucion, libro.titulo AS libro FROM `prestamo`AS p INNER JOIN libro ON p.id_libro = libro.id_libro WHERE estado = "prestado"',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storagePrestamo;