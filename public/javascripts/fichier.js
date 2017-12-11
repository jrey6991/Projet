    $(function () {
      $('#my-table').hide();
      initListeDeroulante();
      $('#bouton').on('click', function(e) {
        var array = [];
          e.preventDefault();
          var arrondissement = $('#arrondissement').val();
          $.ajax({
            method: "GET",
            dataType: "json",
            url: "/installations?arrondissement=" + arrondissement
          })
          .done(function(data) {
            (data.glissades).forEach(function(glissade) {
                array.push({nom: glissade.nom});
            });
            (data.patinoires).forEach(function(patinoire) {
                array.push({nom: patinoire.nom});
            });
            (data.piscines).forEach(function(piscine) {
                array.push({nom: piscine.NOM});
            });
            var dynatable =  $('#my-table').dynatable({
                dataset: {
                  records:  array
                }, 
                features: {
                  paginate: false,
                  search: false,
                  recordCount: false,
                }
              }).data("dynatable");
                dynatable.settings.dataset.originalRecords =  array;
                dynatable.process();  
                $('#my-table').show();
          })
          .fail(function(error) {
            console.log(error)
          });
      });
    });

    function initListeDeroulante(){
       $.ajax({
            method: "GET",
            dataType: "json",
            url: "/init"
          })
          .done(function(data) {
            var array = [];
            (data.glissades).forEach(function(glissade) {
                array.push({type: "glissade", nom: glissade.nom});
            });
            (data.patinoires).forEach(function(patinoire) {
                array.push({type: "patinoire", nom: patinoire.nom});
            });
            (data.piscines).forEach(function(piscine) {
                array.push({type: "piscine", nom: piscine.NOM});
            });
            array.forEach(function(value) {
              $('#listeDeroulante').append($('<option></option>').val(value.nom).html(value.nom).addClass(value.type));
            });
          })
          .fail(function(error) {
            console.log(error)
          });
    }
    $('#boutonRechercher').on('click', function(e) {
          $('#listeAttributs').val('').html('');
          e.preventDefault();
          var nomInstallation = $('#listeDeroulante :selected').val();
          var typeInstallation = $('#listeDeroulante :selected').attr('class');
          $.ajax({
            method: "GET",
            dataType: "json",
            url: "/installations/recherche?nomInstallation="+nomInstallation+"&typeInstallation=" + typeInstallation
          })
          .done(function(data) {
            $('#listeAttributs').val('').html('');
            if (typeInstallation == "glissade") {
              $('#listeAttributs').append($('<li></li>').val(data.nom).html(data.nom));
              $('#listeAttributs').append($('<li></li>').val(data.nom_arr).html(data.nom_arr))
              $('#listeAttributs').append($('<li></li>').val(data.cle).html(data.cle))
              $('#listeAttributs').append($('<li></li>').val(data.date_maj).html(data.date_maj))
              $('#listeAttributs').append($('<li></li>').val(data.ouvert).html(data.ouvert))
              $('#listeAttributs').append($('<li></li>').val(data.deblaye).html(data.deblaye))
              $('#listeAttributs').append($('<li></li>').val(data.condition).html(data.condition))
            } else if (typeInstallation == "patinoire") {
              $('#listeAttributs').append($('<li></li>').val(data.nom).html(data.nom));
              $('#listeAttributs').append($('<li></li>').val(data.nom_arr).html(data.nom_arr))
              $('#listeAttributs').append($('<li></li>').val(data.cle).html(data.cle))
              $('#listeAttributs').append($('<li></li>').val(data.date_maj).html(data.date_maj))
              $('#listeAttributs').append($('<li></li>').val(data.ouvert).html(data.ouvert))
              $('#listeAttributs').append($('<li></li>').val(data.deblaye).html(data.deblaye))
              $('#listeAttributs').append($('<li></li>').val(data.arrose).html(data.arrose))
              $('#listeAttributs').append($('<li></li>').val(data.resurface).html(data.resurface))
              $('#listeAttributs').append($('<li></li>').val(data.condition).html(data.condition))
            } else if (typeInstallation == "piscine") {
              $('#listeAttributs').append($('<li></li>').val(data.ID_UEV).html(data.ID_UEV));
              $('#listeAttributs').append($('<li></li>').val(data.TYPE).html(data.TYPE))
              $('#listeAttributs').append($('<li></li>').val(data.NOM).html(data.NOM))
              $('#listeAttributs').append($('<li></li>').val(data.ARRONDISSE).html(data.ARRONDISSE))
              $('#listeAttributs').append($('<li></li>').val(data.ADRESSE).html(data.ADRESSE))
              $('#listeAttributs').append($('<li></li>').val(data.PROPRIETE).html(data.PROPRIETE))
              $('#listeAttributs').append($('<li></li>').val(data.GESTION).html(data.GESTION))
              $('#listeAttributs').append($('<li></li>').val(data.POINT_X).html(data.POINT_X))
              $('#listeAttributs').append($('<li></li>').val(data.POINT_Y).html(data.POINT_Y))
              $('#listeAttributs').append($('<li></li>').val(data.EQUIPEME).html(data.EQUIPEME))
              $('#listeAttributs').append($('<li></li>').val(data.LONG).html(data.LONG))
              $('#listeAttributs').append($('<li></li>').val(data.LAT).html(data.LAT))
            }        
          })
          .fail(function(error) {
            console.log("erreur");
            console.log(error)
          });
    });

