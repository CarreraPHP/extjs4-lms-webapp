<?php
namespace sabreHcode {

	use \sabreHcode\data\service\userAccessAddCategory;
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;

	require_once '../configuration/Application.php';

	class userAccessForm {

		public static function init() {
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");
			if ($_POST['page'] == 'accessAddCategory') {
				$returnVal = userAccessForm::category($_POST);
			} else if ($_POST['page'] == 'accessAddCourse') {
				$returnVal = userAccessForm::course($_POST);
			}
			echo $returnVal;
		}

		public static function category($data) {
			$dbInstance = Database::load();
			$categoryName = $data['categoryName'];
			$userRole = $data['userRole'];
			$type = $data['type'];
			$user_id = $data['id'];
			$getCategoryId = "SELECT `id` FROM `sabre`.`pt_module` WHERE name = '$type'";
			
			$categoryId = $dbInstance -> query($getCategoryId);
			$categoryIdResult = $categoryId -> fetch_assoc();
			$module_id = $categoryIdResult['id'];
			$select = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$categoryName'";
			
			$record = $dbInstance -> query($select);
			if ($record -> num_rows != 0) {
				$aRecord = $record -> fetch_assoc();
				$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$categoryName'" ;
				$dbInstance -> query($delete);
			}
			// To INSERT user module access using SELECT query from pt_user_role_meta table. //
			$insert = "INSERT INTO `sabre`.`pt_user_module_access` ";
			$insert .= "(`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`, `created_by`, `updated_by`,`created_date`,`updated_date`) ";
			$insert .= "SELECT '$user_id', `pt_user_role_meta`.`role_id`, `pt_user_role_meta`.`module_id`, '$categoryName', `pt_user_role_meta`.`module_acess_level`, `pt_user_role_meta`.`created_by`,`pt_user_role_meta`.`updated_by`, NOW(),NOW() ";
			$insert .= "FROM `sabre`.`pt_user_role_meta`";
			$insert .= "WHERE `pt_user_role_meta`.`module_id` = '$module_id' AND `pt_user_role_meta`.`role_id` = '$userRole'";
			if ($dbInstance -> query($insert)) {

				return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
			}

		}

		public static function course($data) {

			$dbInstance = Database::load();

			$courseName = $data['courseName'];
			$userRole = $data['userRole'];
			$type = $data['type'];
			$user_id = $data['id'];
			$getCourseId = "SELECT `id` FROM `sabre`.`pt_module` WHERE name = '$type'";
			$courseId = $dbInstance -> query($getCourseId);
			$courseIdResult = $courseId -> fetch_assoc();
			$module_id = $courseIdResult['id'];
			$select = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$courseName'";
			$record = $dbInstance -> query($select);
			if ($record -> num_rows > 0) {
				$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$courseName'";
				$dbInstance -> query($delete);
			}
			// To INSERT user module access using SELECT query from pt_user_role_meta table. //
			$insert = "INSERT INTO `sabre`.`pt_user_module_access` ";
			$insert .= "(`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`, `created_by`, `updated_by`,`created_date`,`updated_date`) ";
			$insert .= "SELECT '$user_id', `pt_user_role_meta`.`role_id`, `pt_user_role_meta`.`module_id`, '$courseName', `pt_user_role_meta`.`module_acess_level`, `pt_user_role_meta`.`created_by`,`pt_user_role_meta`.`updated_by`, NOW(),NOW() ";
			$insert .= "FROM `sabre`.`pt_user_role_meta`";
			$insert .= "WHERE `pt_user_role_meta`.`module_id` = '$module_id' AND `pt_user_role_meta`.`role_id` = '$userRole'";
			if ($dbInstance -> query($insert)) {

				return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
			}

		}

	}

	userAccessForm::init();
}
?>
