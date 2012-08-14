<?PHP

	namespace sabreHcode\data\service{
		
		class Category {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllTopics(){
				$aRecordCollection = array();

				$sSql = "SELECT * FROM `sabre`.`pt_topics`";
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecordCollection[] = $aRecord;

						// $aRecordCollection['children'] = $aRecord;
					}
				}
				// var_dump($oResult);
				
				return $aRecordCollection;
			}
			/**
			 * -- $parent > 0



-- $parent = 0

SELECT `id`, `name`, `path`, SUBSTRING(`path`, 2) FROM `sabre`.`pt_category` ORDER BY `parent_id` ASC, `id` ASC, `sort_order` ASC;
			 */
			public function getTopicsTree($display, $type, $parent){
				$aRecordCollection = array();
				$currentReference = &$aRecordCollection;
				$parent=substr($parent, 1);

				$key = array();

				$sSql = "SELECT `pt_content`.`id`, `pt_content`.`name`, `pt_content`.`description`, `pt_content`.`type_id`, `pt_topics`.`name`, `pt_course`.`name` AS `course_name`, `pt_content_types`.`name` AS `topic_name`, `pt_content_types`.`cls`, `pt_content`.`topic_id`
FROM `sabre`.`pt_content` LEFT JOIN `sabre`.`pt_topics` ON `pt_topics`.`id` = `pt_content`.`topic_id` LEFT JOIN `sabre`.`pt_course` ON `pt_course`.`id` = `pt_content`.`course_id` LEFT JOIN `sabre`.`pt_content_types` ON `pt_content_types`.`id` = `pt_content`.`type_id` WHERE `pt_content`.`course_id` = $parent AND `pt_content`.`deleted` = 'F' ORDER BY `topic_id`, `id` ASC";				
				
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$topicId = $aRecord['topic_id'];
						
						if($topicId == 0){
							$aRecordCollection[$aRecord['id']] = $aRecord;
						}else{
							$currentReference = &$aRecordCollection;
							if($topicId > 0){
								if(isset($currentReference[$topicId])){
									if(!isset($currentReference[$topicId]['children'])){
										$currentReference[$topicId]['children'] = array();
									}
									$currentReference = &$currentReference[$topicId]['children'];
								}
							}								
							$currentReference[$aRecord['id']] = $aRecord;
						}	
					}
				}
				
				$aRecordCollectionCount = count($aRecordCollection);				
				$aRecordCollection = array_values($aRecordCollection);
				array_walk($aRecordCollection, array($this, "_convertAssocToNumArray"));
				
				// echo "<pre>";
				// print_r($aRecordCollection);
				// exit;
				
				return $aRecordCollection;
			}
			
			private function _convertAssocToNumArray(&$parentArr, $key){
				if(is_array($parentArr) && isset($parentArr['children'])){
					$parentArr['children'] = array_values($parentArr['children']);					
					array_walk($parentArr['children'], array($this, "_convertAssocToNumArray"));
				}			
			}

			public function getCategory(array $columns){
			
				

			}

			
		}
	}
	
?>
