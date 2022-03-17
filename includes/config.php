 <?php
    // config fil för autoload med mera
    error_reporting(-1);
    ini_set("display_errors", 1);

    session_start();
    
    // autoload för klasser, i detta fall klassen users
    spl_autoload_register(function ($class_name) {
        include "classes/". $class_name . ".class.php";
    });

    // DB settings
    define("DBHOST", "studentmysql.miun.se");
    define("DBUSER", "jeno2011");
    define("DBPASS", "sZ!c2VSXqC");
    define("DBDATABASE", "jeno2011");
