import dotenv from 'dotenv';
import express from 'express';
import storageAutores from './routers/autores.js'
import storageCategoria from './routers/categoria.js';
import storageEditoriales from './routers/editoriales.js';
import storageEstadolibro from './routers/estadolibro.js';
dotenv.config();
const appExpress = express();
const config = JSON.parse(process.env.MY_CONFIG);
appExpress.use(express.json());
appExpress.use("/autores",storageAutores);
appExpress.use("/categoria",storageCategoria);
appExpress.use("/editoriales",storageEditoriales);
appExpress.use("/estadolibro",storageEstadolibro);
appExpress.listen(config, ()=>console.log(`Hola mundo, http://${config.hostname}:${config.port}`));
