import { body } from "express-validator";
import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

const obtenerProductos = async(req, res)=> {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })
}

const crearProducto = async(req, res) => {
    const {nombre, estado, usuario, precio, categoria, descripcion, disponible} = req.body;
    const nombreProducto = nombre.toUpperCase();
    const categoriaNombre = req.body.categoria.toUpperCase();
    const categoriaDB = await Categoria.findOne({categoriaNombre});
    const productoDB = await Producto.findOne({nombre : nombreProducto});
    
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} no existe`
        });
    }
    
    const data = {
        nombre: nombreProducto,
        usuario: req.usuario._id,
        categoria: categoriaDB._id,
        precio,
        descripcion,
        disponible
    }

    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
}

const obtenerProductoPorId = async(req,res)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre');
                                    
    
    res.json(producto);
}

const actualizarProducto = async(req, res) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    
    res.json(producto);

}

const borrarProducto = async(req, res) => {
    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});
    res.json({
        productoBorrado
    })
}

export{
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}

