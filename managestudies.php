<?php
    // sida för att hantera tidigare studier
    include("includes/header.php");

    // skickar användare till login.php vid obehörigt inträde
    if(!isset($_SESSION['username'])) {
        header("Location: login.php");
    } else {
        ?>
        <div id="contentBox">
            <!-- formulär för att lägga till ny utbildning -->
            <form id="form">
                <h2>Lägg till ny utbildning</h2>
                <div class ="formContainer">
                    <label for="location">Plats:</label><br>
                    <input type="text" name="location" id="location"><br>
                    
                    <label for="name">Utbildningsnamn:</label><br>
                    <input type="text" name="name" id="name"><br>

                    <label for="startDate">Startdatum:</label><br>
                    <input type="text" name="startDate" id="startDate"><br>

                    <label for="endDate">Slutdatum:</label><br>
                    <input type="text" name="endDate" id="endDate"><br>
                </div>
                <button id="addBtn">Lägg till utbildning</button>
                <button id="updateBtn">Uppdatera</button>
            </form>
            <p id="message"></p>

            <!-- table för att skriva ut utbildningar -->
            <h2>Tidigare utbildning</h2>
            <div id="studytable">
                <table>
                    <thead>
                        <tr>
                            <th>Plats</th>
                            <th>Utbildningsnamn</th>
                            <th>Startdatum</th>
                            <th>Slutdatum</th>
                        </tr>
                    </thead>
                    <!-- output används av studies.js för att skriva ut -->
                    <tbody id="output">
                    </tbody>
                </table>
            </div>
            <!-- studygrid används av studies.js för att skriva ut mer passande till små skärmar -->
            <div id="studygrid">
            </div>
        </div>
        <script src="includes/js/studies.js"></script>
        <?php
    }
    include("includes/footer.php");