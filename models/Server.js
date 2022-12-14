import express from "express";
import cors from "cors";
import router from "../routes/usuarios.js";
import routerAuth from "../routes/auth.js";
import { dbConnection } from "../database/config.js";
import { routerCategories } from "../routes/categorias.js";
import { routerProductos } from "../routes/productos.js";
import { routerBuscar } from "../routes/buscar.js";
import routerUploads from "../routes/uploads.js";
import fileUpload from "express-fileupload";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productoPath = '/api/productos';
        this.buscarPath = '/api/buscar';
        this.uploadsPath = '/api/uploads';
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

        //Para manejar el file upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.authPath, routerAuth);
        this.app.use(this.categoriasPath, routerCategories);
        this.app.use(this.usuariosPath, router);
        this.app.use(this.productoPath, routerProductos);
        this.app.use(this.buscarPath, routerBuscar);
        this.app.use(this.uploadsPath, routerUploads);
    }

    listen(){

        this.app.listen(this.port, () => {
        console.log("servidor corriendo en puerto", this.port);
        });
    }
}

export default Server;