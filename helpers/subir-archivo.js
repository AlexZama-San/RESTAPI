const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'], carpeta = '') => {

    return new Promise ((resolve, reject) => {

        const {archivo} = files
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        
        //validar extensiones
    if(!extensionesValidas.includes(extension)){
        return reject(`la extension ${extension} no es valida, las extensiones validas son ${extensionesValidas.join(', ')}`);
    }
  
    const nombreTemp = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
    archivo.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        }
        
        resolve(nombreTemp);
    });
})
    
}

module.exports = {
    subirArchivo
}