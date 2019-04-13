const Multer = require('multer');
const path = require('path');


const storage = Multer.diskStorage({
       destination: (req, file, callback)=>{
              callback(null, 'server/public/uploads')
       },
       filename:(req, file, callback) => {

              const filetypes = new RegExp(/(\.jpg|\.png)$/);
              const extname = filetypes.test(file.originalname.toLocaleLowerCase());

              if(extname){
                     return callback(null, file.originalname.toLocaleLowerCase())
              }

              callback('Error: el archivo no es valido')
       }
});


module.exports = Multer({storage});