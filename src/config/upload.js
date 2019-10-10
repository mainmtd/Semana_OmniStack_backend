const multer = require('multer');
const path = require('path')

//path.resolve serve para converter os caminhos de diretório para um formato
//compreensível pelo windows
module.exports = {    
    storage: multer.diskStorage({
        destination: path.resolve(__dirname,'..', '..','uploads'),
        filename: (req, file, cb) => {
            //construção do nome do arquivo
            //path.extname pega a extensão do arquivo
            //path.basename pega o nome do arquivo sem extensão
            //file.originalname pega o nome do arquivo completo
            //no path.basename, o segundo parametro é o que ele deve remover do nome, no caso a extensão
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    }),
}