const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonajeSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    especie: {
      type: String,
      required: true,
      enum: ['Humano', 'Ewok', 'Genosianos','Gorax','Jawa']
    },
    planeta_procedencia: {
      type: String,
      required: true,
    },
    pertenece: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    login_count: Number
}, {
    timestamps: false
});

module.exports = mongoose.model("personaje", PersonajeSchema);


