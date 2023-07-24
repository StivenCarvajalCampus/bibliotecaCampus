import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageReserva = Router();
dotenv.config();
let conex = undefined;
storageReserva.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageReserva.get("/", (req,res)=>{
    conex.query(
        'SELECT r.fecha_reserva, r.estado FROM `reserva` AS r',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageReserva;