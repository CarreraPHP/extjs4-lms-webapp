<?php
namespace sabreHcode {

	use \sabreHcode\data\service\AddCategory;
	use \sabreHcode\data\service\AddCourse;
	use \sabreHcode\data\service\AddTopic;
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;

	require_once '../configuration/Application.php';

	class Delete {

		public static function init() {
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");
			if ($_POST['module'] == 'category') {
				$returnVal = Delete::category($_POST);
			} else if ($_POST['module'] == 'course') {
				$returnVal = Delete::course($_POST);
			} else if ($_POST['module'] == 'content') {
				$returnVal = Delete::content($_POST);
			} else if ($_POST['module'] == 'topic') {
				$returnVal = Delete::topic($_POST);
			} else if ($_POST['module'] == 'accessCategory') {
				$returnVal = Delete::accessCategory($_POST);
			} elseif ($_POST['module'] == 'forumTopic') {
				$returnVal = Delete::forumTopic($_POST);
			}
			echo $returnVal;
		}

		public static function category($data) {

			$dbInstance = Database::load();
			$parent_id = $data['id'];
			$select = "SELECT * FROM `sabre`.`pt_category` WHERE `parent_id` = '$parent_id' AND deleted = 'F'";
			$select .= " UNION ALL ";
			$select .= "SELECT * FROM `sabre`.`pt_course` WHERE `category_id` = '$parent_id' AND deleted = 'F'";
			$Result = $dbInstance -> query($select);

			if ($Result -> num_rows > 0) {
				return json_encode(array('success' => false, 'message' => 'Category Could Not Deleted'));
			} else {
				$delete = "UPDATE `sabre`.`pt_category` SET `deleted` = 'T' WHERE `id` = '$parent_id'";
				$rawResult = $dbInstance -> query($delete);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Category Successfully Deleted'));
				}
			}
		}

		public static function course($data) {

			$dbInstance = Database::load();

			$course_id = preg_replace('/cou/', '', $data['id']);
			if ($course_id != '') {
				$update_Content = "UPDATE `sabre`.`pt_content` SET `deleted` = 'T' WHERE `course_id` = '$course_id'";
				$rawResult = $dbInstance -> query($update_Content);

				if ($rawResult) {

					$update_Topic = "UPDATE `sabre`.`pt_topics` SET `deleted` = 'T' WHERE `course_id` = '$course_id'";
					$result = $dbInstance -> query($update_Topic);

					if ($result) {

						$update_course = "UPDATE `sabre`.`pt_course` SET `deleted` = 'T' WHERE `id` = '$course_id'";
						$rawResult = $dbInstance -> query($update_course);

						if ($rawResult) {
							return json_encode(array('success' => true, 'message' => 'Course Successfully Deleted'));
						}
					}
				}
			}
		}

		public static function topic($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$select = "SELECT * FROM `sabre`.`pt_content` WHERE `deleted` = 'F' AND `topic_id` = '$id'";
			$Result = $dbInstance -> query($select);
			if ($Result -> num_rows > 0) {
				return json_encode(array('success' => false, 'message' => 'Topic Could Not Deleted'));
			} else {
				$delete = "UPDATE `sabre`.`pt_topics` SET `deleted` = 'T' WHERE `id` = '$id'";
				$rawResult = $dbInstance -> query($delete);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Topic Successfully Deleted'));
				}
			}
		}
		
		
		public static function content($data) {

			$dbInstance = Database::load();

			$id = $data['id'];
			$update_Content = "UPDATE `sabre`.`pt_content` SET `deleted` = 'T' WHERE `id` = '$id'";
			$rawResult = $dbInstance -> query($update_Content);
			if ($rawResult) {
				return json_encode(array('success' => true, 'message' => 'Content Successfully Deleted'));
			}
		}

		public static function accessCategory($data) {

			$dbInstance = Database::load();

			$id = preg_replace('/acs/', '', $data['id']);
			$mod_sub_id = $data['mod_sub_id'];
			$user_id = $data['user_id'];
			$sql = "SELECT `id` FROM `sabre`.`pt_user_module_access` WHERE `module_sub_id` = '$mod_sub_id' AND `user_id` = '$user_id'";
			$oResult = $dbInstance -> query($sql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$delete_Category = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `id` = '" . $aRecord['id'] . "' AND `module_sub_id` = '$mod_sub_id' AND `user_id` = '$user_id'";
					$rawResult = $dbInstance -> query($delete_Category);

				}
				return json_encode(array('success' => true, 'message' => 'Content Successfully Deleted'));
			}

		}

	}

	Delete::init();
}
?>
