(function ($) {
  "use strict";
  var fn = {

      // Funcionalidades
      Iniciar: function () {
          fn.Config();
          fn.App();
      },
      Config : function () {
        
        function getLocation() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else {
              alert("Geolocation não suportada.");
          }
        }
        function showPosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var localizacao = [lat,lng];
                        
            var geo = $("#geocomplete").geocomplete({
              map: ".map_canvas",
              mapOptions: {
                zoom: 16
              },
              // markerOptions: {
              // //     icon: "http://simpleicon.com/wp-content/uploads/map-marker-13.png",
              // },
              bounds: true,  
              location: localizacao,
              details: "form",
              types: ["establishment"]
            });
            //$("#geocomplete").geocomplete("find", "Belém, Pará, Brasil"); 
            $("#find").click(function(){
              geo.trigger("establishment");
            });
            geo
            .geocomplete()
            .bind("geocode:result", function(event, result){
              console.log(result);
              //alert(result.name);
              var tipos = result.types;
              var padaria = false;
              tipos.forEach(function(key) {
                console.log(key);
                  if (key==="bakery") {
                    padaria = true;
                  }
              });
              if (!padaria) {
                if ($("#btnAddLocal").css('display')==="inline-block") {
                  $("#btnAddLocal").fadeOut('slow');
                }
                $("#reviewmedia").val('');
                $('#formAdd')[0].reset();
                $('#avisoModal').modal("show","true");
                $('#avisoModal').find('.modal-title').text('Aviso');
                $('#avisoModal').find('.modal-body').text('Este estabelecimento não é classificado como uma padaria.');
              } else {
                var mapa = geo.geocomplete("map");
                mapa.setZoom(19);
                var reviews = result.reviews;
                if (typeof(reviews)!=='undefined') {
                  var soma = 0;
                  var contador = 0;
                  reviews.forEach(function(key){
                    console.log(key.rating);
                    soma += key.rating;
                    contador += 1;
                  });
                  var media = (soma/contador);
                  console.log("total:"+soma);
                  $("#reviewmedia").val(media);
                } else {
                  alert('sem review');
                }
                // se ainda não existir no banco... cadastra, se não, não mostra botão
                if ($("#btnAddLocal").css('display')==="none") {
                  $("#btnAddLocal").fadeIn('slow');
                }
              }
            });
            var total = $(window).height();
            var form = $('.form-inline').height();
            var mapsize = $('.map_canvas').height();
            var resultado = total - (form-mapsize) - (total*0.1);
            $('.map_canvas').css('height',resultado);
        }
        getLocation();
      },
      App : function () {
        $("#btnAddLocal").click(function(e){
          e.preventDefault();
          var data = $('#formAdd').serialize();
          $.ajax({
            type: "POST",
            url: "http://localhost/carecajs/gravar",
            data: data,
            success: function(response) {
              console.log(response);
              //alert('sucesso');
              $('#addModal').modal("show","true");
              $('#addModal').find('.modal-title').text(response.local.name);
            },
            error: function(error,responseText) {
              alert(responseText);
              console.log(error);
            },
            dataType: 'json'
          });
        });
      }
  }
  $(document).ready(function () {
      fn.Iniciar();
  });
})(jQuery);