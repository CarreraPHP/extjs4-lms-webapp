<?php

namespace sabreHcode\data\service {

    class Install {

        public $host;
        public $user;
        public $passwd;
        public $schema;

        public function __construct() {

//            $this->host = $_POST['hostname'];
//            $this->user = $_POST['username'];
//            $this->passwd = $_POST['password'];
//            $this->schema = $_POST['dbname'];
        }

        public function database() {
            if (isset($_POST)) {
                $host = $_POST['hostname'];
                $username = $_POST['username'];
                $pswd = $_POST['password'];
                $port = 3306;
                $db = $_POST['dbname'];

                $mysqli = new \mysqli($host, $username, $pswd, $db);
                if (mysqli_connect_errno()) {
//                    printf("Connect failed: %s\n", mysqli_connect_error());
                    return array(
                        "success" => false,
                        "message" => "connection to the specificed host has failed. pls check the login details."
                    );
                }
                
                if(!file_exists("\sabreHcode\configuration\DataCredential25.php")){
                    $dcPoint = fopen("\sabreHcode\configuration\DataCredential25.php", "x+");
                    
                    $templateContent = file_get_contents("\sabreHcode\configuration/\template\DataCredential.inc.php");
                    
                    $templateContent = str_replace("HOST", $host, $templateContent);
                    $templateContent = str_replace("USERNAME", $username, $templateContent);
                    $templateContent = str_replace("PASSWORD", $pswd, $templateContent);
                    $templateContent = str_replace("PORT", $port, $templateContent);
                    $templateContent = str_replace("SCHEMA", $db, $templateContent);
                    $templateContent = str_replace("DRIVER", "mysqli", $templateContent);
                    
                    fwrite($dcPoint, $templateContent);
                    fclose($dcPoint);
                    
                }
            }
        }

    }

}
?>