<?php
namespace sabreHcode {

	use \sabreHcode\data\service\AddCategory;
	use \sabreHcode\data\service\AddCourse;
	use \sabreHcode\data\service\AddTopic;
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;

	require_once '../configuration/Application.php';

	class SaveForm {

		public static function init() {
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");
			if ($_POST['page'] == 'Category') {
				$returnVal = SaveForm::category($_POST);
			} else if ($_POST['page'] == 'Course') {
				$returnVal = SaveForm::course($_POST);
			} else if ($_POST['page'] == 'topic') {
				$returnVal = SaveForm::topic($_POST);
			} else if ($_POST['page'] == 'content') {
				$returnVal = SaveForm::content($_POST);
			} else if ($_POST['page'] == 'PDF_Content') {
				$returnVal = SaveForm::PdfContent($_POST);
			} else if ($_POST['page'] == 'Image_Content') {
				$returnVal = SaveForm::ImageContent($_POST);
			} else if ($_POST['page'] == 'Flash_Content') {
				$returnVal = SaveForm::FlashContent($_POST);
			} else if($_POST['page'] == 'replyForum'){
				$returnVal = SaveForm::ReplyForum($_POST);
			}
			echo $returnVal;
		}

		public static function category($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$name = $data['name'];
			$description = $data['description'];
			$parent_id = $data['parent_id'];
			$select = "SELECT `path` FROM `sabre`.`pt_category` WHERE id = '$parent_id' AND `deleted` = 'F' LIMIT 0, 1";
			$Result = $dbInstance -> query($select);
			$Record = $Result -> fetch_assoc();
			if (isset($Record)) {
				$path = $Record['path'];
			}
			if ($id == "new") {
				$insert = "INSERT INTO `sabre`.`pt_category` ";
				$insert .= "(`name`, `description`,`parent_id`,`path`,`sort_order`,`deleted`, `created_by`,`created_date`,`updated_by`,`updated_date`) ";
				$insert .= "VALUES ('$name', '$description', '$parent_id', '$path', '99', 'F', '1', NOW(), '1', NOW())";

				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
				}
			} else {
				$update = "UPDATE `sabre`.`pt_category`";
				$update .= " SET `name` = '$name', `description` = '$description', `parent_id` = '$parent_id', `path` = '$path'";
				$update .= " WHERE `id` = '$id'";

				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully'));
				}
			}
		}

		public static function course($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$name = $data['name'];
			$description = $data['description'];
			$category_id = $data['category_id'];
			$select = "SELECT `path` FROM `sabre`.`pt_category` WHERE id = '$category_id' AND `deleted` = 'F' LIMIT 0, 1";
			$Result = $dbInstance -> query($select);
			$Record = $Result -> fetch_assoc();
			if (isset($Record)) {
				$path = $Record['path'];
			}
			if ($id == "new") {
				$insert = "INSERT INTO `sabre`.`pt_course` ";
				$insert .= "(`name`, `description`,`category_id`,`path`,`deleted`,`sort_order`,`created_by`,`created_date`,`updated_by`,`updated_date`) ";
				$insert .= "VALUES ('$name', '$description', '$category_id', '$path" . "$category_id/', 'F', '1', '1', NOW(), '1', NOW())";
				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
				}
			} else {
				$id = preg_replace('/cou/', '', $id);
				$update = "UPDATE `sabre`.`pt_course`";
				$update .= " SET `name` = '$name', `description` = '$description', `category_id` = '$category_id', `path` = '$path'";
				$update .= " WHERE `id` = '$id'";

				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully'));
				}
			}

		}

		public static function topic($data) {
			$dbInstance = Database::load();
			$name = $data['name'];
			$id = $data['id'];
			$description = strip_tags($data['description']);
			$course_id = $data['course_id'];
			$course_id = substr("$course_id", 3);
			if ($id == 'new') {
				$insert = "INSERT INTO `sabre`.`pt_topics`(`name`, `description`,`course_id`,`deleted`, `sort_order`,`created_by`,`created_date`,`updated_by`,`updated_date`, `type_id`) VALUES('$name', '$description', '$course_id', 'F', '99', '1', NOW(), '1', NOW(), '".$data['type_id']."')";
				$rawResult = $dbInstance -> query($insert);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
				}
			} else {
				$course_id = preg_replace('/cou/', '', $course_id);
				$update = "UPDATE `sabre`.`pt_topics`";
				$update .= " SET `name` = '$name', `description` = '$description', `course_id` = '$course_id'";
				$update .= " WHERE `id` = '$id'";

				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully'));
				}
			}
		}

		public static function ReplyForum($data) {
			$dbInstance = Database::load();
			$type_id = $data['type_id'];
			$name = $data['forum'];
			$topicId = $data['topic_id'];
			echo $description = addslashes($data['description']);
			$text = strip_tags($data['text']);
			$course_id = $data['course_id'];
			echo $insert = "INSERT INTO `sabre`.`pt_content`(`name`, `description`, `text`, `type_id`, `topic_id`, `course_id`,`deleted`, `sort_order`,`created_by`,`created_date`,`updated_by`,`updated_date`) VALUES('$name', '$description', '$text', '$type_id', '$topicId', '$course_id', 'F', '99', '1', NOW(), '1', NOW())";
			$rawResult = $dbInstance -> query($insert);
			if ($rawResult) {
				return json_encode(array('success' => true, 'message' => 'Record inserted successfully'));
			}
		}

		public static function content($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$text = base64_decode($data['description']);
			$update = "UPDATE `sabre`.`pt_content`";
			$update .= " SET `text` = '$text'";
			$update .= " WHERE `id` = '$id'";
			$rawResult = $dbInstance -> query($update);
			if ($rawResult) {
				return json_encode(array('success' => true, 'message' => 'Record updated successfully'));
			}
		}

		public static function PdfContent($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$text = preg_replace(array("/\s+/", "/[^-\.\w]+/"), array("_", ""), trim($_FILES['pdf-path']['name']));
			$destination = "resources/uploads/pdf/" . $text;
			$dirName = dirname(dirname(__FILE__)) . "/";
			if (move_uploaded_file($_FILES['pdf-path']['tmp_name'], dirname(dirname(__FILE__)) . "/" . $destination)) {
				chmod($dirName . $destination, 777);
				//chmod($text, 777);
				$update = "UPDATE `sabre`.`pt_content`";
				$update .= " SET `text` = '" . $destination . "'";
				$update .= " WHERE `id` = '$id'";
				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully', 'url' => $destination));
				}
			} else {
				return json_encode(array('success' => false, 'message' => 'upload Failed'));
			}
		}

		public static function ImageContent($data) {

			$dbInstance = Database::load();
			$id = $data['id'];
			$text = preg_replace(array("/\s+/", "/[^-\.\w]+/"), array("_", ""), trim($_FILES['image-path']['name']));
			$destination = "resources/uploads/images/" . $text;
			$dirName = dirname(dirname(__FILE__)) . "/";
			if (move_uploaded_file($_FILES['image-path']['tmp_name'], dirname(dirname(__FILE__)) . "/" . $destination)) {
				chmod($dirName . $destination, 777);
				//chmod($text, 777);
				$update = "UPDATE `sabre`.`pt_content`";
				$update .= " SET `text` = '" . $destination . "'";
				$update .= " WHERE `id` = '$id'";
				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully', 'url' => $destination));
				}
			} else {
				return json_encode(array('success' => false, 'message' => 'upload Failed'));
			}

		}

		public static function FlashContent($data) {
			$dbInstance = Database::load();
			$id = $data['id'];
			$text = preg_replace(array("/\s+/", "/[^-\.\w]+/"), array("_", ""), trim($_FILES['flash-path']['name']));
			if ($data['contentType'] == "FLASH") {
				$destination = "resources/uploads/flash/" . $text;
			} elseif ($data['contentType'] == "VIDEO") {
				$destination = "resources/uploads/video/" . $text;
			} elseif ($data['contentType'] == "AUDIO") {
				$destination = "resources/uploads/audio/" . $text;
			}

			$dirName = dirname(dirname(__FILE__)) . "/";
			if (move_uploaded_file($_FILES['flash-path']['tmp_name'], dirname(dirname(__FILE__)) . "/" . $destination)) {
				chmod($dirName . $destination, 777);
				//chmod($text, 777);
				$update = "UPDATE `sabre`.`pt_content`";
				$update .= " SET `text` = '" . $destination . "'";
				$update .= " WHERE `id` = '$id'";
				$rawResult = $dbInstance -> query($update);
				if ($rawResult) {
					return json_encode(array('success' => true, 'message' => 'Record updated successfully', 'url' => $destination, 'type' => $data['contentType']));
				}
			} else {
				return json_encode(array('success' => false, 'message' => 'upload Failed'));
			}
		
		}

	}

	SaveForm::init();
}
?>
