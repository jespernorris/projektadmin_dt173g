<?php
    // sida för att hantera tidigare arbeten
    include("includes/header.php");

    // skickar användare till login.php vid obehörigt inträde
    if(!isset($_SESSION['username'])) {
        header("Location: login.php");
    } else {
        ?>
        <div id="contentBox">
            <!-- formulär för att lägga till ny arbetserfarenhet -->
            <form id="form">
                <h2>Lägg till ny arbetserfarenhet</h2>
                <div class ="formContainer">
                    <label for="workplace">Arbetsplats:</label><br>
                    <input type="text" name="workplace" id="workplace"><br>
                    
                    <label for="title">Titel:</label><br>
                    <input type="text" name="title" id="title"><br>

                    <label for="startDate">Startdatum:</label><br>
                    <input type="text" name="startDate" id="startDate"><br>

                    <label for="endDate">Slutdatum:</label><br>
                    <input type="text" name="endDate" id="endDate"><br>
                </div>
                <button id="addBtn">Lägg till arbete</button>
                <button id="updateBtn">Uppdatera</button>
            </form>
            <p id="message"></p>

            <h2>Tidigare arbetserfarenhet</h2>
            <div id="worktable">
                <!-- table som visar tidigare arbetserfarenhet -->
                <table>
                    <thead>
                        <tr>
                            <th>Arbetsplats</th>
                            <th>Titel</th>
                            <th>Startdatum</th>
                            <th>Slutdatum</th>
                        </tr>
                    </thead>
                    <!-- output används av work.js för att skriva ut -->
                    <tbody id="output">
                    </tbody>
                </table>
            </div>
            <!-- workgrid används av work.js för att skriva ut mer passande till små skärmar -->
            <div id="workgrid">
            </div>
        </div>
        <script src="includes/js/work.js"></script>
        <?php
    }
    include("includes/footer.php");