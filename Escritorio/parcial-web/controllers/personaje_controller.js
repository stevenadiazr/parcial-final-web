var Personaje = require('../models/personaje');
var debug = require('debug')('parcial-web:personaje_controller');


// Search a one user y database
module.exports.getOne = (req, res, next) => {
    debug("Search User", req.params);
    Personaje.findOne({
            nombre: req.params.nombre
        }, "-nombre -actor")
        .then((foundPersonaje) => {
            debug("Found Personaje", foundPersonaje);
            if (foundPersonaje)
                return res.status(200).json(foundPersonaje);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Personaje List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    User.find({}, "-nombre -actor")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((personajes) => {
            debug("Found Personaje", personajes);
            return res.status(200).json(personajes)
        }).catch(err => {
            next(err);
        });

}

// New personaje

module.exports.register = (req, res, next) => {
    debug("New Personaje", {
        body: req.body
    });
    User.findOne({
            nombre: req.body.nombre
        }, "-nombre -actor")
        .then((foundPersonaje) => {
            if (foundPersonaje) {
                debug("Personaje existente");
                throw new Error(`Personaje existente ${req.body.nombre}`);
            } else {
                let newPersonaje = new Personaje({
                    nombre: req.body.nombre,
                    especie: req.body.especie || "",
                    planeta_procedencia: req.body.planeta_procedencia || "",
                    pertenece: req.body.pertenece,
                    actor: req.body.actor
                });
                return newUser.save();
            }
        }).then(user => {
            return res
                .header('Location', '/personajes/' + personaje.nombre)
                .status(201)
                .json({
                    nombre: personaje.nombre
                });
        }).catch(err => {
            next(err);
        });
}


// Update personaje 

module.exports.update = (req, res, next) => {
    debug("Update personaje", {
        username: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
            nombre: req.params.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete personaje", {
        nombre: req.params.nombre,
    });

    User.findOneAndDelete({nombre: req.params.nombre})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}

