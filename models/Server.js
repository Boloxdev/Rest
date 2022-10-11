import express from "express";
import cors from "cors";
import router from "../routes/usuarios.js";
import { dbConnection } from "../database/config.js";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a BBDD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Routes 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use (cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, router);
    }

    listen(){

        this.app.listen(this.port, () => {
        console.log("servidor corriendo en puerto", this.port);
        });
    }
}

export default Server;