<?php
    // loggar ut användare vid klick av "logga ut"
    session_start();
    session_unset();
    session_destroy();
    header("Location: ../projektfront");
?>