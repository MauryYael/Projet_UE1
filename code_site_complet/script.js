console.log("hello world");
const updatePrixInput = document.getElementById("prixcarteinput");
const updatePrixButton = document.getElementById("btncarte");
const boutonpanier = document.getElementById("boutonpanierid");
const overlaypanier = document.getElementById("overlaypanierid");
const total = document.getElementById("total");
const reinitialiser = document.getElementById("btnréinitialiser");
let updatePrix = "";
const divcarte50afficher = document.getElementById("div50");
const divcarte100afficher = document.getElementById("div100");
let numerocarte50 = document.getElementById("numero50");
let numerocarte100 = document.getElementById("numero100");
const urlmeteo =
  "https://marine-api.open-meteo.com/v1/marine?latitude=41.93597538014104&longitude=8.619873554702684&current=wave_height,wind_wave_direction";
const urlvent =
  "https://api.open-meteo.com/v1/forecast?latitude=41.93597538014104&longitude=8.619873554702684&current=wind_speed_10m";
//#region meteo
if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/"
) {
  async function conditionsMeteo() {
    const elements = await fetch(urlmeteo);
    const infos = await elements.json();
    const elementsevent = await fetch(urlvent);
    const infosvent = await elementsevent.json();
    const direction = infos.current.wind_wave_direction;
    document.getElementById(
      "vagueId"
    ).innerText = `${infos.current.wave_height} m`;
    document.getElementById(
      "vitesseVentId"
    ).innerText = `${infosvent.current.wind_speed_10m}Km/h`;

    if (direction >= 337.5 || direction < 22.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/Nfleche.png";
      document.getElementById("cardinalId").innerText = "Nord";
    } else if (direction >= 22.5 && direction < 67.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/NEfleche.png";
      document.getElementById("cardinalId").innerText = "Nord-Est";
    } else if (direction >= 67.5 && direction < 112.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/Efleche.png";
      document.getElementById("cardinalId").innerText = "Est";
    } else if (direction >= 112.5 && direction < 157.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/SEfleche.png";
      document.getElementById("cardinalId").innerText = "Sud-Est";
    } else if (direction >= 157.5 && direction < 202.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/Sfleche.png";
      document.getElementById("cardinalId").innerText = "Sud";
    } else if (direction >= 202.5 && direction < 247.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/SOfleche.png";
      document.getElementById("cardinalId").innerText = "Sud-Ouest";
    } else if (direction >= 247.5 && direction < 292.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/Ofleche.png";
      document.getElementById("cardinalId").innerText = "Ouest";
    } else if (direction >= 292.5 && direction < 337.5) {
      document.getElementById("boussoleId").src = "imgsite/meteo/NOfleche.png";
      document.getElementById("cardinalId").innerText = "Nord-Ouest";
    }
    console.log(infos);
    console.log(direction);
  }
  conditionsMeteo();
}
//#endregion
//#region panier
boutonpanier.addEventListener("click", () => {
  overlaypanier.classList.toggle("disparu");
});

let totalAsString = localStorage.getItem("total");
if (totalAsString === null) {
  localStorage.setItem("total", "0");
  totalAsString = "0";
}
total.innerText = `Total : ${totalAsString}`;

let totalPrice = parseInt(totalAsString);
let nombrecarte50str = localStorage.getItem("cartes50");
let nombrecarte50 = parseInt(nombrecarte50str);
let nombrecarte100str = localStorage.getItem("cartes100");
let nombrecarte100 = parseInt(nombrecarte100str);
const pastilleValue = document.getElementById("pastillevaleur");
let nombreArticles = nombrecarte100 + nombrecarte50;
console.log(nombrecarte50);
console.log(nombrecarte100);
console.log(nombreArticles);

function afficherPastille() {
  nombreArticles = nombrecarte100 + nombrecarte50;

  if (nombreArticles !== 0) {
    pastilleValue.classList.remove("disparu");
    pastilleValue.innerText = `${nombreArticles}`;
  } else {
    pastilleValue.classList.add("disparu");
  }
}
function afficheroupasaudebut() {
  if (isNaN(nombrecarte50)) {
    localStorage.setItem("cartes50", "0");
    nombrecarte50 = 0;
  }
  if (isNaN(nombrecarte100)) {
    localStorage.setItem("cartes100", "0");
    nombrecarte100 = 0;
  }

  if (nombrecarte50 !== 0) {
    numerocarte50.innerText = `x ${nombrecarte50}`;
    divcarte50afficher.classList.remove("disparu");
  } else {
    console.log(444);
  }

  if (nombrecarte100 !== 0) {
    numerocarte100.innerText = `x ${nombrecarte100}`;
    divcarte100afficher.classList.remove("disparu");
  } else {
    console.log(555);
  }
}
reinitialiser.addEventListener("click", () => {
  localStorage.setItem("total", "0");
  totalAsString = localStorage.getItem("total");

  total.innerText = `Total : ${totalAsString}`;
  nombrecarte50 = 0;
  numerocarte50.innerText = `x ${nombrecarte50}`;
  nombrecarte100 = 0;
  numerocarte100.innerText = `x ${nombrecarte100}`;
  divcarte50afficher.classList.add("disparu");
  divcarte100afficher.classList.add("disparu");
  localStorage.setItem("cartes50", "0");
  localStorage.setItem("cartes100", "0");
  afficherPastille();
});
afficheroupasaudebut();
if (window.location.pathname.includes("boutique.html")) {
  updatePrixButton.addEventListener("click", (X) => {
    updatePrix = parseInt(updatePrixInput.value);
    totalAsString = localStorage.getItem("total");
    totalPrice = parseInt(totalAsString);
    totalPrice += updatePrix;
    console.log(totalPrice);
    totalAsString = totalPrice.toString();
    total.innerText = `Total : ${totalAsString}`;
    localStorage.setItem("total", totalAsString);

    if (updatePrixInput.value === "50") {
      divcarte50afficher.classList.remove("disparu");
      nombrecarte50 += 1;
      numerocarte50.innerText = `x ${nombrecarte50}`;
      localStorage.setItem("cartes50", nombrecarte50);
    }
    if (updatePrixInput.value === "100") {
      divcarte100afficher.classList.remove("disparu");
      nombrecarte100 += 1;
      numerocarte100.innerText = `x ${nombrecarte100}`;
      localStorage.setItem("cartes100", nombrecarte100);
    }
    updatePrixInput.value = "0";

    afficherPastille();
  });
}
afficherPastille();
//#endregion
//#region formulaire
if (window.location.pathname.includes("reserver.html")) {
  const expérienceinput = document.getElementById("expérienceinputid");
  const locationinput = document.getElementById("locationinputid");
  const activitéinput = document.getElementById("activitéinputid");
  const valeurselectlocation = document.getElementById("selectlocationid");
  const valeurselectactivité = document.getElementById("selectactivitéid");
  const nameinput = document.getElementById("nameinputid");
  const firstnameinput = document.getElementById("firstnameinputid");
  const emailinput = document.getElementById("emailinputid");
  const messageinput = document.getElementById("messageinputid");
  const nbpersonnesinput = document.getElementById("nbpersonnesinput");
  const btnenvoyerformulaire = document.getElementById("boutonformulaireid");

  const alertename = document.getElementById("alertname");
  const alertefirstname = document.getElementById("alertfirstname");
  const alertemail = document.getElementById("alertemail");
  const alerteexpérience = document.getElementById("alertexpérience");
  const alertelocation = document.getElementById("alertlocation");
  const alerteactivité = document.getElementById("alertactivité");
  const alertenbpersonnes = document.getElementById("alertnbpersonnes");
  const alertemessages = document.getElementById("alertmessage");
  const notifvalidation = document.getElementById("notifvalide");
  console.log(notifvalidation);
  const notifinvalidation = document.getElementById("notifinvalide");
  const objetformulaire = {
    Prénom: "XXXX",
    Nom: "Jean",
    email: "jojo@",
    TypeDeRéservation: "exp",
    reservation: "ddd",
    NombreDePersonnes: "8",
    MessageDeReservation: "ygyg",
  };

  function verifdesexpériences() {
    locationinput.classList.add("disparu");
    activitéinput.classList.add("disparu");
    if (expérienceinput.value === "location") {
      locationinput.classList.remove("disparu");
    }
    if (expérienceinput.value === "activité") {
      activitéinput.classList.remove("disparu");
    }
    if (expérienceinput.value === "") {
      locationinput.classList.add("disparu");
      activitéinput.classList.add("disparu");
    }
  }
  expérienceinput.addEventListener("change", () => {
    verifdesexpériences();
  });

  nameinput.addEventListener("keyup", (event) => {
    nameinput.classList.remove("actif");
    if (nameinput.value !== "") {
      nameinput.classList.add("valide");
    }
    if (event.key === "Enter") {
      if (nameinput.value === "") {
        nameinput.classList.add("invalide");
      }
      nameinput.blur();
    }
  });

  nameinput.addEventListener("click", (event) => {
    nameinput.classList.remove("invalide");
    nameinput.classList.add("actif");
  });
  firstnameinput.addEventListener("keyup", (event) => {
    firstnameinput.classList.remove("actif");

    if (firstnameinput.value !== "") {
      firstnameinput.classList.add("valide");
    }
    if (event.key === "Enter") {
      if (firstnameinput.value === "") {
        firstnameinput.classList.add("invalide");
      }
      firstnameinput.blur();
    }
  });

  firstnameinput.addEventListener("click", (event) => {
    firstnameinput.classList.remove("invalide");

    firstnameinput.classList.add("actif");
  });
  emailinput.addEventListener("keyup", (event) => {
    emailinput.classList.remove("actif");
    if (emailinput.value !== "" && emailinput.value.includes("@")) {
      emailinput.classList.remove("invalide");
      emailinput.classList.add("valide");
    } else {
      emailinput.classList.add("invalide");
    }
    if (event.key === "Enter") {
      if (emailinput.value === "") {
        emailinput.classList.add("valide");
      }
      emailinput.blur();
    }
  });
  emailinput.addEventListener("click", (event) => {
    emailinput.classList.remove("invalide");
    emailinput.classList.add("actif");
  });

  btnenvoyerformulaire.addEventListener("click", (event) => {
    alertename.classList.add("disparu");
    alertefirstname.classList.add("disparu");
    alertemail.classList.add("disparu");
    alerteexpérience.classList.add("disparu");
    alertelocation.classList.add("disparu");
    alerteactivité.classList.add("disparu");
    alertenbpersonnes.classList.add("disparu");
    alertemessages.classList.add("disparu");

    if (nameinput.classList.contains("invalide") || nameinput.value === "") {
      alertename.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (
      firstnameinput.classList.contains("invalide") ||
      firstnameinput.value === ""
    ) {
      alertefirstname.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (
      emailinput.classList.contains("invalide") ||
      emailinput.value === ""
    ) {
      alertemail.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (expérienceinput.value === "") {
      alerteexpérience.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (
      expérienceinput.value === "location" &&
      valeurselectlocation.value === ""
    ) {
      alertelocation.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (
      expérienceinput.value === "activité" &&
      valeurselectactivité.value === ""
    ) {
      alerteactivité.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (nbpersonnesinput.value === "") {
      alertenbpersonnes.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else if (messageinput.value === "") {
      alertemessages.classList.remove("disparu");
      notifinvalidation.classList.add("apparition");
      setTimeout(() => {
        notifinvalidation.classList.remove("apparition");
      }, 1500);
    } else {
      objetformulaire.Prénom = firstnameinput.value;
      objetformulaire.Nom = nameinput.value;
      objetformulaire.email = emailinput.value;
      objetformulaire.TypeDeRéservation = expérienceinput.value;
      objetformulaire.NombreDePersonnes = nbpersonnesinput.value;
      objetformulaire.MessageDeReservation = messageinput.value;
      if (expérienceinput.value === "location")
        objetformulaire.reservation = valeurselectlocation.value;
      if (expérienceinput.value === "activité")
        objetformulaire.reservation = valeurselectactivité.value;
      console.log(objetformulaire);
      notifvalidation.classList.add("apparition");
      setTimeout(() => {
        notifvalidation.classList.remove("apparition");
      }, 1500);
    }
  });
}
//#endregion
