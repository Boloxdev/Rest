import Categoria from "../models/Categoria.js";


const obtenerCategorias = async(req, res) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
   

    const [total, categorias]= await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    });
} 

//obtenerCategoria - populate {regresa objeto categoria}
const obtenerCategoria = async(req,res) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria);
}




const crearCategoria = async(req, res) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} no existe`
        });
    }
    //generar los datos
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}

const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria);

}


//borrar categoria- solo cambiar el estado
const borrarCategoria = async(req, res) => {
    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json({
        categoriaBorrada
    })
}

export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}