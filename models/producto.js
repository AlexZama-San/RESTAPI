const {Schema,model} = require('mongoose')

const ProductoSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: [true,'El estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'El usuario es obligatorio']
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true,'La categoria es obligatoria']
    },
    descripcion: {
        type: String,
    },
    disponibilidad: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: String,
        default: 'no-img.jpg'
    }


})

ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...campos}= this.toObject()
    return campos
}

module.exports = model('Producto', ProductoSchema)