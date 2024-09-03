let fromAutoComplete, toAutoComplete,map,infoWindow;
let poly,marker;

let buttonClick = document.getElementById("directions");

buttonClick.addEventListener('click',()=>{
    document.getElementById("output").style.display="flex";
})

let myLatLng={ lat:  50.445210, lng: -104.618896 };


function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
     map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat:  50.445210, lng: -104.618896 },
    });
  
        const input1 = document.getElementById("start");

        const input2 = document.getElementById("end");

        fromAutoComplete = new google.maps.places.Autocomplete(input1);
        toAutoComplete = new google.maps.places.Autocomplete(input2);
    directionsRenderer.setMap(map);
    
  
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    document.getElementById("directions").addEventListener("click", onChangeHandler);
    //document.getElementById("end").addEventListener("change", onChangeHandler);
    document.getElementById("mode").addEventListener("change",()=>{
        calculateAndDisplayRoute(directionsService, directionsRenderer);

    })
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
  
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });

   




}


  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    /* directionsService
      .route({
        origin: {
          query: document.getElementById("start").value,
        },
        destination: {
          query: document.getElementById("end").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + e.status)); */
  
      const selectedMode= document.getElementById("mode").value;
      //create Request
      var request={
        origin:document.getElementById("start").value,
        destination:document.getElementById("end").value,
        travelMode: google.maps.TravelMode[selectedMode], //walking, bicycling and transit
        unitSystem: google.maps.UnitSystem.METRIC

        

    }

    console.log(request.travelMode[0].toUpperCase() + request.travelMode.slice(1).toLowerCase());

    //Pass the request to the route method

    directionsService.route(request,(result,status)=>{
       
       
        if(status == google.maps.DirectionsStatus.OK){
            //get distance and time

            const output=document.querySelector("#output");
            output.innerHTML=`<div class="alert-info">From: ${document.getElementById("start").value} 
                                <br> To: ${document.getElementById("end").value} 
                                <br> ${request.travelMode[0].toUpperCase() + request.travelMode.slice(1).toLowerCase()} Distance <i class="fas fa-road"></i>  ${result.routes[0].legs[0].distance.text} 
                                <br>Duration. <i class="fas fa-hourglass-start"></i> ${result.routes[0].legs[0].duration.text} </div>`;
       
         //display the routes
         directionsRenderer.setDirections(result);
        } else{
            //delete the route from the map

            directionsRenderer.setDirections({ routes: []});

            //center map in regina
            map.setCenter(myLatLng);


            //Show error when the route is invalid
            output.innerHTML = `<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i>Could not retrieve driving distance</div>`;



        }
        
        
    });

  
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  
  window.initMap = initMap;