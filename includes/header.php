<?php include("config.php"); ?>
<!-- admingränssnittets header -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png"/>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="includes/style/style.css">
    <title>DT173G Projekt</title>
</head>
<body>
    <nav>
        <div id="menu">
            <!-- visar meny beroende på om användaren är inloggad eller ej -->
            <?php if(!isset($_SESSION['username'])) {
            ?>  <a href="../projektfront">Tillbaks till CV</a>
                <?php
            } else {
                ?>
                <!-- visar inloggade användarens namn -->
                <h2>Inloggad som: <?= $_SESSION['username'] ?></h2>
                <a href="admin.php">Hem</a>
                <a href="managestudies.php">Utbildning</a>
                <a href="managework.php">Jobb</a>
                <a href="manageprojects.php">Projekt</a>
                <a href="logout.php">Logga ut</a>
        </div>
        <div class="smallnav">
            <a href="javascript:void(0);" class="icon" onclick="hamburgerMenu()">
                <i class="fa fa-bars" style="font-size:24px"></i>
            </a>
            <div id="myLinks">
                <a href="admin.php">Hem</a>
                <a href="managestudies.php">Utbildning</a>
                <a href="managework.php">Jobb</a>
                <a href="manageprojects.php">Projekt</a>
                <a href="logout.php">Logga ut</a>
            </div>
        </div>
        <?php
            }
            ?>
    </nav>