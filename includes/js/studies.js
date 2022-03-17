"use strict";

// hämtar delar som skall användas från managestudies.php
let outputEl = document.getElementById("output");
let studygridEl = document.getElementById("studygrid");
let message = document.getElementById("message");
let addBtnEl = document.getElementById("addBtn");
let updateBtnEl = document.getElementById("updateBtn");

let locationInput = document.getElementById("location");
let nameInput = document.getElementById("name");
let startInput = document.getElementById("startDate");
let endInput = document.getElementById("endDate");

// gömmer uppdateringsknappen tills vidare
updateBtnEl.style.display = "none";

// event listeners
window.onload = getStudies;
addBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    addStudy();
});

// hämta tidigare studier
function getStudies() {
    outputEl.innerHTML = "";

    // fetch studies från api
    // skriver ut alla delar i tabellen samt en radera och redigera knapp
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/studies.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(study =>{
           // utskrivning i tabell för större skärmar
            outputEl.innerHTML +=
           `<tr>
                <td>${study.location}</td>
                <td>${study.name}</td>
                <td>${study.startDate}</td>
                <td>${study.endDate}</td>
                <td><button id="${study.id}" onclick="deleteStudy('${study.id}')">Radera</button></td>
                <td><button id="${study.id}" onclick="getStudyById('${study.id}', '${study.location}', '${study.name}', '${study.startDate}', '${study.endDate}')">Redigera</button></td>
           </tr>`;

           // utskrivning i en lista med grid för mindre skärmar
           studygridEl.innerHTML +=
           `<ul class="studylist">
                <li><b>Plats</b><br>${study.location}</li>
                <li><b>Utbildningsnamn</b><br>${study.name}</li>
                <li><b>Startdatum</b><br>${study.startDate}</li>
                <li><b>Slutdatum</b><br>${study.endDate}</li>
                <li><button id="${study.id}" onclick="deleteStudy('${study.id}')">Radera</button></li>
                <li><button id="${study.id}" onclick="getStudyById('${study.id}', '${study.location}', '${study.name}', '${study.startDate}', '${study.endDate}')">Redigera</button></li>
            </ul>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

// lägg till ny studie
function addStudy() {
    // lagrar input i textfälten i variabel
    let location = locationInput.value;
    let name = nameInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;
    
    // används i json.stringify
    let jsonStr = {
        'location': location, 
        'name': name, 
        'startDate': startDate, 
        'endDate': endDate
    }
    // fetch med POST till api
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/studies.php", {
        method: 'POST',
        body: JSON.stringify(jsonStr),
    })
    .then(response => { 
        response.json()
        // om text saknas i fält
        if(response.status === 400){
            message.innerHTML = "Alla fält måste fyllas i!";
            message.style.color = "red";
        } else {
            // lyckad tillägg av studie
            if(response.status === 201) {
                message.innerHTML = "Utbildningen lades till!";
                message.style.color = "green";
                successReload();
            // fel vid tillägg
            } else {
                message.innerHTML = "Utbildningen lades inte till!";
                message.style.color = "red";
            }
        }
    })
    .then(data =>{
        getStudies();
        // efter att ha hämtat om de nya tillägget töms formuläret
        locationInput.value = "";
        nameInput.value = "";
        startInput.value = "";
        endInput.value = "";
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

// hämta studie efter id
function getStudyById(id, location, name, startDate, endDate) {
    // gömmer "lägg till" knappen och visar uppdateringsknappen
    updateBtnEl.style.display = "inline";
    addBtnEl.style.display = "none";

    locationInput.value = location;
    nameInput.value = name;
    startInput.value = startDate;
    endInput.value = endDate;

    // event listener vid klick av uppdateringsknappen
    updateBtnEl.addEventListener("click", function(event) {
        event.preventDefault();
        updateStudy(id);
    });
}

// uppdatera studie
function updateStudy(id) {
    let location = locationInput.value;
    let name = nameInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;

    // används i json.stringify
    let jsonStr = {
        'location': location, 
        'name': name, 
        'startDate': startDate, 
        'endDate': endDate
    }

    // alla fält måste vara ifyllda
    if(location == "" || name == "" || startDate == "" || endDate == "") {
        message.style.color = "red";
        message.innerHTML = "Fyll i alla fält!"
    } else {
        // om fält är ifyllda, gör en PUT till valt ID
        fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/studies.php?id=" + id, {
            method: 'PUT',
            header:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(jsonStr),
        })
        .then(response => {
            response.json()
            // lyckad uppdatering av studie
            if(response.status === 200) {
                message.innerHTML = "Utbildning uppdaterad!";
                message.style.color = "green";
                successReload();
            } else {
                // fel vid uppdatering
                message.innerHTML = "Utbildning ej uppdaterad!";
                message.style.color = "red";
            }
        })
        .then(data => {
            getStudies();
            // efter uppdaterat innehåll hämtats in töms formuläret
            locationInput.value = "";
            nameInput.value = "";
            startInput.value = "";
            endInput.value = "";
        })
        .catch(error => {
            console.log('Error', error);
        })
    }
}

// ta bort studie
function deleteStudy(id) {
    // delete på valt ID
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/studies.php?id=" + id, {
        method: 'DELETE',
    })
    .then(response => {
        response.json()
        // lyckad radering
        message.innerHTML = "Radering slutförd!";
        message.style.color = "green";
        successReload();
    })
    .then(data => {
        // hämta om
        getStudies();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

// laddar om webbplatsen när lyckad uppdatering, borttagning eller tillägg skett
// 3000 millisekunder
function successReload() {
    window.setTimeout(function(){location.reload()},3000);
}