<?PHP

namespace sabreHcode\data\session {
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;

	require_once '../../configuration/Application.php';

	class User {

		public static function init() {

			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");

			if (isset($_GET['module'])) {
				$returnVal = User::checkSession();

			} else if ($_POST['type'] == 'login') {
				$username = $_POST['username'];
				$password = $_POST['password'];
				$returnVal = User::login($username, $password);

			} else if ($_POST['type'] == 'register') {
				$username = $_POST['username'];
				$password = $_POST['password'];
				$returnVal = User::register($username, $password);
			} else {
				$returnVal = User::logout();
			}

			$returnVal = \json_encode($returnVal);

			echo $returnVal;
		}

		public static function checkSession() {
			if (isset($_SESSION['userDetails'])) {
				$loginmessage = "session exits";
				return array('success' => true, 'message' => $loginmessage, 'data' => $_SESSION['userDetails']);
			} else {
				$loginmessage = "pls login";
				return array('success' => false, 'message' => $loginmessage, 'data' => array());
			}
		}

		public static function login($username, $password) {
			$oDbInstance = Database::load(new DataCredential(\sabreHcode\configuration\Application::$driver, \sabreHcode\configuration\Application::$environment));
			$userDetails = $username;
			$userDetails = array();

			$sSql = "SELECT ";
			$sSql .= "m1.`id`, m1.`first_name`, m1.`middle_name`, m1.`last_name`, m1.`screenname`, ";
			$sSql .= "m1.`user_email`, m1.`created_date`, m1.`updated_date`, ";
			$sSql .= "m1.`created_by`, m1.`updated_by`, ";
			$sSql .= "m1.`role_id`, m2.`name` AS `role_name` ";
			$sSql .= "FROM `sabre`.`pt_user` m1 ";
			$sSql .= "LEFT JOIN `sabre`.`pt_user_role` m2 ON m1.`role_id` = m2.`id` ";
			$sSql .= "WHERE m1.screenname = '$username' ";
			$sSql .= "AND m1.password = PASSWORD('$password') ";

			$oResult = $oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$userDetails[] = $aRecord;

				}
				$loginmessage = "Sucessfully logged in";
				$_SESSION['userDetails'] = $userDetails;

				return array('success' => true, 'message' => $loginmessage, 'data' => $userDetails);
			} else {

				$loginmessage = "Please check your username or password";
				return array('success' => false, 'message' => $loginmessage);
			}

		}

		public static function register($username, $password) {
			$oDbInstance = Database::load(new DataCredential(\sabreHcode\configuration\Application::$driver, \sabreHcode\configuration\Application::$environment));

			$sSql = "INSERT INTO `sabre`.`pt_user` (`first_name`, `screenname`, `password`) Values('$username', '$username', PASSWORD('$password'))";
			if ($oResult = $oDbInstance -> query($sSql)) {
				$userDetails = $username;
				$userDetails = array();

				$sSql = "SELECT * FROM `sabre`.`pt_user` WHERE screenname='$username' and password=PASSWORD('$password')";
				$oResult = $oDbInstance -> query($sSql);

				if ($oResult -> num_rows > 0) {
					while ($aRecord = $oResult -> fetch_assoc()) {
						$userDetails[] = $aRecord;

					}
					$loginmessage = "Sucessfully logged in";
					$_SESSION['userDetails'] = $userDetails;
				}
			}
			$loginmessage = "Sucessfully Create New User";

			return array('success' => true, 'message' => $loginmessage, 'data' => $userDetails);
		}

		public static function logout() {
			session_destroy();
			$userDetails = array();
			$logoutmessage = "Sucessfully logged out";
			return array('success' => true, 'message' => $logoutmessage, 'data' => $userDetails);
		}

	}

	User::init();

}
?>
