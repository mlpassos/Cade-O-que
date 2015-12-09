<?php echo $map['js']; ?>
<div class="row">
    <div class="cold-md-12 col-lg-12 col-sm-12">
     LOCATION: <?php 
     if (isset($placeslocation)) {
     	echo $placeslocation;
	 }
     ?>

      <div id="maps">
      	 <?php 
		     if (isset($map)) {
		     	echo "a" . $map['html']; 
			 }
         
     	 ?>
      </div>
    </div>
  </div>