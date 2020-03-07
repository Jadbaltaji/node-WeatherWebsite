const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messagetwo = document.querySelector("#msg-2");



//GET CURRENT LOCATION
document.getElementById('button').addEventListener("click", function(e){
  e.preventDefault()
  navigator.geolocation.getCurrentPosition((location)=>{
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    location=longitude+','+latitude
    messageOne.textContent = "Loading...";
    messagetwo.textContent = "";

  fetch("/weather?search=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messagetwo.textContent = data.forecast;
      }
    });
  });
  })
})
 
//SEARCH FORM
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messagetwo.textContent = "";

  fetch("/weather?search=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messagetwo.textContent = data.forecast;
      }
    });
  });
});
