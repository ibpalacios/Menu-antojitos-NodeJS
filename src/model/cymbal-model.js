const { model, Schema } = require('mongoose');
const Category = require('./category-model');

const cymbalSchema = new Schema({
    idCategory:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    strName: {
        type: String,
        unique: true,
        required: [true, 'Ingrese el nombre del platillo']
    },
    strDescription:{
        type: String,
        required: [true, 'Ingrese la descripción']
    },
    strIngredients:{
        type: String,
        required: [true, 'Ingrese los ingredientes']
    },
    nmbPieces:{
        type: Number,
        required: [true, 'Ingrese las piezas']
    },
    nmbPrice:{
        type: Number,
        required: [true, 'Ingrese el precio']
    },
    blnStatus: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

module.exports = model('Cymbal', cymbalSchema);