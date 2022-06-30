const {Schema,model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es necesario']
        
    },
    correo:{
        type: String,
        required: [true,'El correo es necesario'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'El password es necesario']
    },
    avatar:{
        type: String,
    },
    role:{
        type: String,
        required: true,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

module.exports = model('Usuario',usuarioSchema);