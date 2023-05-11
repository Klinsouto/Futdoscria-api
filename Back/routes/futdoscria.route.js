const express = require('express');
const app = express();
const futdoscriaRoutes = express.Router();

let Futdoscria = require('../model/Futdoscria');

// api to add futdoscria
futdoscriaRoutes.route('/add').post(function (req, res) {
  let futdoscria = new Futdoscria(req.body);
  futdoscria.save()
  .then(futdoscria => {
    res.status(200).json({'status': 'success','mssg': 'futdoscria added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get futdoscrias
futdoscriaRoutes.route('/').get(function (req, res) {
  Futdoscria.find(function (err, futdoscrias){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','futdoscrias': futdoscrias});
    }
  });
});

// api to get futdoscria
futdoscriaRoutes.route('/futdoscria/:id').get(function (req, res) {
  let id = req.params.id;
  Futdoscria.findById(id, function (err, futdoscria){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','futdoscria': futdoscria});
    }
  });
});

// api to update route
futdoscriaRoutes.route('/update/:id').put(function (req, res) {
    Futdoscria.findById(req.params.id, function(err, futdoscria) {
    if (!futdoscria){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        futdoscria.id = req.body.id;
        futdoscria.pais = req.body.pais;
        futdoscria.liga = req.body.liga;
        futdoscria.time = req.body.time;
        futdoscria.titulos = req.body.titulos;

        futdoscria.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
futdoscriaRoutes.route('/delete/:id').delete(function (req, res) {
  Futdoscria.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = futdoscriaRoutes;