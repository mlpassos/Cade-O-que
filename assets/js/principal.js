(function ($) {
    "use strict";
    var fn = {
        // Funcionalidades
        Iniciar: function () {
            fn.Maps();
        	//fn.App();
        },
        Maps : function () {

			$('#maps').gmap3({
			  getgeoloc:{
			    callback : function(latLng){
			    	$("#lat").val(latLng.lat);
			    	$("#lng").val(latLng.lng);
			      	if (latLng){
				        console.log(latLng);
				        map = $(this);
				        map.gmap3({
				          map:{
				            options:{
				              zoom: 14,
				              center: latLng
				            }
				          },
				          marker:{ 
	    						latLng:latLng
						  }
						});
			    	}
			    }
			}});
			$('.tipos-item a').click(function(e){
				e.preventDefault();
				// $('a.menu').click(function(){
				$('.tipos-item a').removeClass("active");
				$(this).addClass("active");
				// });
				var tipo = $(this).attr('data-value');

				map.gmap3({
				    clear: {
				    name:["marker"],
				    tag: "place"
				  }
				});
				function sleep(ms) {
					var dt = new Date();
					dt.setTime(dt.getTime() + ms);
					while (new Date().getTime() < dt.getTime());
				}
				
				var getPlaces = function(lat,lng,tipo,next_page_token) {
					$.ajax({
			            type: "post",
			            url: window.location.href + "/places/entorno",
			            data: {
			            	"lat":lat,
			            	"lng":lng,
			            	"tipo":tipo,
			            	"next_page_token":next_page_token
			           	},
			            success: function(data) {
			            	console.log(data);
			            	//ajax(nextpagetoken)
			            	var picture = function(url) {
			            		var picurl = url.replace("https://plus.google.com/","");
			            		var r = "";
			            		var res = $.ajax({
						            type: "get",
						            async: false,
						            url: "https://www.googleapis.com/plus/v1/people/" + picurl + "?key=AIzaSyAuTPAIhJmjiN7koIxMKQ3125yKwDzhCoo",
						            // data: {
						            // 	"placeid": place.place_id
						            // },
						            beforeSend:function(){
						            	$('.ajaxmessage').show('slow');
						            	//alert('ajax');
						            },
						            success: function(data){
						            	console.log(data);
						            	r = data;
						            	return data;
						            },
									error: function(error){
						            	alert('erro');
						            },
						            dataType: 'json'
						        }).done(function(){
						        	$('.ajaxmessage').hide('slow');
						        });
						        return r;
							}
			            	var janela = function(objdata) {
			            		//console.log(objdata.result);
			            		// if (typeof(objdata.result.reviews)!=="undefined") {
			            			var reviews = objdata.result.reviews;
			            			var fotos = objdata.result.photos;
			            			var soma = 0;
			                        var contador = 0;
			                        var opinioes = "";
			                        var fotografias = "";
			                        console.log(fotos);
			                        var getFotos = function(reference) {
			                        	// ajaxß
			                        	$.ajax({
								            type: "post",
								            url: window.location.href + "/places/photos",
								            data: {
								            	"reference":reference
								           	},
								            success: function(data) {
								            	console.log(data);
								            },
								            dataType: 'json'
								        });
								        return "teste"
			                        }
			                        if (typeof(fotos)!=="undefined") {
				                        fotos.forEach(function(key){
				                        	//photo_reference
				                        	if (typeof(key.photo_reference)!=="undefined") {
				                        		fotografias += getFotos(key.photo_reference);
				                        	}
				                        });
				                    }
			                        var estrelas = function(rating) {
			                        	switch(rating) {
										    case 1:
										        return '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
										        break;
										    case 2:
										        return '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
										        break;
									        case 3:
										        return '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
										        break;
									        case 4:
										        return '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
										        break;
									        case 5:
										        return '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span>'
										        break;
										    default:
										        return "erro"
										}
			                        }
			                        reviews.forEach(function(key){
			                          if (typeof(key.rating)!=="undefined") {
				                          //console.log(key.rating);
				                          soma += key.rating;
				                          if (typeof(key.author_url)!=="undefined") {
				                          	// console.log(picture(key.author_url).image.url);
				                          	opinioes += '<p><img class="img-circle" src="' + picture(key.author_url).image.url + '" alt="foto do usuário" title="' + picture(key.author_url).name.givenName + '"> ' + estrelas(key.rating) + ' <span class="infowindow-text">' + key.text + '</span></p>';
				                          } else {
				                          	opinioes += '<p>anônimo ' + estrelas(key.rating) + ' <span class="infowindow-text">' + key.text + '</span></p>';
				                          }
				                          contador += 1;
				                       }
			                        });
			                        var media = (soma/contador);
			                        //console.log("media:"+media);
			                        // (Math.round((media + 0.00001) * 100) / 100)
			                        if (media>=0) {
			                        	var output =  '<h4>' + objdata.result.name + '</h4>'
			                        				  + '<p><span class="glyphicon glyphicon-map-marker"></span> ' + objdata.result.vicinity + '</p>'
			                        				  + '<p><span class="glyphicon glyphicon-earphone"></span> ' + objdata.result.formatted_phone_number + '</p>';
			                        	if (typeof(objdata.result.opening_hours)!=="undefined") {
			                        		if (objdata.result.opening_hours.open_now==false) {
			                        			output += '<p class="bg-danger"><span class="glyphicon glyphicon-time"></span> FECHADO</p>';
			                        		} else {
			                        			output += '<p class="bg-success"><span class="glyphicon glyphicon-time"></span> ABERTO</p>';
			                        		}
			                        	} else {
			                        		output += '<p class="bg-warning"><span class="glyphicon glyphicon-time"></span> Sem horário definido</p>';
			                        	}
			                        	var mediafixed = media.toFixed(1);
			                        	// if (media === parseInt(media, 10)) {
			                        	// 	var comp = ".0";
			                        	// } else {
			                        	// 	var comp = "";
			                        	// }

			                        	output +=  '<hr>'
		                        				  + '<p class="pull-right"><span class="bg-success infowindow-media">' + mediafixed  + '</span></p>'
		                        				  // + '<p>NR.VOTOS: ' + contador + '</p>'
		                        				  // + '<hr>'
		                        				  + '<p><a href="#" class="infowindow-opiniao-button">OPINIÕES (' + contador + ')</a></p><div class="infowindow-opiniao-box">' + opinioes + '</div>';
			                        	return output;
			                        } else {
			                        	return 'SEM NOTA' + ' - ' + objdata.result.name	
			                        }	
			            		// } else {
			            		// 	return 'SEM NOTA' + ' - ' + objdata.result.name	
			            		// }
			            	}
			            	var icon = function(objdata) {
			            		//console.log(objdata);
		            			var reviews = objdata.result.reviews;
		            			var soma = 0;
		                        var contador = 0;
		                        reviews.forEach(function(key){
		                          if (typeof(key.rating)!=="undefined") {
			                          //console.log(key.rating);
			                          soma += key.rating;
			                          contador += 1;
			                       }
		                        });
		                        var media = (soma/contador);
		            			if (media>=4.5) {
		            				return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=A|e8e829|000000" 
		            			} else if (media>=4) {
		            				return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=B|ffaa23|000000" 
		            			} else if (media>=3) {
		            				return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=C|c4c4c4|000000" 
		            			} else if (media<3)  {
		            				return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=D|000000|ffffff" 
		            			}
				            }

			            	var json = data.results;
			            	
					        json.forEach(function(place){
					        	//console.log(place.place_id);
					        	$.ajax({
						            type: "post",
						            // async: false,
						            url: window.location.href + "/places/detalhes",
						            data: {
						            	"placeid": place.place_id
						            },
						            success:function(data){
						            	//console.log(data);
						            	
							            	//console.log(data.result.opening_hours);
						            	if (typeof(data.result.reviews)!=="undefined") {
							            	map.gmap3({
								           		marker:{ 
								             	  latLng:[data.result.geometry.location.lat, data.result.geometry.location.lng],
								             	  tag: "place",
								             	  data: data.result,
								             	  options:{
											        icon: icon(data)
											        // size: new google.maps.Size(60, 60)
											        // icon: new google.maps.MarkerImage("http://gmap3.net/skin/gmap/magicshow.png",new google.maps.Size(100, 100)),
											        // origin: new google.maps.Point(0, 0),
											        // anchor: new google.maps.Point(0, 100)
											      },
								             	  events:{
												      click: function(marker, event, context){
												        var mapa = map.gmap3("get"),
												          infowindow = map.gmap3({get:{name:"infowindow"}});
												        if (infowindow){
												          infowindow.open(mapa, marker);
												          infowindow.setContent( janela(data) );
												        } else {
												          map.gmap3({
												            infowindow:{
												              anchor:marker, 
												              options:{content: janela(data)}
												            }
												          });
												        }
												      }//,
												      // mouseout: function() {
												      //   var infowindow = map.gmap3({get:{name:"infowindow"}});
												      //   if (infowindow){
												      //     infowindow.close();
												      //   }
												      // }
								           		  }
								        	}});
										}
							        },
						            error: function(error){
						            	alert('erro');
						            },

						            dataType: 'json'
							    });
						        	
						    });

				        },
				        error: function(error){
				        	console.log(error);
				        },
				        dataType: 'json'
				    }).done(function(data){
				    	//console.log();
				    	// if (typeof(data.next_page_token)!=="undefined") {
				    	// 	sleep(2000);
				    	// 	getPlaces(lat,lng,tipo,data.next_page_token);
				    	// } else {
				    	// 	alert('terminou');
				    	// 	//console.log('terminou');
				    	// }
					});	
				}
				getPlaces($("#lat").val(),$("#lng").val(),tipo,"");
			});
			$('body').delegate('.infowindow-opiniao-button', 'click', function(){
				$('.infowindow-opiniao-box').slideToggle('slow');
			});
		}
	}
	var map;
    $(document).ready(function () {
        fn.Iniciar();
    });
})(jQuery);

			

