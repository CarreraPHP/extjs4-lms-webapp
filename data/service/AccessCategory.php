<?PHP

namespace sabreHcode\data\service {

	class AccessCategory {

		private $_oDbInstance;

		public function __construct($dbInstance) {

			$this -> _oDbInstance = $dbInstance;

		}

		public function getAllCategories($displayMode, $userId, $module) {
			$aRecordCollection = array();
			$refArray = array();
			$pathStringArr = array();

			/*
			 * Get module id
			 */
			$getCategoryId = "SELECT `id` FROM `sabre`.`pt_module` WHERE name = '$module'";
			$categoryId = $this -> _oDbInstance -> query($getCategoryId);
			$categoryIdResult = $categoryId -> fetch_assoc();
			$module_id = $categoryIdResult['id'];

			/*
			 * Get category name and path.
			 */
			if ($module == 'category')
				$sSql = "SELECT `id`,`name`, `path` FROM `sabre`.`pt_category`";
			else
				$sSql = "SELECT `id`,`name`, `path` FROM `sabre`.`pt_course`";

			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					//$aRecordCollection[] = $aRecord;

					$refArray[$aRecord['id']] = $aRecord;
				}
			}

			$sSql = "SELECT CONCAT('acs', m1.id) AS id, m1.user_role_id AS role_id, m1.user_id, m1.module_sub_id as instance_id, m2.name, m2.path, m3.name AS role_name ";
			$sSql .= "FROM `sabre`.`pt_user_module_access` m1";
			if ($module == 'category')
				$sSql .= " LEFT JOIN `sabre`.`pt_Category` m2 ON m2.`id` = m1.module_sub_id";
			else
				$sSql .= " LEFT JOIN `sabre`.`pt_Course` m2 ON m2.`id` = m1.module_sub_id";
			$sSql .= " LEFT JOIN `sabre`.`pt_user_role` m3 ON m1.`user_role_id` = m3.`id`";
			$sSql .= " WHERE m1.`user_id` = '$userId' AND m1.`module_id` = '$module_id'";
			$sSql .= " GROUP BY `role_id`, `user_id`, `instance_id`";

			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aRecordCollection[] = $aRecord;
				}

				$recordCount = count($aRecordCollection);
				for ($i = 0; $i < $recordCount; $i++) {
					$pathStringArr = explode("/", $aRecordCollection[$i]['path']);

					for ($j = 0; $j < count($pathStringArr); $j++) {
						if ($pathStringArr[$j] != '') {
							if ($pathStringArr[$j] != 0) {
								$pathStringArr[$j] = $refArray[$pathStringArr[$j]]['name'];
							} else {
								$pathStringArr[$j] = '/';
							}

						}
					}
					$aRecordCollection[$i]['path'] = implode("/", $pathStringArr) . $aRecordCollection[$i]['name'];
					$aRecordCollection[$i]['module'] = $module;
					if (isset($displayMode) && $displayMode == 'path') {
						$aRecordCollection[$i]['name'] = $aRecordCollection[$i]['path'] . $aRecordCollection[$i]['name'];
					}

				}
			} else {
				if($module == 'category')
					$aRecordCollection[] = array('path' => 'No Category Path', 'name' => "No Category", 'role_name' => 'No Role');
				else
					$aRecordCollection[] = array('path' => 'No Course Path', 'name' => "No Course", 'role_name' => 'No Role');
			}
			
			return $aRecordCollection;
		}

			public function getAllCategory($displayMode) {
			$aRecordCollection = array();
			$refArray = array();
			$pathStringArr = array();
			
			$sSql = "SELECT `id`,`name`, `path` FROM `sabre`.`pt_category`";
			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					if($aRecord['id'] != '1'){
						$aRecordCollection[] = $aRecord;	
					}
					
					$refArray[$aRecord['id']] = $aRecord;
				}
			}

			$recordCount = count($aRecordCollection);
			for ($i = 0; $i < $recordCount; $i++) {
				$pathStringArr = explode("/", $aRecordCollection[$i]['path']);
				
				for ($j = 0; $j < count($pathStringArr); $j++) {
					if ($pathStringArr[$j] != '') {
						if ($pathStringArr[$j] != 0) {
							$pathStringArr[$j] = $refArray[$pathStringArr[$j]]['name'];
						} else {
							$pathStringArr[$j] = '/';
						}

					}
				}
				$aRecordCollection[$i]['path'] = implode("/", $pathStringArr);
				if(isset($displayMode) && $displayMode == 'path'){
					$aRecordCollection[$i]['name'] = $aRecordCollection[$i]['path'].$aRecordCollection[$i]['name'];	
				}
				
			}
			
			return $aRecordCollection;
		}

		public function getAllcourse($displayMode, $userId, $module) {
			$aRecordCollection = array();
			$sql = "SELECT `id`, `name` FROM `sabre`.`pt_category`";
			$oResult = $this -> _oDbInstance -> query($sql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aCatRecordCollection[$aRecord['id']] = $aRecord['name'];
				}
			}

			$sSql = "SELECT * FROM `sabre`.`pt_course` WHERE `id` != '1'";

			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$pathStringArr = explode("/", $aRecord['path']);

					for ($j = 0; $j < count($pathStringArr); $j++) {
						if ($pathStringArr[$j] != '') {
							if ($pathStringArr[$j] != 0) {
								$pathStringArr[$j] = $aCatRecordCollection[$pathStringArr[$j]];
							} else {
								$pathStringArr[$j] = 'top';
							}
						}
					}
					$aRecord['path'] = implode("/", $pathStringArr);
					$aRecordCollection[] = $aRecord;
				}
			}
			return $aRecordCollection;
		}
		
		public function getAllCourses($displayMode) {
			$aRecordCollection = array();
			$refArray = array();
			$pathStringArr = array();
			
			$sSql = "SELECT `id`,`name`, `path` FROM `sabre`.`pt_course`";
			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					if($aRecord['id'] != '1'){
						$aRecordCollection[] = $aRecord;	
					}
					
					$refArray[$aRecord['id']] = $aRecord;
				}
			}

			$recordCount = count($aRecordCollection);
			for ($i = 0; $i < $recordCount; $i++) {
				$pathStringArr = explode("/", $aRecordCollection[$i]['path']);
				
				for ($j = 0; $j < count($pathStringArr); $j++) {
					if ($pathStringArr[$j] != '') {
						if ($pathStringArr[$j] != 0) {
							$pathStringArr[$j] = $refArray[$pathStringArr[$j]]['name'];
						} else {
							$pathStringArr[$j] = '/';
						}

					}
				}
				$aRecordCollection[$i]['path'] = implode("/", $pathStringArr);
				if(isset($displayMode) && $displayMode == 'path'){
					$aRecordCollection[$i]['name'] = $aRecordCollection[$i]['path'].$aRecordCollection[$i]['name'];	
				}
				
			}
			
			return $aRecordCollection;
		}
		
		public function getTopics($display, $parent){
			$aRecordCollection = array();
			$parent =  substr("$parent", 3);
			$sSql  = "SELECT `id`, `name`, `description`, `course_id` FROM `sabre`.`pt_topics` WHERE course_id = '$parent' AND deleted = 'F'";
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aRecordCollection[] = $aRecord;
				}
			}
			return $aRecordCollection;
		}
		
		public function getContent($display, $parent){
			$aRecordCollection = array();
			$parent =  substr("$parent", 3);
			$sSql  = "SELECT `id`, `name`, `description`, `course_id` FROM `sabre`.`pt_content` WHERE course_id = '$parent' AND deleted = 'F'";
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aRecordCollection[] = $aRecord;
				}
			}
			return $aRecordCollection;
		}
		
		public function getTopicContentAccess($display, $parent){
			$aRecordCollection = array();
			
			$parent =  substr("$parent", 3);
			$sSql  = "SELECT user.id AS user_id, user.first_name, user.last_name, user.screenname, user.user_email";
			$sSql .= ", module.user_role_id, module.module_id, module.module_sub_id, GROUP_CONCAT(`module_access_level`) As module_access_level";
			$sSql .= " FROM `sabre`.`pt_user` AS `user`";
			$sSql .= " LEFT JOIN `pt_user_module_access` AS module ON `user`.id = module.user_id";
			$sSql .= " WHERE module_id = '2' AND module.module_sub_id = '$parent'";
			$sSql .= " GROUP BY `module_id`, `module_sub_id`, `user`.`id`";
			$sSql .= " ORDER BY `module_sub_id` DESC";
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$mod_acc_lev = explode(",", $aRecord['module_access_level']);
					if(in_array('C', $mod_acc_lev)){
						$aRecord['C'] = 'Y';
					}else{
						$aRecord['C'] = 'N';
					}
					if(in_array('R', $mod_acc_lev)){
						$aRecord['R'] = 'Y';
					}else{
						$aRecord['R'] = 'N';
					}
					if(in_array('U', $mod_acc_lev)){
						$aRecord['U'] = 'Y';
					}else{
						$aRecord['U'] = 'N';
					}
					if(in_array('D', $mod_acc_lev)){
						$aRecord['D'] = 'Y';
					}else{
						$aRecord['D'] = 'N';
					}
					if(in_array('P', $mod_acc_lev)){
						$aRecord['P'] = 'Y';
					}else{
						$aRecord['P'] = 'N';
					}
					
					$aRecordCollection[] = $aRecord;
				}
				return $aRecordCollection;
				
			}else {
				return array("leaf" => true, 'name' => "No permission", 'data' => $aRecordCollection);
			}
			
			
		}
	}

}
?>
