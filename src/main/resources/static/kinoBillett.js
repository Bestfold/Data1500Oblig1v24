// JavaScript-fil for behandling av kino-billett bestillinger. Oblig 1. - 06.02.2024 - s371394

// Funksjonen kalles når siden er lastet inn.:
$(function ()
{
    console.log("Ready");

    // Henter og viser alle registrerte filmer som en option under filmer.
    getFilmOptionsFromServer();

    // Funksjonalitet ved submit av form. Konstruering av kinobillett og post.
    let registerForm = document.getElementById("kinoBillettForm");
    registerForm.addEventListener('submit', function(event)
    {

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

function postBestillingToServer (billettToSend)
{
    if (billettToSend != null)
    {
        $.post("http://localhost:8080/postKinoBillett", billettToSend)
            .done(function()
            {
                // Passer på å ikke kalle funksjonen før det asynkrone kallet er gjennomført.
                showAlleBestillinger();
            })
    }
}

// Kalles ved hver "endring". Henter arrayet og lister elementer på siden.
function showAlleBestillinger()
{
    let alleBestillingerHtmlText = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>"

    $.get("http://localhost:8080/getRegistrerteBilletter", function(data)
    {
        if (Array.isArray(data))
        {
            data.forEach(function(billett)
            {
                if(billett)
                {
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
function deleteAllBilletterOnServer()
{
    $.get("http://localhost:8080/getDeleteAllRegistrerteBilletter")

        // Siden $.get er asynkron benyttes .done for å sørge for at registrerte billetter
        // vises ETTER at server har fått utført get-requesten.
        .done(function()
            {
            console.log("Instruks om å slette alle billetter sendt.");
            showAlleBestillinger();
           });
}

function getFilmOptionsFromServer()
{
    // Henter tilgjengelige filmer og befolker film-options.
    $.get("http://localhost:8080/getTilgjengeligeFilmer", function(data)
    {
        let optionsFilm = document.getElementById("inputValgtFilm");
        data.forEach(function(film)
        {
            if (film != null)
            {
                optionsFilm.innerHTML += "<option>"+film+"</option>";
            }
        })
    })
}