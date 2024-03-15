// JavaScript-fil for behandling av kino-billett bestillinger. Oblig 1. - 06.02.2024 - s371394

// Tester jQuery library link:
$(function () {
    console.log("Redå");
})

// Oppretter et array for hver bestillings-objekt som opprettes.
let bestillingerArray = [];


let registerForm = document.getElementById("kinoBillettForm");
registerForm.addEventListener('submit', function(event){
    event.preventDefault();

    let inputFilm = $("#inputValgtFilm").val();
    let inputAntall = $("#inputAntall").val();
    let inputFornavn = $("#inputFornavn").val();
    let inputEtternavn = $("#inputEtternavn").val();
    let inputTelefonnr = $("#inputTelefonnr").val();
    let inputEpost = $("#inputEpost").val();

    let billettÅRegistrere = {
        film: inputFilm,
        antall: inputAntall,
        fornavn: inputFornavn,
        etternavn: inputEtternavn,
        telefonNr: inputTelefonnr,
        epost: inputEpost
    }

    console.log(billettÅRegistrere);
});





/*

// Kaller alle check-funksjoner, oppretter billett-objekt og legger til i bestillingerArray.
// Fjerner all tekst fra felt ved trykk, slik at ny bestilling kan legges til.
function createBestilling () {
    let film = $("#inputValgtFilm").val();
    //document.getElementById("inputValgtFilm").value;
    let antall = checkInputFilmAmount();
    let fornavn = checkInputNavn("inputFornavn");
    let etternavn = checkInputNavn("inputEtternavn");
    let telefonnr = checkInputTelefonnr();
    let epost = checkInputEpost();

    let objectBestilling = {
        Film: film,
        Antall: antall,
        Fornavn: fornavn,
        Etternavn: etternavn,
        Telefonnr: telefonnr,
        Epost: epost
    }
    // Passer på at ingen av check-funksjonene har returnert null.
    if (objectBestilling.Antall !== "" && objectBestilling.Fornavn !== "" &&
        objectBestilling.Etternavn !== "" && objectBestilling.Telefonnr !== "" &&
        objectBestilling.Epost !== "")
    {
        // Pusher objektet i array-en.
        bestillingerArray.push(objectBestilling);

        // Fjerner tekst fra input-felt.
        $("#inputAntall").val("");
        $("#inputFornavn").val("");
        $("#inputEtternavn").val("");
        $("#inputTelefonnr").val("");
        $("#inputEpost").val("");
        //document.getElementById("inputAntall").value = "";
        //document.getElementById("inputFornavn").value = "";
        //document.getElementById("inputEtternavn").value = "";
        //document.getElementById("inputTelefonnr").value = "";
        //document.getElementById("inputEpost").value = "";

        // Printer alle bestillinger.
        showAllBestillinger()
    }
}

// Sletter alle elementer i bestillingerArray.
function deleteAllBestillinger () {
    bestillingerArray = [];
    $("#tableShowAlleFilmer").html("");
    //document.getElementById("tableShowAlleFilmer").innerHTML = "";
}

// Viser alle objekter i bestillingerArray ved å legge inn verdiene inn i HTML-tabell.
function showAllBestillinger () {
    let alleBestillingerHtmlText = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>"

    for (let i = 0; i < bestillingerArray.length; i++) {
        alleBestillingerHtmlText += "<tr><td>"+bestillingerArray[i].Film+"</td>" +
            "<td>"+bestillingerArray[i].Antall+"</td><td>"+bestillingerArray[i].Fornavn+"</td>" +
            "<td>"+bestillingerArray[i].Etternavn+"</td><td>"+bestillingerArray[i].Telefonnr+"</td>"
            +"<td>"+bestillingerArray[i].Epost+"</td></tr>";
    }
    $("#tableShowAlleFilmer").html(alleBestillingerHtmlText);
    //document.getElementById("tableShowAlleFilmer").innerHTML = alleBestillingerHtmlText;
}

// Designer sjekk-funksjoner separat slik at de i større grad skal kunne brukes selv om nettsiden
// må endres.

// Tar inn antall filmer, returnerer antallet. Returnerer tom string om tallet er > 20, tall < 1
// eller tomt felt. Viser error-melding i felt ved false.
function checkInputFilmAmount () {
    let inputAmount = $("#inputAntall").val();
    //document.getElementById("inputAntall").value;
    let errorAmount = "Vennligst velg et gyldig antall billetter."
    if (inputAmount > 20 || inputAmount < 1 || inputAmount == null || isNaN(Number(inputAmount))) {
        $("#errorManglerAntall").html(errorAmount);
        //document.getElementById("errorManglerAntall").innerHTML = errorAmount;
        return "";
    } else {
        $("#errorManglerAntall").html("");
        //document.getElementById("errorManglerAntall").innerHTML = "";
        return inputAmount;
    }
}

// Tar inn étt navn. Enten fornavn eller etternavn. Returnerer navn. Returnerer tom string ved
// tomt felt eller tall/symbol. Viser error-melding i felt ved false.
function checkInputNavn (elementId) {
    let inputNavn = $("#"+elementId+"").val(); //document.getElementById(elementId).value;
    let errorNavn = "Vennligst skriv et gyldig navn.";
    if (!isNaN(Number(inputNavn)) || inputNavn == null || inputNavn === "") {
        if (elementId === "inputFornavn") {
            $("#errorManglerFornavn").html(errorNavn);
            //document.getElementById("errorManglerFornavn").innerHTML = errorNavn;
        } else {
            $("#errorManglerEtternavn").html(errorNavn);
            //document.getElementById("errorManglerEtternavn").innerHTML = errorNavn;
        }
        return "";

    } else {
        // Resetter feilmelding
        if (elementId === "inputFornavn") {
            $("#errorManglerFornavn").html("");
            //document.getElementById("errorManglerFornavn").innerHTML = "";
        } else {
            $("#errorManglerEtternavn").html("");
            //document.getElementById("errorManglerEtternavn").innerHTML = "";
        }
        // Returnerer navnet.
        return inputNavn;
    }
}

// Tar inn telefonnr, returnerer nummer som int. Returnerer tom string ved lengde > 8 tall,
// tall < 0 og om felt tomt. Viser error-melding i felt ved false.
function checkInputTelefonnr () {
    let inputTelefonnr = $("#inputTelefonnr").val();
    //document.getElementById("inputTelefonnr").value;
    let errorTelefonnr = "Vennligst skriv et gyldig telefonnummer.";
    if (isNaN(Number(inputTelefonnr)) || inputTelefonnr < 1 || inputTelefonnr == null ||
        inputTelefonnr.length < 8) {
        $("#errorManglerTelefonnr").html(errorTelefonnr);
        //document.getElementById("errorManglerTelefonnr").innerHTML = errorTelefonnr;
        return "";
    } else {
        $("#errorManglerTelefonnr").html("");
        //document.getElementById("errorManglerTelefonnr").innerHTML = "";
        return inputTelefonnr;
    }
}

// Tar inn epost, returnerer epost. Returnerer tom string om mangler "@",minst én "." og tomt felt.
// Viser error-melding i felt ved false.
function checkInputEpost () {
    let inputEpost = $("#inputEpost").val();
    //document.getElementById("inputEpost").value;
    let errorEpost = "Vennligst skriv en gyldig epost-adresse";
    if (inputEpost == null  || !inputEpost.includes("@") ||
        !inputEpost.includes("."))
    {
        $("#errorManglerEpost").html(errorEpost);
        //document.getElementById("errorManglerEpost").innerHTML = errorEpost;
        return "";
    } else {
        $("#errorManglerEpost").html("");
        //document.getElementById("errorManglerEpost").innerHTML = "";
        return inputEpost;
    }
}
*/