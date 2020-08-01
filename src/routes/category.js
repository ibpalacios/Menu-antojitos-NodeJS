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
    let id = req.params.id;
    let bodyParm = req.body;
    // let numParam  = Object.keys(req.body).length;
    //TO-DO: Cundo ha la integracion verifcar cuantos parametros recibe la api
    //       para validar la actualizacion de el blnStatus.
    

    //let strNombre = wordFormat(bodyParm);

    Category.findOne( { 'strName': bodyParm.strName } ).then(resp => {
        if (resp){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'No se puede registrar la categoria porque ya exite',
                cnt: resp 
            });
        }

        let categoryObj = {
            strName: strNombre,
            strDescription: bodyParm.strDescription
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
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error al buscar la categoria",
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