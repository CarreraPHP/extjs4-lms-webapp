<?php
namespace sabreHcode {
	use \sabreHcode\data\service\Content;
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;
	use \sabreHcode\utils\http\Request;
	use \sabreHcode\data\service\AccessCategory;

	require_once '../configuration/Application.php';

	class contentUpdate {

		public static function init() {
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");
			\sabreHcode\configuration\Application::load("\sabreHcode\utils\http\Request");

			$request = new Request( array('restful' => false));
			$module = isset($_GET['module']) ? $_GET['module'] : 'content';
			$parent = isset($_GET['parent']) ? $_GET['parent'] : 'cou2';
			$display = isset($_GET['display']) ? $_GET['display'] : 'list';
			$type = isset($_GET['type']) ? $_GET['type'] : 'json';

			if ($module == 'content') {
				$returnVal = contentUpdate::content($request -> params, "update", $display, $parent, $type);
			} else if ($module == 'accessCategory') {
				$returnVal = contentUpdate::accessCategory($request -> params);
			} else if ($module == 'forumTopic') {
				$returnVal = contentUpdate::forumTopic($request -> params, "update", $display, $parent, $type);
			}
			echo $returnVal;
		}

		public static function content($params, $crud, $display, $parent, $type) {
			$dbInstance = Database::load();

			$params -> course_id = preg_replace('/cou/', '', $params -> course_id);

			if (preg_match('/new/', $params -> id)) {
				// INSERT PROCESS....
				$insert = "INSERT `sabre`.`pt_content` ";
				$insert .= "(`name`, `description`, `text`, `type_id`, `topic_id`, `course_id`, `deleted`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`)";
				$insert .= " VALUES ";
				$insert .= "('" . $params -> name . "', '" . $params -> description . "', '" . base64_decode($params -> text) . "', '" . $params -> type_id . "', '" . $params -> topic_id . "', '" . $params -> course_id . "', 'F', '" . $params -> content_sort . "', 1, NOW(), 1, NOW())";

				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

					$oCourseInstance = new Content($dbInstance);
					$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);

					return json_encode(array('success' => true, 'message' => 'Record inserted successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				}
			} else {
				$update = "UPDATE `sabre`.`pt_content`";
				$update .= " SET `name` = '" . $params -> name . "', `description` = '" . $params -> description . "', `type_id` = '" . $params -> type_id . "'";
				$update .= " WHERE `id` = '" . $params -> id . "'";

				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

					$oCourseInstance = new Content($dbInstance);
					$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);

					return json_encode(array('success' => true, 'message' => 'Record at ' . $params -> id . ' updated successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				}
			}
		}

		public static function forumTopic($params, $crud, $display, $parent, $type) {
			$dbInstance = Database::load();
			//$params -> course_id = preg_replace('/cou/', '', $params -> course_id);
			if (preg_match('/new/', $params -> id)) {
				// INSERT PROCESS....
				$insert = "INSERT `sabre`.`pt_content` ";
				$insert .= "(`name`, `description`, `text`, `type_id`, `topic_id`, `course_id`, `deleted`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`)";
				$insert .= " VALUES ";
				$insert .= "('" . $params -> name . "', '" . $params -> description . "', '" . base64_decode($params -> text) . "', '" . $params -> type_id . "', '" . $params -> topic_id . "', '" . $params -> course_id . "', 'F', '" . $params -> content_sort . "', 1, NOW(), 1, NOW())";

				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

					$oCourseInstance = new Content($dbInstance);
					$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);

					return json_encode(array('success' => true, 'message' => 'Record inserted successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				}
			} else {
				$update = "UPDATE `sabre`.`pt_topics`";
				$update .= " SET `name` = '" . $params -> name . "', `description` = '" . $params -> description . "'";
				$update .= " WHERE `id` = '" . $params -> id . "'";
				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record at ' . $params -> id . ' updated successfully'));
				}
			}
		}

		public static function forumContent($params, $crud, $display, $parent, $type) {
			$dbInstance = Database::load();

			//$params -> course_id = preg_replace('/cou/', '', $params -> course_id);

			if (preg_match('/new/', $params -> id)) {
				// INSERT PROCESS....
				$insert = "INSERT `sabre`.`pt_content` ";
				$insert .= "(`name`, `description`, `text`, `type_id`, `topic_id`, `course_id`, `deleted`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`)";
				$insert .= " VALUES ";
				$insert .= "('" . $params -> name . "', '" . $params -> description . "', '" . base64_decode($params -> text) . "', '" . $params -> type_id . "', '" . $params -> topic_id . "', '" . $params -> course_id . "', 'F', '" . $params -> content_sort . "', 1, NOW(), 1, NOW())";

				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

					$oCourseInstance = new Content($dbInstance);
					$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);

					return json_encode(array('success' => true, 'message' => 'Record inserted successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				}
			} else {
				$update = "UPDATE `sabre`.`pt_content`";
				$update .= " SET `name` = '" . $params -> name . "', `description` = '" . $params -> description . "', `type_id` = '" . $params -> type_id . "'";
				$update .= " WHERE `id` = '" . $params -> id . "'";

				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

					$oCourseInstance = new Content($dbInstance);
					$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);

					return json_encode(array('success' => true, 'message' => 'Record at ' . $params -> id . ' updated successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				}
			}
		}

		public static function accessCategory($params) {

			$dbInstance = Database::load();
			$params -> id = preg_replace('/acs/', '', $params -> id);
			if ($params -> module == 'category') {
				$user_id = $params -> user_id;
				$module_id = 1;
				$id = $params -> id;
				$module_sub_id = $params -> instance_id;
				$userRole = $params -> role_name;

				$select = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$module_sub_id'";
				$record = $dbInstance -> query($select);
				if ($record -> num_rows > 0) {
					$aRecord = $record -> fetch_assoc();
					$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$module_sub_id' AND `id` = '$id'";
					$dbInstance -> query($delete);
				}
				// To INSERT user module access using SELECT query from pt_user_role_meta table. //
				$insert = "INSERT INTO `sabre`.`pt_user_module_access` ";
				$insert .= "(`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`, `created_by`, `updated_by`,`created_date`,`updated_date`) ";
				$insert .= "SELECT '$user_id', `pt_user_role_meta`.`role_id`, `pt_user_role_meta`.`module_id`, '$module_sub_id', `pt_user_role_meta`.`module_acess_level`, `pt_user_role_meta`.`created_by`,`pt_user_role_meta`.`updated_by`, NOW(),NOW() ";
				$insert .= "FROM `sabre`.`pt_user_role_meta`";
				$insert .= "WHERE `pt_user_role_meta`.`module_id` = '$module_id' AND `pt_user_role_meta`.`role_id` = '$userRole'";
				$dbInstance -> query($insert);
				/*
				 if ($dbInstance -> query($insert)) {

				 \sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

				 $oCourseInstance = new AccessCategory($dbInstance);
				 $aAllContentList = $oCourseInstance -> getAllCategories($displayMode = '', $user_id, $params -> module);

				 return json_encode(array('success' => true, 'message' => 'Record at ' . $params -> id . ' updated successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList)));
				 }*/
			} else if ($params -> module == 'course') {
				$user_id = $params -> user_id;
				$module_id = 2;
				$id = $params -> id;
				$module_sub_id = $params -> instance_id;
				$userRole = $params -> role_name;

				$select = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$module_sub_id'";
				$record = $dbInstance -> query($select);
				if ($record -> num_rows > 0) {
					$aRecord = $record -> fetch_assoc();
					$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$module_sub_id' AND `id` = '$id'";
					$dbInstance -> query($delete);
				}
				// To INSERT user module access using SELECT query from pt_user_role_meta table. //
				$insert = "INSERT INTO `sabre`.`pt_user_module_access` ";
				$insert .= "(`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`, `created_by`, `updated_by`,`created_date`,`updated_date`) ";
				$insert .= "SELECT '$user_id', `pt_user_role_meta`.`role_id`, `pt_user_role_meta`.`module_id`, '$module_sub_id', `pt_user_role_meta`.`module_acess_level`, `pt_user_role_meta`.`created_by`,`pt_user_role_meta`.`updated_by`, NOW(),NOW() ";
				$insert .= "FROM `sabre`.`pt_user_role_meta`";
				$insert .= "WHERE `pt_user_role_meta`.`module_id` = '$module_id' AND `pt_user_role_meta`.`role_id` = '$userRole'";
				$dbInstance -> query($insert);

			}

		}

	}

	contentUpdate::init();
}
?>
