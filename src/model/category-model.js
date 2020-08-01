const {model, Schema} = require('mongoose');

const categorySchema = new Schema({
    strName: {
        type: String, 
        required: [true, 'Porfavor ingresa el nombre de la categoria'],
        unique: true
   },
   strDescription: {
    type: String,
    required: [true, 'Ingrese una descripción']
   },
   blnStatus: {
       type: Boolean,
       default: true
   }
},
{
    timestamps:true
});

module.exports = model('Category', categorySchema);