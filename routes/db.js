   
    var mongo = require("mongodb");
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://<jrey6991>:<Joyrey6991>@ds135926.mlab.com:35926/activites';
    var ObjectID = require('mongodb').ObjectID;
    var concat = require('array-concat');
    var sortBy = require('sort-by');

    /* Envoyer des données à la base de donnée */
    function sendToDatabase(list, variable) {
      var server = new mongo.Server("localhost", 27017);
      var db = new mongo.Db("activites", server, {safe:true});
      db.open(function (err, db) {
        if (err) {
          console.log("Impossible d'ouvrir une connexion sur la base de données.", err);
        } else {
          db.collection(variable, function (err, collection) {
            if (err) {
              console.log("Erreur avec la base de données.", err);
              db.close();
            } else {
              db.collection(variable).drop(function(err, delOK) {
                if (err) console.log("err");
                if (delOK) console.log("Collection");
                 db.close();
                });   
              collection.insert(list, function (err, result) {
                if (err) {
                  console.log("Erreur lors de l'insertion.", err);
                }
                db.close();        
            });
          }
        });
      }
    });
  }
    /* Récupérer les glissades par arrondissement dans la base de donnée*/
    function getGlissadesByArrondissement(nameArrondissement, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find({nom_arr: nameArrondissement}).toArray((err, glissou) => {
          callback(glissou);
          db.close();
        });
      });
    }

    /* Récupérer les patinoires par arrondissement dans la base de donnée */
    function getPatinoiresByArrondissement(nameArrondissement, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("patinoires").find({nom_arr: nameArrondissement}).toArray((err, patine) => {
          callback(patine);
          db.close();
        });
      });
    }

    /* Récupérer les piscines par arrondissement dans la base de donnée*/
    function getPiscinesByArrondissement(nameArrondissement, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("piscines").find({ARRONDISSE: nameArrondissement}).toArray((err, piscine) => {
          callback(piscine);
          db.close();
        });
      });
    }

    /* Récupérer toutes les glissades dans la base de donnée*/
    function getGlissades( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find().toArray((err, glissou) => {
          callback(glissou);
          db.close();
        });
      });
    }

    /* Récupérer toutes les patinoires dans la base de donnée */
    function getPatinoires( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("patinoires").find().toArray((err, patine) => {
          callback(patine);
          db.close();
        });
      });
    }

    /* Récupérer toutes les piscines dans la base de donnée */
    function getPiscines( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("piscines").find().toArray((err, piscine) => {
          callback(piscine);
          db.close();
        });
      });
    }

    /* Récupérer la glissade par nom dans la base de donnée*/
   function getGlissadesByNom(nomInstallation, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find({nom: nomInstallation}).toArray((err, glissou) => {
          callback(glissou);
          db.close();
        }); 
      });
    }

    /* Récupérer la patinoire par nom dans la base de donnée*/
    function getPatinoiresByNom(nomInstallation, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("patinoires").find({nom: nomInstallation}).toArray((err, patine) => {
          callback(patine);
          db.close();
        }); 
      });
    }

    /* Récupérer la piscine par nom dans la base de donnée */
    function getPiscinesByNom(nomInstallation, callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("piscines").find({NOM: nomInstallation}).toArray((err, piscine) => {
          callback(piscine);
          db.close();
        });     
      });
    }

    /* Récupérer les installations ayant une mauvaise condition de la base de donnée */
    function getInstallationsByCondition( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find({condition: 'Mauvaise'},{_id: false}).toArray((err, glissou) => {
          db.collection("patinoires").find({condition: 'Mauvaise'},{_id: false}).toArray((err, patine) => {
            var array_total = concat(patine, glissou);
            array_total.sort(sortBy('nom'));
            var json_retour = {"Mauvaise":array_total };
            callback({"Mauvaise":array_total });
            db.close();
          });    
        }); 
      });
    }

    /* Récupérer les installations ayant une mauvaise condition de la base de donnée en format xml*/
    function getInstallationsByConditionXml( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find({condition: 'Mauvaise'},{_id: false}).toArray((err, glissou) => {
          db.collection("patinoires").find({condition: 'Mauvaise'},{_id: false}).toArray((err, patine) => {
            var array_total = concat(patine, glissou);
            array_total.sort(sortBy('nom'));
            var json_retour = {"Mauvaise":array_total };   
            callback(json_retour);
            db.close();
          });    
        }); 
      });
    }

    /* Récupérer les installations ayant une mauvaise condition de la base de donnée en format csv */
    function getInstallationsByConditionCsv( callback) {
      MongoClient.connect(url, function(error, db) {
        db.collection("glissades").find({condition: 'Mauvaise'}).toArray((err, glissou) => {
          db.collection("patinoires").find({condition: 'Mauvaise'}).toArray((err, patine) => {
            var array_total = concat(patine, glissou);
            array_total.sort(sortBy('nom'));
            var json_retour = {"Mauvaise":array_total };
            callback(json_retour );
            db.close();
          });    
        }); 
      });
    }

    /* Modifier une glissade dans la base de donnée */
    function updateGlissade(req, callback){
      var id = new ObjectID(req.body.id);
      MongoClient.connect(url, function (err, db) {
        if (err) {
              callback({error : "Une erreur a été rencontrée lors de la connexion avec la base de données."});
          } else { 
              db.collection('glissades').update({_id:id}, {$set:{nom: req.body.nom, nom_arr: req.body.nom_arr, cle: req.body.cle, date_maj: req.body.date_maj, ouvert: req.body.ouvert, deblaye: req.body.deblaye, condition: req.body.condition}},function(err, result) {
                if (err) {
                  callback({erreur: "Une erreur a été rencontrée lors de la modification de la glissade."});
                } else if (result.result.n === 0) {
                  callback({erreur:"L'id de la glissade est invalide."});
                } else {
                  callback({resultat :"La glissade a été modifié avec succès."});
                }
              });
          }
      });
    }

    /* Supprimer une glissade dans la base de donnée */
    function deleteGlissade(req, callback){
      var id = new ObjectID(req.body.id);
      MongoClient.connect(url, function (err, db) {  
        if (err) {
              callback({error : "Une erreur a été rencontrée lors de la connexion avec la base de données."});
          } else { 
              db.collection("glissades").remove({_id:id},function(err, result) {
                if (err) {
                  callback({erreur: "Une erreur a été rencontrée lors de la modification de la glissade."});
                } else if (result.result.n === 0) {
                  callback({erreur:"L'id de la glissade est invalide."});
                } else {
                  callback({resultat :"La glissade a été supprimer avec succès."});
                }
            }); 
          }
      });
    }

  module.exports = {
    sendToDatabase: sendToDatabase,
    getGlissadesByArrondissement: getGlissadesByArrondissement,
    getPatinoiresByArrondissement : getPatinoiresByArrondissement,
    getPiscinesByArrondissement : getPiscinesByArrondissement,
    getGlissades : getGlissades,
    getPatinoires : getPatinoires,
    getPiscines : getPiscines,
    getGlissadesByNom : getGlissadesByNom,
    getPatinoiresByNom : getPatinoiresByNom,
    getPiscinesByNom : getPiscinesByNom,
    updateGlissade : updateGlissade,
    deleteGlissade : deleteGlissade,
    getInstallationsByCondition : getInstallationsByCondition,
    getInstallationsByConditionXml : getInstallationsByConditionXml,
    getInstallationsByConditionCsv : getInstallationsByConditionCsv
  }

