    var express = require('express');
    var router = express.Router();
    var db = require('./db.js');
    var mongo = require("mongodb");
    var express = require('express');
    var request = require('request');
    var jsonschema = require('jsonschema');
    var schemas = require('./schemas'); 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var csv = require('csvtojson');
    var cron = require('node-cron');
    var router = express.Router();
    var raml2html = require('raml2html');
    var path = require('path');
    var jsonConcat = require("json-concat");
    var js2xmlparser = require("js2xmlparser");
    var xml = require('xml');
    var o2x = require('object-to-xml');
    var json2csv = require('json2csv');

  /* Documentation du projet */
  router.get('/doc', function(req, res) {
    var config = raml2html.getDefaultConfig(false);
    var onError = function (err) {
      console.log(err);
      res.sendStatus(500);
    };
    var onSuccess = function(html) {
      res.send(html);
    };
    raml2html.render('routes/doc/index.raml', config).then(onSuccess, onError);
  });

  /* Liste des installations selon l'arrondissement spécifier */
  router.get('/installations', function(req, res){
    var arrondissement = req.query.arrondissement;
    db.getGlissadesByArrondissement(arrondissement, function(listeGlissades) {
      db.getPatinoiresByArrondissement(arrondissement, function(listePatinoires) {
        db.getPiscinesByArrondissement(arrondissement, function(listePiscines) {
          var obj = {
            glissades : listeGlissades,
            patinoires : listePatinoires,
            piscines : listePiscines 
          };
          res.send(obj);
        })
      })
    })
  });

  /* Liste de toutes les installations */
  router.get('/init', function(req, res){
   db.getGlissades( function(listeGlissades) {
      db.getPatinoires( function(listePatinoires) {
        db.getPiscines( function(listePiscines) {
          var obj = {
            glissades : listeGlissades,
            patinoires : listePatinoires,
            piscines : listePiscines 
          };
          res.send(obj);
        })
      })
    })  
  });

  /* Détails de l'installation dont le nom est spécifier */
  router.get('/installations/recherche', function(req, res){
    var nomInstallation = req.query.nomInstallation;
    var typeInstallation = req.query.typeInstallation;
    if (typeInstallation == 'glissade') {
      db.getGlissadesByNom(nomInstallation, function(glissade){
        res.send(glissade[0]);
      })
    } else if (typeInstallation == 'patinoire') {
      db.getPatinoiresByNom(nomInstallation, function(patinoire){
        res.send(patinoire[0]);
      })
    } else if (typeInstallation == 'piscine'){
      db.getPiscinesByNom(nomInstallation, function(piscine){
        console.log(piscine[0]);
        res.send(piscine[0]);
      })
    }
  });

  /* Modifier une glissade */
  router.patch('/installations/modifier', function(req, res){
    var result = jsonschema.validate(req.body, schemas.updateGlissade)
    var idInstallation = req.body.id;
    db.updateGlissade(req, function(message) {
      res.status(200).json(message);
    });
  });

  /* Supprimer une glissade */
  router.delete('/installations/supprimer', function(req, res){
    db.deleteGlissade(req, function(message) {
      res.status(200).json(message);
    });
  });

  /* Liste des installations en mauvaise condition */
  router.get('/installations/mauvaiseCondition', function(req, res){
    db.getInstallationsByCondition( function(listeInstallations) {
        res.status(200).json(listeInstallations);
      })
  });

  /* Liste des installations en mauvaise condition en format xml */
  router.get('/installations/mauvaiseCondition/xml', function(req, res){
    db.getInstallationsByConditionXml( function(listeInstallationsXml) {
      res.set('Content-Type', 'application/xml');
      var xml = o2x({'?xml version = "1.0" encoding="utf-8"?':null, listeInstallationsXml});
        res.status(200).send(xml);
      }) 
  });

  /* Liste des installations en mauvaise condition en format csv */
  router.get('/installations/mauvaiseCondition/csv', function(req, res){
    db.getInstallationsByConditionCsv( function(listeInstallationsCsv) {
      console.log(listeInstallationsCsv);
      var fields = ['nom', 'nom_arr', 'cle', 'date_maj', 'ouvert', 'deblaye', 'condition'];       
        res.setHeader('Content-Type', 'text/csv');
        var csv = json2csv({ data: listeInstallationsCsv.Mauvaise, fields: fields });
        res.status(200).send(csv);
      })
  });
      //cron.schedule(' 0 0 * * *', function(){
    //  console.log('running a task every minute');
    
    /* Récupérer les données des patinoires en xml, les transformées en json puis les mettre dans la base de donnée */
      request.get('http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml', function (err, response) {
        if (err) {
          console.log("err");
        } else {
          var data = response.body;
          parser.parseString(data, function(err, result){
            var patinoires = [];
            var resPatinoires = result.patinoires.patinoire;
            resPatinoires.forEach((patine) => {
              patinoires.push({
                nom: patine.nom[0],
                nom_arr: patine.arrondissement[0].nom_arr[0],
                cle: patine.arrondissement[0].cle[0],
                date_maj: patine.arrondissement[0].date_maj[0],
                ouvert: patine.ouvert[0],
                deblaye: patine.deblaye[0],
                arrose: patine.arrose[0],
                resurface: patine.resurface[0],
                condition: patine.condition[0]
              });
            });
            db.sendToDatabase(patinoires, "patinoires");
          });
        }
      });

      /* Récupérer les données des glissades en xml, les transformées en json puis les mettre dans la base de donnée */
      request.get('http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml', function (err, response) {
        if (err) {
          console.log("err de");
        } else {
          var data = response.body;
          parser.parseString(data, function(err, result){
            var glissades = [];
            var resGlissades = result.glissades.glissade;
            resGlissades.forEach((glissou) => {
              glissades.push({
                nom: glissou.nom[0],
                nom_arr: glissou.arrondissement[0].nom_arr[0],
                cle: glissou.arrondissement[0].cle[0],
                date_maj: glissou.arrondissement[0].date_maj[0],
                ouvert: glissou.ouvert[0],
                deblaye: glissou.deblaye[0],
                condition: glissou.condition[0]
              });
            });
            db.sendToDatabase(glissades, "glissades");
          });
        }
      });

      /* Récupérer les données des piscines en csv, les transformées en json puis les mettre dans la base de donnée */
      request.get("http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv", function (err, response) {
        if (err) {
          console.log("err de");
        } else {
          var data = response.body;
        csv()
        .fromString(data)
        .on("end_parsed",function(result){
            db.sendToDatabase(result, "piscines");
          });
        }
      });
  //});

    
  module.exports = router;
