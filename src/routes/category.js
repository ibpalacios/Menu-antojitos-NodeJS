const Category = require('../model/category-model');
const { Router } = require('express');
const controllerCategory = Router();
//const _ = require('underscore');


controllerCategory.get('/getCategory', (req, res) => {
    Category.find().then(resp => {
        if (resp){
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Datos consultados exitosamente',
                count: resp.length,
                cnt: resp
            });
        }
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al consultar los datos',
            cnt: err
        });
    });
});

controllerCategory.get('/getCategoryById/:id', (req, res) =>{
    let id = req.params.id;

    Category.findById(id).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Registro consultado exitosamente',
            count: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'No se encontro el registro',
            err: err
        });
    });
});

controllerCategory.post('/registerCategory', (req, res) => {
    let categoryParam = req.body;

    let strNombre = wordFormat(categoryParam);
    let categoryObj = new Category({
        strName: strNombre,
        strDescription: categoryParam.strDescription    
    });

    Category.findOne( { 'strName': strNombre } ).then(resp => {
        if (resp){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'La categoria ya ha sido registrada',
                cnt: resp 
            });
        }

        categoryObj.save().then(data => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Categoria registrada exitosamente",
                cont: data.length,
                cnt: data
            });

        }).catch(err =>{
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Error al registrar la categoria',
                err: err
            });
        });

    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error de servidor db",
            err: err
        });
    });
});


controllerCategory.put('/updateCategory/:id', (req, res) => {
    let bodyParm; 
    let categoryObj;
    let id = req.params.id;
    let numParam  = Object.keys(req.body).length;

    if(numParam == 7){
        bodyParm = req.body;
        let strNombre = wordFormat(bodyParm);
        categoryObj = {
            strName: strNombre,
            strDescription: bodyParm.strDescription,
            blnStatus: bodyParm.blnStatus
        }
    }
    if(numParam == 1){
        bodyParm = req.body;
        categoryObj = {
            blnStatus: bodyParm.blnStatus
        }
    }
    if(numParam !== 7 && numParam !== 1){
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar la modalidad',
            err: 'El número de parametros enviados no concuerdan con los que requiere la API'
        });
    } 

    Category.findByIdAndUpdate(id, { $set: categoryObj } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Categoria acutalizada exitosamente",
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar la categoria',
            err: err
        });
    });
});

controllerCategory.delete('/deleteCategory/:id', (req, res) => {
    let id = req.params.id;

    Category.findByIdAndUpdate(id, { blnStatus: false } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente la carrera',
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error al descativar la categoria",
            err: err
        });
    });
});

let wordFormat = (Parameters) => {
    let strNombre = '';
    let name = Parameters.strName.toLowerCase();
    for (let i = 0; i < name.length; i++) {
        name[i] = name[i].charAt(0).toUpperCase() + name[i].substring(1);
        if (i == 0) {
            strNombre += name[i].charAt(0).toUpperCase();
        } else {
            strNombre += name[i];
        }
    }
    return strNombre;
}

module.exports = controllerCategory;