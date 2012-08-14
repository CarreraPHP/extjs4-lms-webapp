<?PHP

	namespace sabreHcode\data\service{
		
		class Content {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllContent($display, $type, $parent){
				$aRecordCollection = array();
				if(isset($_SESSION['userDetails'])){
					$user_id = $_SESSION['userDetails'][0]['id'];	
				}
				$permissionArray = array('create' => false, 'update' => false, 'read' => false, 'delete' => false, 'permission' => false);
				$aTopicID = array();
				$parent =  substr("$parent", 3);
				$sSql  = "SELECT `pt_content`.`id`, `pt_content`.`name`, `pt_content`.`sort_order` AS `content_sort`, ";
				$sSql .= "`pt_content`.`description`,";
				$sSql .= "`pt_content`.`text`, `pt_content`.`type_id`, `pt_topics`.`id` AS `topic_id`, ";
				$sSql .= "`pt_topics`.`name` AS `topicName`, `pt_topics`.`description` AS `topicDescription`, `pt_topics`.`sort_order` AS `topic_sort`, ";
				$sSql .= "`pt_course`.`name` AS `course_name`, CONCAT('cou', `pt_course`.`id`) AS `course_id`, ";
				$sSql .= "`pt_content_types`.`name` AS `type`, `pt_content_types`.`cls` ";
				$sSql .= "FROM `sabre`.`pt_content` ";
				$sSql .= "LEFT JOIN `sabre`.`pt_topics` ON `pt_topics`.`id` = `pt_content`.`topic_id` ";
				$sSql .= "LEFT JOIN `sabre`.`pt_course` ON `pt_course`.`id` = `pt_content`.`course_id` ";
				$sSql .= "LEFT JOIN `sabre`.`pt_content_types` ON `pt_content_types`.`id` = `pt_content`.`type_id` ";
				$sSql .= "WHERE `pt_content`.`course_id` = $parent AND `pt_content`.`deleted` = 'F' AND pt_topics.type_id != '9'  ORDER BY `topic_sort`,`content_sort` ASC";
				
				$oResult = $this -> _oDbInstance -> query($sSql);
			
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						if($aRecord['type'] == 'FLASH' || $aRecord['type'] == 'VIDEO' || $aRecord['type'] == 'AUDIO'){
							$aRecord['text'] = "http://localhost/sabreHcode/".$aRecord['text'];
						}
						$sql = "SELECT `id`, `user_id`, `user_role_id`, `module_id`, `module_sub_id`, GROUP_CONCAT(`module_access_level`) As module_access_level FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '2' AND `module_sub_id` IN (" . $parent . ") GROUP BY `module_id`, `module_sub_id` ORDER BY `module_sub_id` ASC";
						$Result = $this -> _oDbInstance -> query($sql);
						if ($Result -> num_rows > 0) {
							while ($Record = $Result -> fetch_assoc()) {
								$mod_acc_lev = explode(",", $Record['module_access_level']);
								if (in_array('C', $mod_acc_lev)) {
									$permissionArray['create'] = true;
								}
								if (in_array('R', $mod_acc_lev)) {
									$permissionArray['read'] = true;
								}
								if (in_array('U', $mod_acc_lev)) {
									$permissionArray['update'] = true;
								}
								if (in_array('D', $mod_acc_lev)) {
									$permissionArray['delete'] = true;
								}
								if (in_array('P', $mod_acc_lev)) {
									$permissionArray['permission'] = true;
								}
							}
						}
						$aRecord['permission'] = $permissionArray;
						
						$aRecord['text'] = base64_encode($aRecord['text']);
						$aTopicID[] = $aRecord['topic_id'];
						$aRecordCollection[] = $aRecord;
						//$aRecordCollection['encode_text'] = base64_encode($aRecord['text']);
					}
				}
				
				$sSql  = "SELECT `pt_topics`.`id` AS `topic_id`, `pt_topics`.`course_id`, `pt_topics`.`name` AS `topicName`, `pt_topics`.`description` AS `topicDescription`, ";
				$sSql .= "`pt_course`.`name` AS `course_name`, CONCAT('cou', `pt_course`.`id`) AS `course_id` ";
				$sSql .= "FROM `sabre`.`pt_topics` ";
				$sSql .= "LEFT JOIN `sabre`.`pt_course` ON `pt_course`.`id` = `pt_topics`.`course_id` ";
				$sSql .= "WHERE course_id = '$parent' AND `pt_topics`.`deleted` = 'F' AND `pt_topics`.`type_id` != '9'";
				if(count($aTopicID) > 0){
					$topicIds = implode(',', array_unique($aTopicID));
					$sSql .= "AND `pt_topics`.`id` NOT IN($topicIds)";
				}
				// $sSql .= "GROUP BY ``pt_topics`.`id`";
				
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				$dump = 1;
				$dumpStr = "new";
				
				if($oResult && $oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecord['text'] = "";
						$aRecord['id'] = $dumpStr . $dump++;
						$aRecord['name'] = "No Content";
						$aRecord['content_sort'] = 99 + $dump++;
						$aRecord['description'] = "";
						$aRecord['type_id'] = 1;	
						$aRecord['type'] = 'HTML';									
						$aRecordCollection[] = $aRecord;						
					}
				}
				
				return $aRecordCollection;
				
			}
			
			public function getAllForumTopic($display, $type, $parent){
				$aRecordCollection = array();
				if(isset($_SESSION['userDetails'])){
					$user_id = $_SESSION['userDetails'][0]['id'];
					$user_name = $_SESSION['userDetails'][0]['first_name'] . " ". $_SESSION['userDetails'][0]['last_name'];
					$parent =  substr("$parent", 3);
					$sql = "SELECT `id`, `name`, `description`, `created_date`, `course_id`, `type_id` FROM `sabre`.`pt_topics` WHERE `course_id` = '$parent' AND `type_id` = '9' AND `deleted` = 'F'";
					$oResult = $this -> _oDbInstance -> query($sql);
					if($oResult -> num_rows > 0){
						$i = 0;
						while($aRecord = $oResult -> fetch_assoc()){
							if(date('Y-m-d', strtotime($aRecord['created_date'])) == date('Y-m-d')){
								$aRecord['created_date'] = date('h:i:s', strtotime($aRecord['created_date']));
							}
							 $aRecordCollection[] = $aRecord;
							 $aRecordCollection[$i]['username'] = $user_name;
						$i++;
						}
						
						return $aRecordCollection;
					}
				}
			}
			
			public function getForumSelectedTopic($display, $type, $parent){
				$aRecordCollection = array();
				if(isset($_SESSION['userDetails'])){
					$user_id = $_SESSION['userDetails'][0]['id'];
					$user_name = $_SESSION['userDetails'][0]['first_name'] . " ". $_SESSION['userDetails'][0]['last_name'];
					$sql = "SELECT `id`, `name`, `description`, `created_date`, `course_id`, `type_id` FROM `sabre`.`pt_topics` WHERE `id` = '$parent' AND `type_id` = '9' AND `deleted` = 'F'";
					$oResult = $this -> _oDbInstance -> query($sql);
					if($oResult -> num_rows > 0){
						$i = 0;
						while($aRecord = $oResult -> fetch_assoc()){
							if(date('Y-m-d', strtotime($aRecord['created_date'])) == date('Y-m-d')){
								$aRecord['created_date'] = date('h:i:s', strtotime($aRecord['created_date']));
							}
							 $aRecordCollection[] = $aRecord;
							 $aRecordCollection[$i]['username'] = $user_name;
						$i++;
						}
						
						return $aRecordCollection;
					}
				}
			}

			public function getCourse(array $columns){
			
				

			}

			
		}
	}
	
?>
