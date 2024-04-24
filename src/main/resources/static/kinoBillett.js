// JavaScript-fil for handling kino-billett sale and registering.
// Oblig 1 to 3. - 06.02.2024 - s371394


// Directs user to Bestilling-page and tells Controller what film has been chosen.
function directToBestilling(titleSimple)
{
    // Storing the chosen film in sessionStorage, in order to use it in the "bestilling"-page.
    sessionStorage.setItem('chosenFilm', titleSimple);

    window.location.href = "bestilling.html";
}

// Ready function. Divided between the index page and "bestilling" page as there is
// different functionality.
$(function ()
{

    // ---  INDEX PAGE   ---

    console.log("Ready");
    let pathname = window.location.pathname;

    // Checks for page-url to be index
    if (pathname === "/" || pathname.endsWith("index.html")) {
        console.log("Ready at index.html or root");

        // Provides all available films on index.html.
        getFilmOptionsFromServer();
    }

    // ---  BESTILLING PAGE    ---

    // Checks for page-url to be bestilling.
    if (pathname.endsWith("bestilling.html"))
    {
        // Retrieves stored film-value chosen at index page.
        chosenFilm = "" + sessionStorage.getItem('chosenFilm');
        console.log("Chosen film:" );
        console.log(chosenFilm);

        // Retrieve AvailableFilms-object from DB based on film-name.
        let filmObject;

        $.get("/getAvailableFilmsByTitleSimple?titleSimple="+chosenFilm)
            .done(function(data)
                {
                    filmObject = data;
                    console.log(filmObject);
                    populateBestillingPage(data);
                }
            ).fail(function()
        {
            // Error handling in the case that film chosen at index didn't retrieve at bestilling.
            alert("An error has occured, you will be returned to the home page");
            console.error("ERROR: getAvailableFilmsByTitleSimple failed, filmObject not given value ");
            console.log("ERROR: getAvailableFilmsByTitleSimple failed, filmObject not given value");

            // Redirects to index.html
            window.location.href ="index.html";
        });
    }
})



// Gets all available films and populates on the index page.
function getFilmOptionsFromServer()
{
    // Gets available films from DB and fills index with options.
    $.get("http://localhost:8080/getAvailableFilms", function(data)
    {
        let filmerHtmlString = "";

        if (Array.isArray(data))
        {
            let optionsFilm = document.getElementById("filmButtons");
            data.forEach(function(filmFromDB)
            {
                if (filmFromDB != null)
                {
                    // Adding HTML-elemets for each film.
                    filmerHtmlString +=
                        "<div id='"+ filmFromDB.titleSimple +"' style='padding: 5%'>"+
                        "<h2>" + filmFromDB.film + "</h2>" +
                        "<br>" +
                        "<img src='"+filmFromDB.imageUrl+"' style='max-width: 40%'" +
                        "class='img-fluid' id='"+filmFromDB.titleSimple+"Image'>" +
                        "<br>" +
                        "<br>" +
                        "<button class='btn btn-primary' onclick='directToBestilling(" +
                        "\""+filmFromDB.titleSimple+"\")'>" +' Bestill billetter '+"</button>" +
                        "<br>" +
                        "<br>" +
                        "<br><hr style=\"height:40px;border-width:0;color:dimgray;" +
                        "background-color:dimgray\">" +
                        "</div>";
                }
            })
            optionsFilm.innerHTML = filmerHtmlString;
        }
    })
}


// Populates Bestilling-page with details about the chosen film, and a sumbit-form.
function populateBestillingPage (filmObject)
{
    // The films title shows up on the Bestilling page.
    document.getElementById("filmPortrayal").innerHTML =
        "<h1>" + filmObject.film + "</h1>" +
        "<br>" +
        "<br>" +
        "<img src='"+filmObject.imageUrl+"' style='max-width: 30%'" +
        "class='img-fluid' id='" +filmObject.titleSimple+ "Image'>" +
        "<br>" +
        "<br>" +
        "<p>Tittelkode: " + filmObject.titleSimple + ".</p>" +
        "<p>Avspillingstid: " + filmObject.hours + " timer.</p>" +
        "<br>";


    // Functionality when sumbitting form.
    let registerForm = document.getElementById("kinoBillettForm");
    registerForm.addEventListener('submit', function(event)
    {
        // Prevents reload on submit
        event.preventDefault();

        // Obtaining submittet values.
        let inputFilm = filmObject.film;
        let inputAntall = $("#inputAntall").val();
        let inputFornavn = $("#inputFornavn").val();
        let inputEtternavn = $("#inputEtternavn").val();
        let inputTelefonnr = $("#inputTelefonnr").val();
        let inputEpost = $("#inputEpost").val();

        // Constructing a KinoBillett from submitted values.
        let billettToRegister = {
            film: inputFilm,
            antall: inputAntall,
            fornavn: inputFornavn,
            etternavn: inputEtternavn,
            telefonNr: inputTelefonnr,
            epost: inputEpost
        }

        // Ensures that input fields are empty when submission has succeded.
        $("#inputAntall").val("");
        $("#inputFornavn").val("");
        $("#inputEtternavn").val("");
        $("#inputTelefonnr").val("");
        $("#inputEpost").val("");

        console.log(billettToRegister);

        postBestillingToServer(billettToRegister);
    });
}

// Posts a newly submittet billett to DB.
function postBestillingToServer (billettToSend)
{
    if (billettToSend != null)
    {
        $.post("http://localhost:8080/postKinoBillett", billettToSend)
            .done(function()
            {
                // Makes sure to call function AFTER the asynchronous post is finished.
                showAlleBestillinger();
            })
    }
}

// Populates a table showing all the registered billetter from DB
function showAlleBestillinger()
{
    let alleBestillingerHtmlText = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Edit</th></tr>"

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
                        "<td>" + billett.etternavn + "</td><td>" + billett.telefonNr + "</td>" +
                        "<td>" + billett.epost + "</td>" +
                        "<td><button class='btn btn-primary' " +
                        "onclick='getKinoBillettToUpdate("+ billett.id +")'>edit</button>" +
                        "<button class='btn btn-danger' " +
                        "onclick='deleteBillettById(" + billett.id + ")'>delete</button></td></tr>";
                }
            });
            //console.log(alleBestillingerHtmlText)

            // Populates a table showing all the registered billetter from DB
            $("#tableShowAllBilletter").html(alleBestillingerHtmlText)
        }
    })
}

// Sends instructions to delete all registered billetter in DB.
function deleteAllBilletterOnServer()
{
    // There are no $.delete functions in jQuery, so a custom ajax-call is created.
    $.ajax({
        url: "http://localhost:8080/deleteAllRegistrerteBilletter",
        type: 'DELETE',
        success: function(result)
        {
            console.log(result);
            showAlleBestillinger();
        }
    })
}

// Deletes KinoBillett by id.
function deleteBillettById (id)
{
    // There are no $.delete functions in jQuery, so a custom ajax-call is created.
    $.ajax({
        url: "/deleteBillettById?id="+id,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
            showAlleBestillinger();
        }
    })
}

// Gets registered billett by id so that it can be edited and updated in DB.
function getKinoBillettToUpdate (id)
{
    let billettToEdit = $.get("/getBillettById?id=" + id).done(function(data) {

        console.log("Data from getBillettById in billett-editing: " + data);

        let editedBillett;

        // Inserts a html row with inputfields to the html-table showing Bestillinger.

        let filmerHtmlString = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
            "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Edit</th></tr>" +
            "<tr>" +
            "<td><p id='editingBillettFilm'></p></td>" +
            "<td><input type='text' required id='inputEditAntall' " +
            "style='width: 30px;' pattern='^[0-9]{1,3}'></td>" +
            "<td><input type='text' required id='inputEditFornavn' " +
            "style='width: 100px;' pattern='[a-zæøåA-ZÆØÅ]{2,16}'></td>" +
            "<td><input type='text' required id='inputEditEtternavn' " +
            "pattern='[a-zæøåA-ZÆØÅ]{2,16}'></td>" +
            "<td><input type='text' required id='inputEditTelefonNr' " +
            "style='width: 80px;' pattern='[0-9]{8}'></td>" +
            "<td><input type='text' required id='inputEditEpost'></td>" +
            "<td><button class='btn btn-primary' onclick='putKinoBillettById(" + data.id + ")'> " +
            "Confirm </button></td>" +
            "</tr>";

        // Appends row to table.
        $("#tableShowAllBilletter").html(filmerHtmlString);

        // Provides info of billett to edit.
        $("#editingBillettFilm").html(data.film);
        $("#inputEditAntall").val(data.antall);
        $("#inputEditFornavn").val(data.fornavn);
        $("#inputEditEtternavn").val(data.etternavn);
        $("#inputEditTelefonNr").val(data.telefonNr);
        $("#inputEditEpost").val(data.epost);
    })
}


// Updates KinoBillett with object with same id.
function putKinoBillettById (id)
{
    // Creating object out of values in editing:
    let editedBillett = {
        id: id,
        film: $("#editingBillettFilm").html(),
        antall: $("#inputEditAntall").val(),
        fornavn: $("#inputEditFornavn").val(),
        etternavn: $("#inputEditEtternavn").val(),
        telefonNr: $("#inputEditTelefonNr").val(),
        epost: $("#inputEditEpost").val()
    }
    console.log(editedBillett);

    // Directs editedBileltt towards DB to update row with same id. Custom ajax-call used for
    // same reason as delete, there are no jQuery $.put-calls.
    $.ajax({
        url: "/putBillettToDB",
        type: 'PUT',

        // The following is a way to make sure the content is sent using json, and that the
        // object sent is converted to json-format. This implementation is taken from ChatGPT.
        contentType: 'application/json',
        data: JSON.stringify(editedBillett),

        success: function(result) {
            console.log(result);
            showAlleBestillinger();
        }
    })
}