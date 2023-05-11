const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Futdoscria = new Schema({
  id: {
    type: Number
  },
  pais: {
    type: String
  },
  liga: {
    type: String
  },
  time: {
    type: String
  },
  titulos: {
    type: Number
  }
}, {
  collection: 'futdoscria'
});

module.exports = mongoose.model('Futdoscria', Futdoscria);