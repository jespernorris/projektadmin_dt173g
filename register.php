<?php include("includes/header.php");

    // registrera nytt konto
    $errors = [];
    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        // kollar om användarnamn är upptaget
        $users = new Users();
        if($users->isUsernameTaken($username)) {
            array_push($errors, "<p>Användarnamnet är upptaget!</p>");
        }
        
        // utan errors så lagras användarkontot
        if(sizeof($errors) == 0) {
            if($users->registerUser($username, $password)) {
                echo "<p class='message'>Användare skapad!</p>";
            } else {
                echo "<p class='errorMessage'>Fel vid lagring av användare!</p>";
            }
        }
    }
?>
        <h2>Registrering</h2>
        <!-- formulär för att registrera nytt konto -->
        <form method="post">
            <div>
                <?php
                    if(sizeof($errors) > 0) {
                        echo "<ul class='errorMessage'>\n";
                        foreach($errors as $error)
                            echo "<li>$error</li>\n";
                            echo "</ul>\n";
                    }
                ?>
            </div>
            <label for="username">Användarnamn:</label><br>
            <input type="text" name="username" id="username" required>
            <br>
            <label for="password">Lösenord:</label><br>
            <input type="password" name="password" id="password" required>
            <br>
            <input type="checkbox" id="confirm" name="confirm" onchange="confirmSave()">
            <label for="confirm">Jag godkänner att ovanstående uppgifter lagras i syfte för inloggning.</label>
            <br>
            <input type="submit" value="Skapa användarkonto" class="btn" id="saveButton" disabled>
        </form>
        <!-- om checkboxen ej är ifylld går det ej att klicka på knappen Skapa användarkonto -->
        <script>
            function confirmSave() {
                if(document.getElementById("confirm").checked) {
                    document.getElementById("saveButton").disabled = false;
                } else {
                    document.getElementById("saveButton").disabled = true;
                }
            }
        </script>
<?php include("includes/footer.php"); ?>