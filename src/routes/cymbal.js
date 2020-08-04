const Cymbal = require('../model/cymbal-model');
const { Router } = require('express');
const controllerCymbal = Router();


controllerCymbal.get('/getCymbal', (req, res) => {
    Cymbal.find().then(resp => {
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

controllerCymbal.get('/getCymbalById/:id', (req, res) =>{
    let id = req.params.id;

    Cymbal.findById(id).then(resp => {
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

controllerCymbal.get('/getAllCymbalWhereId/:idCategory', (req, res) => {
    let id = req.params.idCategory;

    Cymbal.find( { idCategory:id } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Registros consultado exitosamente',
            count: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'No se encontraron registros',
            err: err
        });
    });
});

controllerCymbal.post('/registerCymbal', (req, res) => {
    let cymbalParam = req.body;

    let strNombre = wordFormat(cymbalParam);
    let cymbalObj = new Cymbal({
        idCategory: cymbalParam.idCategory,
        strName: strNombre,
        strDescription: cymbalParam.strDescription,
        strIngredients: cymbalParam.strIngredients,
        nmbPieces: cymbalParam.nmbPieces,
        nmbPrice: cymbalParam.nmbPrice   
    });

    Cymbal.findOne( { 'strName': strNombre } ).then(resp => {
        if (resp){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'El platillo ya ha sido registrado',
                cnt: resp 
            });
        }

        cymbalObj.save().then(data => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Platillo registrado exitosamente",
                cont: data.length,
                cnt: data
            });

        }).catch(err =>{
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Error al registrar el platillo',
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

controllerCymbal.put('/updateCymbal/:id', (req, res) => {
    let bodyParm; 
    let cymbalObj;
    let id = req.params.id;
    let numParam  = Object.keys(req.body).length;
    
    if(numParam == 11){
        bodyParm = req.body;
        let strNombre = wordFormat(bodyParm);
        cymbalObj = {
            idCategory: bodyParm.idCategory,
            strName: strNombre,
            strDescription: bodyParm.strDescription,
            strIngredients: bodyParm.strIngredients,
            nmbPieces: bodyParm.nmbPieces,
            nmbPrice: bodyParm.nmbPrice,
            blnStatus: bodyParm.blnStatus
        }
    }
    if(numParam == 1){
        bodyParm = req.body;
        cymbalObj = {
            blnStatus: bodyParm.blnStatus
        }
    }
    if(numParam !== 11 && numParam !== 1){
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar el platillo',
            err: 'El número de parametros enviados no concuerdan con los que requiere la API'
        });
    } 

    Cymbal.findByIdAndUpdate(id, { $set: cymbalObj } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Platillo acutalizada exitosamente",
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar el platillo',
            err: err
        });
    });
});

controllerCymbal.delete('/deleteCymbal/:id', (req, res) => {
    let id = req.params.id;

    Cymbal.findByIdAndUpdate(id, { blnStatus: false } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente el platillo',
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error al descativar el platillo",
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


module.exports = controllerCymbal;