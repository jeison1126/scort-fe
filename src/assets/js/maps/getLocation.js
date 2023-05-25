$().ready(() => {

});


var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
//   localStorage.setItem('lonbox', point.lng().toFixed(6));
}

function showPosition(position) {
    sessionStorage.setItem('latbsr', position.coords.latitude);
    sessionStorage.setItem('lonbsr', position.coords.longitude);
}