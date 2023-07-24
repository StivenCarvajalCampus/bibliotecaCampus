import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageUsuario = Router();
dotenv.config();
let conex = undefined;
storageUsuario.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageUsuario.get("/", (req,res)=>{
    conex.query(
        'SELECT u.nombre,u.apellido, u.email FROM `usuario`AS u',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})

export default storageUsuario;