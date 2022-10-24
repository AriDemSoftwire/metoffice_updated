
function getForecast(location) {

  fetch(`http://localhost:3000/public/forecast/${location}`)
    .then(dat => {
      //checking if the status code is OK
      if(dat.status === 200)
      {
        return dat.json();
      }
      else
      {
          showErrorMessage();
          return;
      }
    })
    .then(res => {
      updateForecast(res, location);
    })
}

// Updates the forecast on the page with the data
function updateForecast(data, location) {
  document.querySelector("#location").innerHTML = `${location}`;
  document.querySelector("#feelsLike").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].F}`;
  document.querySelector("#windGust").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].G}`;
  document.querySelector("#relativeHumidity").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].H}`;
  document.querySelector("#temperature").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].T}`;
  document.querySelector("#visibility").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].V}`;
  document.querySelector("#windDirection").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].D}`;
  document.querySelector("#windSpeed").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].S}`;
  document.querySelector("#maxUV").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].U}`;
  document.querySelector("#weatherType").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].W}`;
  document.querySelector("#precipitationProbability").innerHTML = `${data.SiteRep.DV.Location.Period[0].Rep[0].Pp}`;

}

function showErrorMessage()
{
  alert("Location invalid!");
}