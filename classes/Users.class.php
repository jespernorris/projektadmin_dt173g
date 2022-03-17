<?php
/* klass för att hantera användare och inloggning */
class Users {
    private $db;
    private $username;
    private $password;

    public function __construct() {
        $this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);
        if($this->db->connect_errno > 0) {
            die("Fel vid anslutning: " . $this->db->connect_error);
        }
    }

    // registrering utav ny användare samt lagring i DB
    public function registerUser($username, $password) {
        $username = $this->db->real_escape_string($username);
        $password = $this->db->real_escape_string($password);

        // hasha lösenord
        $salt = '$2y$07$GhgKpaZxGOsI6216726238$';
        $password = crypt($password, $salt);

        $sql = "INSERT INTO webb3user(username, password) VALUES ('$username', '$password')";

        $result = $this->db->query($sql);

        return $result;
    }

    // logga in användare som är registrerad
    public function loginUser($username, $password) {
        $username = $this->db->real_escape_string($username);
        $password = $this->db->real_escape_string($password);

        $sql = "SELECT password FROM webb3user WHERE username='$username'";
        $result = $this->db->query($sql);

        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedpassword = $row['password'];

            if($storedpassword == crypt($password, $storedpassword)) {
                $_SESSION['username'] = $username;
                header('location: admin.php');
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // kollar om användarnamnet är upptaget
    public function isUsernameTaken($username) {
        $username = $this->db->real_escape_string($username);

        $sql = "SELECT username FROM webb3user WHERE username='$username'";

        $result = $this->db->query($sql);

        if($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}