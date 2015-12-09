<!-- Modal -->
<div class="modal fade" id="avisoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid ajaxload">
  <div class="row">
    <div class="cold-md-12 col-lg-12 col-sm-12">
	    <form id="formAdd" class="form-inline">
	      	<input id="geocomplete" type="text" placeholder="Digite uma palavra-chave..." value=""/>
	      	<input id="find" type="button" value="find" />
		  
	      	<h3>Detalhes do local</h3>
		    <div class="form-group">
		        <label class="sr-only" for="name">Nome</label>
		        <input name="name" type="text" class="form-control" id="name" placeholder="Nome..." value="">
			</div>
			<!--   <div class="form-group">
	        <label class="sr-only" for="point_of_interest">Nome POI</label>
	        <input name="point_of_interest" type="text" class="form-control" id="point_of_interest" placeholder="POI Name..." value="">
			  </div> -->
			<div class="form-group">
		        <label class="sr-only" for="lat">Latitude</label>
		        <input name="lat" type="text" class="form-control" id="lat" placeholder="Latitude..." value="">
			</div>
			<div class="form-group">
		        <label class="sr-only" for="lng">Longitude</label>
		        <input name="lng" type="text" class="form-control" id="lng" placeholder="Longitude..." value="">
			</div>
			<div class="form-group">
		        <label class="sr-only" for="formatted_address">Endereço</label>
		        <input name="formatted_address" type="text" class="form-control" id="formatted_address" placeholder="Endereço..." value="">
			</div>
			<div class="form-group">
		        <label class="sr-only" for="website">Site</label>
		        <input name="website" type="text" class="form-control" id="website" placeholder="Site..." value="">
			</div>
			<div class="form-group">
		        <label class="sr-only" for="website">Média dos reviews</label>
		        <input name="reviewmedia" type="text" class="form-control" id="reviewmedia" placeholder="Média dos reviews" value="">
			</div>
			<button id="btnAddLocal" type="submit" class="btn btn-primary">Adicionar</button>
			<div class="map_canvas"></div>
	    </form>
    </div>
  </div>
</div><!-- /.container -->