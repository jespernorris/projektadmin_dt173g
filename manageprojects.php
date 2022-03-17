<?php
    // sida för att hantera projekt
    include("includes/header.php");

    // skickar användare till login.php vid obehörigt inträde
    if(!isset($_SESSION['username'])) {
        header("Location: login.php");
    } else {
        ?>
        <div id="contentBox">
            <!-- formulär för att lägga till nytt projekt -->
            <form id="form">
                <h2>Lägg till nytt projekt</h2>
                <div class ="formContainer">
                    <label for="title">Titel:</label><br>
                    <input type="text" name="title" id="title"><br>
                    
                    <label for="url">URL:</label><br>
                    <input type="text" name="url" id="url"><br>

                    <label for="description">Beskrivning:</label><br>
                    <input type="text" name="description" id="description"><br>
                </div>
                <button id="addBtn">Lägg till projekt</button>
                <button id="updateBtn">Uppdatera</button>
            </form>
            <p id="message"></p>

            <!-- table som visar tidigare projekt -->
            <div id="projecttable">
                <h2>Tidigare projekt</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>URL</th>
                            <th>Beskrivning</th>
                        </tr>
                    </thead>
                    <!-- output används av projects.js för att skriva ut -->
                    <tbody id="output">
                    </tbody>
                </table>
            </div>
            <!-- projectgrid används av projects.js för att skriva ut mer passande till små skärmar -->
            <div id="projectgrid">
            </div>
        </div>
        <script src="includes/js/projects.js"></script>
        <?php
    }
    include("includes/footer.php");