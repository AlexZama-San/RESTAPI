const {Schema,model} = require('mongoose')

const CategoriaSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        unique:true,
    },
    estado : {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio'],
    }
})

CategoriaSchema.methods.toJSON = function(){
    const {__v,_id, ...resto} = this.toObject()
    resto.uid = _id
    console.log(resto.uid)
    return resto
}

module.exports = model('Categoria', CategoriaSchema)