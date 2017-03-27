var global_address;
var global_icon;
var global_summary;
var global_temperature;
var global_cf;
			
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '888790514568842',
			xfbml      : true,
			version    : 'v2.5',
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	function postToFeed(){	
		FB.login(function(response){
			if (response.authResponse){
				FB.ui({
         
					method: 'feed',
					name: "Current Weather in " + global_address,
					link: "http://www.forecast.io",
					description: global_summary + ", " + global_temperature + global_cf,
					picture: global_icon,
					caption: "WEATHER INFORMATION FROM FORECAST IO ",
					display: "popup"
       
				},function(response){ if(response && response.post_id){alert("Posted Successfully");} });
			}
			else{
				alert('Not posted');
			}
		});
	}
		
$(document).ready(function() {
  $('#search').click(function(){
      
    var check=true;
     var degree=$('input[name="temp"]:checked').val();
     
      var address = document.getElementById("addr").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
//$('#addr').bind("keyup focusout change", function(){
  if($('#addr').val().trim()!=""){
      
      $('#addrError').css('visibility','hidden');
  }
    else
    {
         check=false;
        $('#addrError').css('visibility','visible');
    }

 if($('#city').val().trim()!=""){
    
      $('#cityError').css('visibility','hidden');
  }
    else
    {
         check=false;
        $('#cityError').css('visibility','visible');
    }

  if($('#state').val().trim()!=""){
      
      $('#stateError').css('visibility','hidden');
  }
    else
    {
        check=false;
        $('#stateError').css('visibility','visible');
    }
      
      if(check)
      {
          execAddr(address,city,state,degree);
      }
      
//});      
});
    
 $('#clear').click(function(){ 
//$('#addr').bind("keyup focusout change", function(){
 
      $('#addrError').css('visibility','hidden');
      $('#cityError').css('visibility','hidden');
     $('#stateError').css('visibility','hidden');
     
     $('#addr').val("");
     $('#city').val("");
     $('#state').val("");
     
     $('#fahr').prop('checked',true);
        
     $('#navid').css('visibility','hidden');
        $('#basicMap').html("");
     //document.getElementById('next24').innerHTML = "";
     // $('#myform')[0].reset();
  });

    $('#addr').bind("keyup focusout change", function(){
            if($('#addr').val().trim()!=""){
                $('#addrError').css('visibility','hidden');
            }
            else{
                $('#addrError').css('visibility','visible');
            }
});
    
 $('#city').bind("keyup focusout change", function(){
     
 if($('#city').val().trim()!=""){
      $('#cityError').css('visibility','hidden');
  }
    else
    {
        $('#cityError').css('visibility','visible');
    }
     
 });
    
 $('#state').bind("keyup focusout change", function(){   
 
  if($('#state').val().trim()!=""){
      $('#stateError').css('visibility','hidden');
  }
    else
    {
        $('#stateError').css('visibility','visible');
    }
  
//});
});    
});    

function execAddr(address,city,state,degree){
	//alert(address+' '+city+' '+state+' '+degree);
	$.ajax({
    'url' : 'hw8.php',
    'type' : 'GET',
    'dataType':'json',
    'data' : {
      'address' :address,
      'city' : city,
	  'state': state,
	  'degree': degree
    },
    success : function(data) {

        var json_data = jQuery.parseJSON(data);
        
       // alert(json_obj.latitude);
         $('#navid').css('visibility','visible');
        var latitude=json_data.latitude;
        var longitude=json_data.longitude;
        
       //START OF TAB 1
					var current_summary = json_data.currently.summary;
					var current_temperature = parseInt(json_data.currently.temperature);
					var current_precipintensity = json_data.currently.precipIntensity;
					var current_precipitation;
					var current_precipprobability = json_data.currently.precipProbability;
					var current_chanceofrain = 100 * current_precipprobability + " %";
					
					var latitude=json_data.latitude;
					var longitude=json_data.longitude;
					var current_icon_name=json_data.currently.icon;
					var icon_name;
					var current_icon="http://cs-server.usc.edu:45678/hw/hw8/images/"
					var current_tempmax = parseInt(json_data.daily.data[0].temperatureMax);
					var current_tempmin = parseInt(json_data.daily.data[0].temperatureMin);
					var current_windspeed = (json_data.currently.windSpeed);
					var current_dewpoint = (json_data.currently.dewPoint).toFixed(2);
					var current_humidity = parseInt(json_data.currently.humidity * 100) + " %";
					var current_visibility = (json_data.currently.visibility);
					var current_sunrise = json_data.daily.data[0].sunriseTime;
					var current_sunset = json_data.daily.data[0].sunsetTime;
					var timezone = json_data.timezone;
					var intermediate_sunrise=moment.unix(current_sunrise);
					var current_sunrise_formatted=intermediate_sunrise.tz(timezone).format("hh:mm A");
					var intermediate_sunset=moment.unix(current_sunset);
					var current_sunset_formatted=intermediate_sunset.tz(timezone).format("hh:mm A");
					var cf;
					if(current_icon_name == "clear-day")
						icon_name = "clear.png";
					else if(current_icon_name == "clear-night")
						icon_name = "clear_night.png";
					else if(current_icon_name == "partly-cloudy-day")
						icon_name = "cloud_day.png";
					else if(current_icon_name == "partly-cloudy-night")
						icon_name = "cloud_night.png";
					else
						icon_name = current_icon_name+".png";
					current_icon+=icon_name;
					if(current_precipintensity <0.002){
						current_precipitation = "None";
					}
					else if(current_precipintensity < 0.017 && current_precipintensity >= 0.002){
						current_precipitation = "Very Light";
					}
					else if(current_precipintensity < 0.1 && current_precipintensity >= 0.017){
						current_precipitation = "Light";
					}
					else if(current_precipintensity < 0.4 && current_precipintensity >= 0.1){
						current_precipitation = "Moderate";
					}
					else if(current_precipintensity >= 0.4){
						current_precipitation = "Heavy";
					}
					
					if(degree == "celsius"){
						cf = "&#176;C";
                        //current_dewpoint=isNaN(current_dewpoint)?'NA':current_dewpoint+ "&#176;C";
						current_dewpoint += "&#176;C";
                        current_visibility=isNaN(current_visibility)?'NA':current_visibility.toFixed(2)+ " km";
                        current_windspeed=isNaN(current_windspeed)?'NA':current_windspeed.toFixed(2)+ " m/s";
						//current_visibility += " km";
						//current_windspeed += " m/s";
					}	
					else{
						cf = "&#176;F";
                        
                        current_dewpoint=isNaN(current_dewpoint)?'NA':current_dewpoint+ "&#176;F";
						//current_dewpoint += "&#176;C";
                        current_visibility=isNaN(current_visibility)?'NA':current_visibility.toFixed(2)+ " mi";
                        current_windspeed=isNaN(current_windspeed)?'NA':current_windspeed.toFixed(2)+ " mph";
						
						//current_dewpoint += "&#176;F";
						//current_visibility += " mi";
						//current_windspeed += " mph";
					}
					//global values required for FB
					global_address = city + ", " + state;
					global_icon = current_icon;
					global_summary = current_summary;
					global_temperature = current_temperature;
					global_cf = cf;
					//global values required for FB ends here
					var table = "<div style='background-color:#F27E7F' class='row'>";
					table+="<div align=center class=' col-md-6 col-sm-6'><img style='display:block;width:130px;height:130px;margin-top:5px;margin-bottom:5px;' title='"+ current_summary +"' alt='"+ current_summary + "' src='" + current_icon + "'/></div>";
					table+="<div align='center' class='col-md-6'><span style='color:white'>" + current_summary + " in " + city + ", " + state + "<br>" + "<span style='font-size:60px'>" + current_temperature + "</span><span style='font-size:16px; position:relative;top:-2.0em;'>" + cf + "</span><br>" + "<span><img style='margin-right:10px;margin-bottom:10px;display:inline-block;' src='http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png' class='img-responsive pull-right' width=35px height=35px title= 'post in fb' onclick=postToFeed()> "+"<span style='color:blue'>L: " + current_tempmax + "&#176;</span>" + "<span style='color:black;'> | </span>" + "<span style='color:green'>H: " +current_tempmin + "&#176;</span></span></span>" + "</div>";
					table+="</div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F9F9F9' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Precipitation</div><div class='col-md-5 col-xs-5 col-sm-5'>" + current_precipitation + "</div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F2DEDE' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Chance of Rain</div><div class='col-md-5 col-xs-5 col-sm-5'>" + current_chanceofrain + "</div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F9F9F9' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Wind Speed</div><div class='col-md-5 col-xs-5 col-sm-5'>" + current_windspeed + "</div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F2DEDE' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Dew Point</div><div class='col-md-5 col-xs-5 col-sm-5'> " + current_dewpoint + "</div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F9F9F9' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Humidity</div><div class='col-md-5 col-xs-5 col-sm-5'> " + current_humidity + "</div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F2DEDE' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Visibility</div><div class='col-md-5 col-xs-5 col-sm-5'> " + current_visibility + " </div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F9F9F9' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Sunrise</div><div class='col-md-5 col-xs-5 col-sm-5'> " + current_sunrise_formatted + " </div></div></div>";
					table+="<div class='row'><div style='line-height: 250%;background-color:#F2DEDE' class='col-md-12 col-sm-12 col-xs-12'><div class='col-md-7 col-xs-7 col-sm-7' style='padding-left:0px; text-align:left'>Sunset</div><div class='col-md-5 col-xs-5 col-sm-5'> " + current_sunset_formatted + " </div></div></div>";
					$('#firsttab_table').html(table);

					//open map code starts here
					$(function() {
                        $('#basicMap').html("");
						var map = new OpenLayers.Map("basicMap");
						var mapnik = new OpenLayers.Layer.OSM();
		
						var layer_cloud = new OpenLayers.Layer.XYZ(
								"clouds",
								"http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
							{
								isBaseLayer: false,
								opacity: 0.7,
								sphericalMercator: true
							}
						);
						var layer_precipitation = new OpenLayers.Layer.XYZ(
								"precipitation",
								"http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
							{
								isBaseLayer: false,
								opacity: 0.7,
								sphericalMercator: true
							}
						);
						map.addLayers([mapnik, layer_precipitation, layer_cloud]);
						map.addControl(new OpenLayers.Control.LayerSwitcher());     
					
						var lonlat = new OpenLayers.LonLat(longitude, latitude).transform(
							new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
							map.getProjectionObject() // to Spherical Mercator Projection
						);
						map.setCenter( lonlat, 8 );		
						
						var markers = new OpenLayers.Layer.Markers( "Markers" );
						map.addLayer(markers);
						markers.addMarker(new OpenLayers.Marker(lonlat));
						
					});
					//open map code ends here
					
					// END OF TAB 1
        
        
        //Next 24 hours - Tab 2
        var timezone=json_data.timezone;
        //alert(timezone);
        var i=0;
        var tab_2="";
            for(i=0;i<24;i++)
             {
              /*  tab_2+="<tr><td>"; */
                    var rise =     moment.unix(json_data.hourly.data[i].time);
                    var local   =  moment.tz(rise, "America/Los_Angeles");
                    var t=rise.tz(timezone).format('hh:mm A');
                 //console.log(t);
                    var icon=json_data.hourly.data[i].icon;
   
                  if(icon=="clear-day")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/clear.png";
                    }
                 else if(icon=="clear-night")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png";    
                    }
                 else if(icon=="clear-day")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/clear.png";
                    }
                 else if(icon=="rain")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/rain.png";
                    }
                 else if(icon=="snow")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/snow.png";
                    }
                 else if(icon=="sleet")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png";
                    }
                 else if(icon=="wind")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/wind.png";  
                    }
                 else if(icon=="fog")
                   {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/fog.png";
                    }
                  else if(icon=="partly-cloudy-day")
                   {   
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png";
                    }
                    else if (icon=="partly-cloudy-night")
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png"; 
                    }
                    else 
                    {
                        icon="http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png";
                    }
      
                //var unit_visibility,unit_windspeed,unit_pressure;
                if(degree == "celsius"){
                    
                json_data.hourly.data[i].windSpeed=isNaN(json_data.hourly.data[i].windSpeed)?'NA':json_data.hourly.data[i].windSpeed+" m/s";
            json_data.hourly.data[i].visibility=isNaN(json_data.hourly.data[i].visibility)?'NA':json_data.hourly.data[i].visibility+" km";
                json_data.hourly.data[i].pressure=isNaN(json_data.hourly.data[i].pressure)?'NA':json_data.hourly.data[i].pressure+" mb";
                     $('#tmpdeg').html("Temp(&#176C)");
				}	
				else{
				
                json_data.hourly.data[i].windSpeed=isNaN(json_data.hourly.data[i].windSpeed)?'NA':json_data.hourly.data[i].windSpeed+" mph";
            json_data.hourly.data[i].visibility=isNaN(json_data.hourly.data[i].visibility)?'NA':json_data.hourly.data[i].visibility+" mi";
             json_data.hourly.data[i].pressure=isNaN(json_data.hourly.data[i].pressure)?'NA':json_data.hourly.data[i].pressure+" hPa";
                    
                    $('#tmpdeg').html("Temp(&#176F)");
				}
                    
                 
                 tab_2+= "<div class='panel panel-default' style='margin:0px;'>";
                 tab_2+="<div class='panel-heading' style='background-color:white;'>";
 
     tab_2+="<h4 class=\"panel-title\">";
     
                 tab_2+="<div class='row' style='text-align:center'>";
      tab_2+="<div class='col-md-2 col-sm-2 col-xs-2 col-lg-2'>";
                 tab_2+= t+"</a>";
         tab_2+= "</div>";  
                 
    tab_2+="<div class='col-md-3 col-sm-3 col-xs-3 col-lg-3'>";
                 tab_2+= "<img src='" + icon + "'alt='"+json_data.hourly.data[i].icon+ "'style='width:50px;height:50px'</img>";
       tab_2+= "</div>";  
                 
    tab_2+="<div class='col-md-2 col-sm-2 col-xs-2 col-lg-2'>";
                 tab_2+= parseInt((json_data.hourly.data[i].cloudCover)*100) + "%";
        tab_2+= "</div>";
                 
   
    tab_2+="<div class='col-md-2 col-sm-2 col-xs-2 col-lg-2'>";
                 tab_2+= json_data.hourly.data[i].temperature.toFixed(2);
     tab_2+= "</div>";
                 
    tab_2+="<div class='col-md-3 col-sm-3 col-xs-3 col-lg-3'>";
                  tab_2+=  "<a data-toggle='collapse' data-parent='#accordion' href='#collapse"+i+"'>";
                 tab_2+="<span class='glyphicon glyphicon-plus'></span></a>";
                 //tab_2+= "Button";
     tab_2+= "</div>";
    
                 
            tab_2+= "</div>";     
     tab_2+= "</h4>";
   tab_2+= "</div>";
   tab_2+=" <div id='collapse"+i + "'class='panel-collapse collapse'>";
                 tab_2+="<div class='panel-body' style='overflow:auto;'>"
                 tab_2+="<table class=table>";
                 tab_2+="<tr style='background-color:white; font-size:13px;'>";
                 tab_2+="<th style='text-align:center'>Wind Speed</th>";
                 tab_2+="<th style='text-align:center'>Humidity</th>";
                 tab_2+="<th style='text-align:center'>Visibility</th>";
                 tab_2+="<th style='text-align:center'>Pressure</th>";
                 tab_2+="</tr>";
                 
                 tab_2+="<tr style='font-size:12px'>";
                 
                 tab_2+="<td style='text-align:center'>" + json_data.hourly.data[i].windSpeed;
                 tab_2+="</td>";
                 
                 tab_2+="<td style='text-align:center'>" + parseInt((json_data.hourly.data[i].humidity)*100) + "%";
                 tab_2+="</td>";
                 
                 tab_2+="<td style='text-align:center'>" + json_data.hourly.data[i].visibility;
                 tab_2+="</td>";
                 
                 tab_2+="<td style='text-align:center'>" + json_data.hourly.data[i].pressure;
                 tab_2+="</td>";
                
                 tab_2+="</tr>";
                
                 tab_2+="</table>";
                 tab_2+= "</div>";
   tab_2+= "</div>";
  tab_2+="</div>";
             }
        //alert(json_data.hourly.data[1].temperature);
           $("#accordion").html(tab_2);
            //tab_2+= "</tbody></table>"; 
        getDailyData($.parseJSON(data));
    },
    error:function(){
        alert('data failed');
    }
	
  });
}
function getDailyData(jsonObject){
			var dailyArr = [];
			var dateObject;
			var buttonTextData;
			var modalTextData;
			var day, date, month, monthDate, image, minTemp, maxTemp;
			var dailyData = jsonObject.daily.data;
            var degree=$('input[name="temp"]:checked').val();
			for(i=1;i<dailyData.length;i++){
				dateObject = new Date(dailyData[i].time*1000);
				day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()];
				month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dateObject.getMonth()];			
				date = dateObject.getDate();
				monthDate = month+" "+date;
				icon = getIcon(dailyData[i].icon);	
				minTemp = Math.floor(dailyData[i].temperatureMin)+"&deg";
				maxTemp = Math.floor(dailyData[i].temperatureMax)+"&deg";
				dailyArr.push({
					"day": day,
					"monthDate": monthDate,
					"icon": icon,
					"minTemp": minTemp,
					"maxTemp": maxTemp
				});
				buttonTextData="<h5>"+day+"<h5>"+monthDate+"<br><img height='60px' width='60px' src='"+icon+"'><br>";
				buttonTextData+="Min<br>Temp<br>"+"<h3>"+minTemp+"<h5><br>Max<br>Temp<br>"+"<h3>"+maxTemp;
				var id="#button"+i;
				$(id).html(buttonTextData);

				var current_summary=dailyData[i].summary;
				var current_temp = parseInt(jsonObject.daily.data[0].temperature);
				var current_temp_max=parseInt(jsonObject.daily.data[0].temperatureMax);
				var current_temp_min=parseInt(jsonObject.daily.data[0].temperatureMin);
				
				var precip_no=jsonObject.daily.data[i].precipIntensity;
				var current_precipitation;
						if(degree == "celsius")
							precip_no=precip_no/25.4;
						if(precip_no < 0.002)
							current_precipitation="None";
						else if(precip_no < 0.017 )
							current_precipitation="Very Light";
						else if(precip_no < 0.1)
							current_precipitation="Light";
						else if(precip_no < 0.4)
							current_precipitation="Moderate";
						else if(precip_no >= 0.4)
							current_precipitation="Heavy";
				var precip_prob=jsonObject.daily.data[i].precipProbability;
				var current_chance_of_rain=(parseFloat(precip_prob*100))+"%";
				var current_windspeed=(jsonObject.daily.data[i].windSpeed).toFixed(2);
				var current_dewpoint=parseInt(jsonObject.currently.dewPoint);
				var current_humidity = parseInt ((jsonObject.daily.data[i].humidity)*100)+'%';
				var current_visibility=(jsonObject.daily.data[i].visibility);
				var current_pressure = jsonObject.daily.data[i].pressure;
				if(degree == "celsius") {
					current_temp+="&#176C";
                    current_windspeed=isNaN(current_windspeed)?'NA':current_windspeed +"m/s";
                    current_visibility=isNaN(current_visibility)?'NA':current_visibility.toFixed(2) +" km";
                    current_pressure=isNaN(current_pressure)?'NA':current_pressure +" mB";
					//current_windspeed+="m/s";
					current_dewpoint+="&#176C";
					//current_visibility+=" km";
                    //current_pressure+=" mB"
				} else {
                    
                     current_windspeed=isNaN(current_windspeed)?'NA':current_windspeed +" mph";
                    current_visibility=isNaN(current_visibility)?'NA':current_visibility.toFixed(2) +" mi";
                    current_pressure=isNaN(current_pressure)?'NA':current_pressure +" hPa";
                    
					current_temp+="&#176F";
				//	current_windspeed+="mph";
					current_dewpoint+="&#176F";
				//	current_visibility+=" mi";
                  //  current_pressure+=" hPa"
				}

				var sunrise=jsonObject.daily.data[i].sunriseTime;
				var sunset=jsonObject.daily.data[i].sunsetTime;
				
				timezone=jsonObject.timezone;
				var inter_sunrise=moment.unix(sunrise);
				var final_sunrise=inter_sunrise.tz(timezone).format("hh:mm A");
				var inter_sunset=moment.unix(sunset);
				var final_sunset=inter_sunset.tz(timezone).format("hh:mm A");
				modalText="Weather in "+$('#city').val().trim()+" on "+monthDate;
				var id="#myModalLabel"+i;
				$(id).html(modalText);
				modalText="<div class='container-fluid'>\n<div class='row'><div class='col-md-12'><center><img height='150px' width='150px' src='"+icon+"' alt='"+current_summary+"' title='"+current_summary+"'></center></div></div>\n";
				modalText+="<div class='row'><div class='col-md-12'><h3><center>"+day+": <span style=\"color:#FFAB10\">"+current_summary+"<span></center></h3></div></div>\n";
				modalText+="<div class='row'><div class='col-md-4'><center><h4>Sunrise Time</h4>"+final_sunrise+"</center></div><div class='col-md-4'><center><h4>Sunset Time</h4>"+final_sunset+"</center></div><div class='col-md-4'><center><h4>Humidity</h4>"+current_humidity+"</center></div></div>\n";
				modalText+="<div class='row'><div class='col-md-4'><center><h4>Wind Speed</h4>"+current_windspeed+"</center></div><div class='col-md-4'><center><h4>Visibility</h4>"+current_visibility+"</center></div><div class='col-md-4'><center><h4>Pressure</h4>"+current_pressure+"</center><br></div></div>\n";
				modalText+="</div>"
                var id="#myModalBody"+i;
				$(id).html(modalText);
			}
		}
				 
		function getIcon(current_icon_name){
			var current_icon="http://cs-server.usc.edu:45678/hw/hw8/images/";
			if(current_icon_name == "clear-day")
				current_icon += "clear.png";
			else if(current_icon_name == "clear-night")
				current_icon += "clear_night.png";
			else if(current_icon_name == "partly-cloudy-day")
				current_icon += "cloud_day.png";
			else if(current_icon_name == "partly-cloudy-night")
				current_icon += "cloud_night.png";
			else
				current_icon+= current_icon_name+".png";
			return current_icon;
		}
