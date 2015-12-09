<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Places extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	//$apikey = "AIzaSyAuTPAIhJmjiN7koIxMKQ3125yKwDzhCoo";
	public function entorno() {
		$lat = $this->input->post('lat');
		$lng = $this->input->post('lng');
		$tipo = $this->input->post('tipo');
		$next_page_token = $this->input->post('next_page_token');
		// $apikey = "AIzaSyDnqM2w_h9H4L64Wyef91GUE__sG-sYCU0";
		$apikey = "AIzaSyAuTPAIhJmjiN7koIxMKQ3125yKwDzhCoo";
		//$apikey = "AIzaSyDFSJJsB2KacN1F2Fa1EvyO3RtbqDUhSPs";
		if ($next_page_token==="") {
			$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=". $lat . "," . $lng
				   . "&radius=1000&types=" . $tipo . "&key=". $apikey;
			$data['resultado'] = file_get_contents($url);
			echo $data['resultado'];
		} else {
			$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=". $next_page_token . "&key=". $apikey;
			$data['resultado'] = file_get_contents($url);
			echo $data['resultado'];
		}
		//echo $url;
	}
	public function detalhes() {
		$id = $this->input->post('placeid');
		//$apikey = "AIzaSyDnqM2w_h9H4L64Wyef91GUE__sG-sYCU0";
		//$apikey = "AIzaSyDFSJJsB2KacN1F2Fa1EvyO3RtbqDUhSPs";
		$apikey = "AIzaSyAuTPAIhJmjiN7koIxMKQ3125yKwDzhCoo";		
		$url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" . $id . "&key=". $apikey;
		$data['resultado'] = file_get_contents($url);
		echo $data['resultado'];	
		//echo $url;
	}
	public function photos() {
		$ref = $this->input->post('reference');
		// $apikey = "AIzaSyDnqM2w_h9H4L64Wyef91GUE__sG-sYCU0";
		//$apikey = "AIzaSyDFSJJsB2KacN1F2Fa1EvyO3RtbqDUhSPs";	
		$apikey = "AIzaSyAuTPAIhJmjiN7koIxMKQ3125yKwDzhCoo";			
		$url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400"
				. "&photoreference=" . $ref . "&key=". $apikey;
		$data['resultado'] = file_get_contents($url);
		echo $data['resultado'];			
	}
}
