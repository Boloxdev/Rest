import mongoose, { Schema, model } from "mongoose";


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

});

const Rol = mongoose.model('Role', RoleSchema);
export default Rol;
