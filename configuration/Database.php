<?PHP

namespace sabreHcode\configuration {

    require_once 'Application.php';

    class Database {

        public static function load() {

            

            if (DataCredential::$driver == "mysqli") {
                return new \mysqli(
                        DataCredential::$host, 
                        DataCredential::$user, 
                        DataCredential::$passwd, 
                        DataCredential::$schema, 
                        DataCredential::$port);
            }
        }

    }

}
?>
