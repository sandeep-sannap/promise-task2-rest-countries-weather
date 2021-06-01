fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    process(data);
  })
  .catch((err) => console.log(err));

var container = document.getElementById("cont");
var row = document.getElementById("row");
var col = document.getElementById("col");

function process(data) {
  data.forEach((element) => {
    var countryname = element.name;
    var flag = element.flag;
    console.log(flag);
    var capital = element.capital;
    //console.log(capital)
    var region = element.region;
    //console.log(region);
    var countryname = element.name;
    //console.log(countryname);

    //Country code to be added later

    var ccode = element.alpha3Code;

    var col = document.createElement("div");
    col.setAttribute("class", "col-lg-4 col-sm-12 py-2");
    //col.setAttribute("style", "background-color:darkslategray; height:600px;width:200px;");

    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("style", "border-radius:2px");

    var title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute(
      "style",
      "text-align:center;background-color:black;color:white; padding: 5px 5px;margin:0px"
    );
    title.innerHTML = countryname;

    var img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", "flag");
    img.src = flag;
    img.setAttribute(
      "style",
      "object-fit:contain; width:100%;height:200px;margin:0px"
    );
    img.alt = "No Image";

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    cardbody.setAttribute(
      "style",
      "color:white;background-image:linear-gradient(to left, gray, lightgray);text-align:center"
    );
    cardbody.innerHTML = `<h5 class="card-text">Capital:${capital}</h5>
            <h5 class="card-text">Region:${region}</h5>
            <h5 class="card-text">Country Code:${ccode}</h5>
            <button class="btn btn-primary" onClick=weather(${element.latlng[0]},${element.latlng[1]})>Click for Weather</button>`;
    console.log(element.latlng[0]);
    console.log(element.latlng[1]);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    cardheader.setAttribute("style", "padding:0px;");

    cardheader.append(title, img);
    card.append(cardheader, cardbody);
    col.appendChild(card);
    row.appendChild(col); //
  });
}

var key = "82701ccc278e598ae3fe8a6c796d095a";

function weather(lat, lang) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=${key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(`
        Temperature - ${data.main.temp} Cel
        Humidity - ${data.main.humidity} %
        Pressure - ${data.main.pressure} Pa
        Weather - ${data.weather[0].main}
        Description-${data.weather[0].description}`);
      //   console.log(data);
    })
    .then((err) => {
      console.log(err);
    });
}
