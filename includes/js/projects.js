"use strict";

// hämtar delar som skall användas från manageprojects.php
let outputEl = document.getElementById("output");
let projectgridEl = document.getElementById("projectgrid");
let message = document.getElementById("message");
let addBtnEl = document.getElementById("addBtn");
let updateBtnEl = document.getElementById("updateBtn");

let titleInput = document.getElementById("title");
let urlInput = document.getElementById("url");
let descriptionInput = document.getElementById("description");

// gömmer uppdateringsknappen tills vidare
updateBtnEl.style.display = "none";

// event listeners
window.onload = getProjects;
addBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    addProject();
});

// hämta projekt
function getProjects() {
    outputEl.innerHTML = "";

    // fetch projects från api
    // skriver ut alla delar i tabellen samt en radera och redigera knapp
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/projects.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(project =>{
           // utskrivning i tabell för större skärmar
            outputEl.innerHTML +=
           `<tr>
                <td>${project.title}</td>
                <td><a href="${project.url}">Länk till webbplats</a></td>
                <td class="projectdesc">${project.description}</td>
                <td><button id="${project.id}" onclick="deleteProject('${project.id}')">Radera</button></td>
                <td><button id="${project.id}" onclick="getProjectById('${project.id}', '${project.title}', '${project.url}', '${project.description}')">Redigera</button></td>
           </tr>`;

           // utskrivning i en lista med grid för mindre skärmar
           projectgridEl.innerHTML +=
           `<ul class="projectlist">
                <li><b>Titel</b><br>${project.title}</li>
                <li><b>URL</b><br><a href="${project.url}">Länk till webbplats</a></li>
                <li class="descproject"><b>Beskrivning</b><br>${project.description}</li>
                <li><button id="${project.id}" onclick="deleteProject('${project.id}')">Radera</button></li>
                <li><button id="${project.id}" onclick="getProjectById('${project.id}', '${project.title}', '${project.url}', '${project.description}')">Redigera</button></li>
            </ul>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

// lägg till nytt projekt
function addProject() {
    // lagrar input i textfälten i variabel
    let title = titleInput.value;
    let url = urlInput.value;
    let description = descriptionInput.value;
    
    // används i json.stringify
    let jsonStr = {
        'title': title, 
        'url': url, 
        'description': description 
    }
    // fetch med POST till api
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/projects.php", {
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
            // lyckat tillägg av projekt
            if(response.status === 201) {
                message.innerHTML = "Projektet lades till!";
                message.style.color = "green";
                successReload();
            // fel vid tillägg
            } else {
                message.innerHTML = "Projektet lades inte till!";
                message.style.color = "red";
            }
        }
    })
    .then(data =>{
        getProjects();
        // efter att ha hämtat om de nya tillägget töms formuläret
        titleInput.value = "";
        urlInput.value = "";
        descriptionInput.value = "";
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

// hämta projekt efter id
function getProjectById(id, title, url, description) {
    // gömmer "lägg till" knappen och visar uppdateringsknappen
    updateBtnEl.style.display = "inline";
    addBtnEl.style.display = "none";

    titleInput.value = title;
    urlInput.value = url;
    descriptionInput.value = description;

    // event listener vid klick av uppdateringsknappen
    updateBtnEl.addEventListener("click", function(event) {
        event.preventDefault();
        updateProject(id);
    });
}

// uppdatera projekt
function updateProject(id) {
    let title = titleInput.value;
    let url = urlInput.value;
    let description = descriptionInput.value;

    // används i json.stringify
    let jsonStr = {
        'title': title, 
        'url': url, 
        'description': description
    }

    // alla fält måste vara ifyllda
    if(title == "" || url == "" || description == "") {
        message.style.color = "red";
        message.innerHTML = "Fyll i alla fält!"
    } else {
        // om fält är ifyllda, gör en PUT till valt ID
        fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/projects.php?id=" + id, {
            method: 'PUT',
            header:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(jsonStr),
        })
        .then(response => {
            response.json()
            // lyckad uppdatering av projekt
            if(response.status === 200) {
                message.innerHTML = "Projekt uppdaterad!";
                message.style.color = "green";
                successReload();
            } else {
                // fel vid uppdatering
                message.innerHTML = "Projekt ej uppdaterad!";
                message.style.color = "red";
            }
        })
        .then(data => {
            getProjects();
            // efter uppdaterat innehåll hämtats in töms formuläret
            titleInput.value = "";
            urlInput.value = "";
            descriptionInput.value = "";
        })
        .catch(error => {
            console.log('Error', error);
        })
    }
}

// ta bort projekt
function deleteProject(id) {
    // delete på valt ID
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/projects.php?id=" + id, {
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
        getProjects();
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