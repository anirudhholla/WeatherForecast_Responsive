<?php
		$url_xml="";
		$main_xml="";
		$content_xml="";
		$latitude="";
		$longitude="";
		$api_forecast="";
      
  		   $url_xml="https://maps.google.com/maps/api/geocode/xml?address=".$_GET["address"].",".$_GET["city"].",".$_GET["state"]."&key=AIzaSyCEj0blWDQ9RhkgTO7VAQogqNhEgoMi-tQ";
		   //echo "<script type='text/javascript'>alert('$url_xml');</script>";
		   //$main_xml=URLencode($url_xml);
		   $content_xml=simplexml_load_file($url_xml);
		   
            if($content_xml->status =="OK")
            {
		      $latitude=$content_xml->result->geometry->location->lat;
		      $longitude=$content_xml->result->geometry->location->lng;
		      $weather_check=$_GET["degree"];
		      
                if($weather_check=="fahrenheit")
		          {
		              $api_forecast="https://api.forecast.io/forecast/4b084d39514ec6c3c95c1c4f53a0b7f9/".$latitude.",".$longitude."?units=us&exclude=flags";
		               //echo "<script type='text/javascript'>alert('$api_forecast');</script>";
		          }
		      else
		          {
		              $api_forecast="https://api.forecast.io/forecast/4b084d39514ec6c3c95c1c4f53a0b7f9/".$latitude.",".$longitude."?units=si&exclude=flags";
             
		          }
                $contents=file_get_contents($api_forecast);
            echo json_encode($contents);
		}
            else
            {
                echo "<script>alert('XML not found');</script>";
                return;
            }
	?> 
