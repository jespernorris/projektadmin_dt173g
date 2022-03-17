<?php
    include("includes/header.php");
    
    if(isset($_SESSION['username'])) {
        header("Location: admin.php");
    }

    // logga in användare
    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $users = new Users();
        if($users->loginUser($username, $password)) {
            header("Location: admin.php");
        } else {
            $message = "<p>Felaktigt användarnamn / lösenord!</p>";
        }
    }
?>  
        <div id="loginbox">
            <h2>Inloggning</h2>
            <!-- formulär för att logga in -->
            <form method="post" action="login.php">
                <label for="username">Användarnamn:</label>
                <br><input type="text" name="username" id="username">
                <br>
                <label for="password">Lösenord:</label>
                <br>
                <input type="password" name="password" id="password">
                <br>
                <input type="submit" value="Logga in" class="btn">
                <div>
                    <?php
                        if(isset($message)) { echo $message; }
                    ?>
                </div>
            </form>
        </div>
    <?php include("includes/footer.php"); ?>