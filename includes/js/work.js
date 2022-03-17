"use strict";

//let workUrl = 'http://localhost/webbutv3/Projekt/projektapi/work.php';
// hämtar delar som skall användas från managework.php
let outputEl = document.getElementById("output");
let workgridEl = document.getElementById("workgrid");
let message = document.getElementById("message");
let addBtnEl = document.getElementById("addBtn");
let updateBtnEl = document.getElementById("updateBtn");

let workplaceInput = document.getElementById("workplace");
let titleInput = document.getElementById("title");
let startInput = document.getElementById("startDate");
let endInput = document.getElementById("endDate");

// gömmer uppdateringsknappen tills vidare
updateBtnEl.style.display = "none";

// event listeners
window.onload = getWork;
addBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    addWork();
});

// hämta tidigare arbeten
function getWork() {
    outputEl.innerHTML = "";

    // fetch work från api
    // skriver ut alla delar i tabellen samt en radera och redigera knapp
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/work.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(work =>{
            // utskrivning i tabell för större skärmar
            outputEl.innerHTML +=
           `<tr>
                <td>${work.workplace}</td>
                <td>${work.title}</td>
                <td>${work.startDate}</td>
                <td>${work.endDate}</td>
                <td><button id="${work.id}" onclick="deleteWork('${work.id}')">Radera</button></td>
                <td><button id="${work.id}" onclick="getWorkById('${work.id}', '${work.workplace}', '${work.title}', '${work.startDate}', '${work.endDate}')">Redigera</button></td>
           </tr>`;

           // utskrivning i en lista med grid för mindre skärmar
           workgridEl.innerHTML +=
           `<ul class="worklist">
                <li><b>Arbetsplats</b><br>${work.workplace}</li>
                <li><b>Titel</b><br>${work.title}</li>
                <li><b>Startdatum</b><br>${work.startDate}</li>
                <li><b>Slutdatum</b><br>${work.endDate}</li>
                <li><button id="${work.id}" onclick="deleteWork('${work.id}')">Radera</button></li>
                <li><button id="${work.id}" onclick="getWorkById('${work.id}', '${work.workplace}', '${work.title}', '${work.startDate}', '${work.endDate}')">Redigera</button></li>
            </ul>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

// lägg till nytt arbete
function addWork() {
    // lagrar input i textfälten i variabel
    let workplace = workplaceInput.value;
    let title = titleInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;
    
    // används i json.stringify
    let jsonStr = {
        'workplace': workplace, 
        'title': title, 
        'startDate': startDate, 
        'endDate': endDate
    }
    
    // fetch med POST till api
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/work.php", {
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
            // lyckad tillägg av arbete
            if(response.status === 201) {
                message.innerHTML = "Arbetsplatsen lades till!";
                message.style.color = "green";
                successReload();
            // fel vid tillägg
            } else {
                message.innerHTML = "Arbetplatsen lades inte till!";
                message.style.color = "red";
            }
        }
    })
    .then(data =>{
        getWork();
        // efter att ha hämtat om de nya tillägget töms formuläret
        workplaceInput.value = "";
        titleInput.value = "";
        startInput.value = "";
        endInput.value = "";
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

// hämta jobb efter id
function getWorkById(id, workplace, title, startDate, endDate) {
    // gömmer "lägg till" knappen och visar uppdateringsknappen
    updateBtnEl.style.display = "inline";
    addBtnEl.style.display = "none";

    workplaceInput.value = workplace;
    titleInput.value = title;
    startInput.value = startDate;
    endInput.value = endDate;

    // event listener vid klick av uppdateringsknappen
    updateBtnEl.addEventListener("click", function(event) {
        event.preventDefault();
        updateWork(id);
    });
}

// uppdatera arbete
function updateWork(id) {
    let workplace = workplaceInput.value;
    let title = titleInput.value;
    let startDate = startInput.value;
    let endDate = endInput.value;

    // används i json.stringify
    let jsonStr = {
        'workplace': workplace, 
        'title': title, 
        'startDate': startDate, 
        'endDate': endDate
    }

    // alla fält måste vara ifyllda
    if(workplace == "" || title == "" || startDate == "" || endDate == "") {
        message.style.color = "red";
        message.innerHTML = "Fyll i alla fält!";
    } else {
        // om fält är ifyllda, gör en PUT till valt ID
        fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/work.php?id=" + id, {
            method: 'PUT',
            header:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(jsonStr),
        })
        .then(response => {
            response.json()
            // lyckad uppdatering av arbete
            if(response.status === 200) {
                message.innerHTML = "Arbetsplats uppdaterad!";
                message.style.color = "green";
                successReload();
            // fel vid uppdatering
            } else {
                message.innerHTML = "Arbetsplats ej uppdaterad!";
                message.style.color = "red";
            }
        })
        .then(data => {
            getWork();
            // efter uppdaterat innehåll hämtats in töms formuläret
            workplaceInput.value = "";
            titleInput.value = "";
            startInput.value = "";
            endInput.value = "";
        })
        .catch(error => {
            console.log('Error', error);
        })
    }
}

// ta bort arbete
function deleteWork(id) {
    // delete på valt ID
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/work.php?id=" + id, {
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
        getWork();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

// laddar om webbplatsen när lyckad uppdatering, borttagning eller tillägg skett
// 3000 millisekunder
function successReload() {
    window.setTimeout(function(){location.reload()},3000);
}