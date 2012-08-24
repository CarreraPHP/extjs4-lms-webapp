<?PHP

namespace sabreHcode\configuration {

	class DataCredential {

		public $host;
		public $user;
		public $passwd;
		public $port;
		public $schema;
		public $driver;

		public function __construct($driver, $env) {

			if ($driver == "mysqli") {
				if ($env == "demo") {
					$this -> host = "127.0.0.1";
					$this -> user = "root";
					$this -> passwd = "";
					$this -> port = 3306;
					$this -> schema = "sabre";
					$this -> driver = "mysqli";
				}else if ($env == "external") {
					$this -> host = "localhost";
					$this -> user = "root";
					$this -> passwd = "V!rtual1";
					$this -> port = 3306;
					$this -> schema = "sabre";
					$this -> driver = "mysqli";
				}else if ($env == "saas") {
					$this -> host = "localhost";
					$this -> user = "root";
					$this -> passwd = "compaq";
					$this -> port = 3306;
					$this -> schema = "sabre";
					$this -> driver = "mysqli";
				} else {
					$this -> host = "192.168.1.172";
					$this -> user = "root";
					$this -> passwd = "phptl@40";
					$this -> port = 3306;
					$this -> schema = "sabre";
					$this -> driver = "mysqli";
				}
			}
		}
	}
}
?>
