// JavaScript-fil for behandling av kino-billett bestillinger. Oblig 1. - 06.02.2024 - s371394

// Funksjonen kalles når siden er lastet inn.:
$(function () {
    console.log("Ready");

    // Henter og viser alle registrerte filmer som en option under filmer.
    getFilmOptionsFromServer();

    // Funksjonalitet ved submit av form. Konstruering av kinobillett og post.
    let registerForm = document.getElementById("kinoBillettForm");
    registerForm.addEventListener('submit', function(event){

        // Prevents reload on submit
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

        // Fjerner tekst fra input-felt.
        $("#inputAntall").val("");
        $("#inputFornavn").val("");
        $("#inputEtternavn").val("");
        $("#inputTelefonnr").val("");
        $("#inputEpost").val("");

        console.log(billettÅRegistrere);


        postBestillingToServer(billettÅRegistrere);
    });
})

function postBestillingToServer (billettToSend) {
    if (billettToSend != null) {
        $.post("http://localhost:8080/postKinoBillett", billettToSend)
            .done(function() {
                // Passer på å ikke kalle funksjonen før det asynkrone kallet er gjennomført.
                showAlleBestillinger();
            })
    }
}

// Kalles ved hver "endring". Henter arrayet og lister elementer på siden.
function showAlleBestillinger() {
    let alleBestillingerHtmlText = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>"

    $.get("http://localhost:8080/getRegistrerteBilletter", function(data) {
        if (Array.isArray(data)) {
            data.forEach(function(billett) {
                if(billett) {
                    alleBestillingerHtmlText += "<tr><td>" + billett.film + "</td>" +
                        "<td>" + billett.antall + "</td><td>" + billett.fornavn + "</td>" +
                        "<td>" + billett.etternavn + "</td><td>" + billett.telefonNr + "</td>"
                        + "<td>" + billett.epost + "</td></tr>";
                }
            });
            console.log(alleBestillingerHtmlText)
            $("#tableShowAlleFilmer").html(alleBestillingerHtmlText)
        }
    })
}

// Sender instruksjon om å slette alle array-elementer på server.
function deleteAllBilletterOnServer() {
    $.get("http://localhost:8080/getDeleteAllRegistrerteBilletter");
    console.log("Instruks om å slette alle billetter sendt.")
    showAlleBestillinger();
}

function getFilmOptionsFromServer() {
    // Henter tilgjengelige filmer og befolker film-options.
    $.get("http://localhost:8080/getTilgjengeligeFilmer", function(data) {
        let optionsFilm = document.getElementById("inputValgtFilm");
        data.forEach(function(film) {
            if (film != null) {
                optionsFilm.innerHTML += "<option>"+film+"</option>";
            }
        })
    })
}




/*
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
