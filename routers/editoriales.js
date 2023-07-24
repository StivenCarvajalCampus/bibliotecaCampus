import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageEditoriales = Router();
dotenv.config();
let conex = undefined;
storageEditoriales.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageEditoriales.get("/", (req,res)=>{
    conex.query(
        'SELECT e.nombre, e.direccion FROM `editorial`AS e',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageEditoriales;