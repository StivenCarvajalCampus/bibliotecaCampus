import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageLibro = Router();
dotenv.config();
let conex = undefined;
storageLibro.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageLibro.get("/", (req,res)=>{
    conex.query(
        'SELECT l.titulo, autor.nombre AS autor,editorial.nombre AS editorial FROM `libro` AS l INNER JOIN autor ON l.id_autor = autor.id_autor INNER JOIN editorial on l.id_editorial = editorial.id_editorial',
        (err,data,fill)=>{
            res.send(JSON.stringify(data));
        }
    );
})
export default storageLibro;