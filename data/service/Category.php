<?PHP

namespace sabreHcode\data\service {

	class Category {

		private $_oDbInstance;

		public function __construct($dbInstance) {

			$this -> _oDbInstance = $dbInstance;

		}

		public function getAllCategories($parent) {
			$aRecordCollection = array();

			$sSql = "SELECT `id`, `name` FROM `sabre`.`pt_category`";

			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
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
		public function getCategoriesTree($parent, $display, $type) {
			$aRecordCollection = array();
			$currentReference = &$aRecordCollection;
			$key = array();
			$user_id = '';
			if(isset($_SESSION['userDetails'])){
				$user_id = $_SESSION['userDetails'][0]['id'];	
			}
			
			$permissionArray = array('create' => false, 'update' => false, 'read' => false, 'delete' => false, 'permission' => false);

			$sql = "SELECT CONCAT(`path`,`id`) AS path FROM `sabre`.`pt_category` WHERE `id` = '$parent'";
			$Result = $this -> _oDbInstance -> query($sql);
			if ($Result -> num_rows > 0) {
				while ($Record = $Result -> fetch_assoc()) {
					$categoryId = substr(implode(",", explode("/", $Record['path'])), 1);

					$sql = "SELECT `id`, `user_id`, `user_role_id`, `module_id`, `module_sub_id`, GROUP_CONCAT(`module_access_level`) As module_access_level FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '1' AND `module_sub_id` IN (" . $categoryId . ") GROUP BY `module_id`, `module_sub_id` ORDER BY `module_sub_id` DESC";
					
					$aResult = $this -> _oDbInstance -> query($sql);
					if ($aResult -> num_rows > 0) {
						while ($aRecord = $aResult -> fetch_assoc()) {
							$mod_acc_lev = explode(",", $aRecord['module_access_level']);
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
				}
			} else {
				return $aRecordCollection[] = array("leaf" => true, 'name' => "No leaf available or No permission");
			}

			if ($permissionArray['read'] || $parent == 1) {
				$sSql = "SELECT child.id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, FALSE AS `leaf`, child.`parent_id`, `parent`.`name` AS `parent_name` ";
				$sSql .= " FROM `sabre`.`pt_category` AS `child`";
				$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`parent_id` = `parent`.`id`";
				$sSql .= " WHERE (`child`.`parent_id` = '$parent' AND `child`.`deleted` = 'F')";
				$sSql .= " UNION ALL ";
				$sSql .= " SELECT CONCAT('cou', child.id) AS id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, TRUE AS `leaf`, child.`category_id` AS `parent_id`, `parent`.`name` AS `parent_name` ";
				$sSql .= " FROM `sabre`.`pt_course` AS `child`";
				$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`category_id` = `parent`.`id`";
				$sSql .= " WHERE (`child`.`category_id` = '$parent' AND `child`.`deleted` = 'F')";
				$sSql .= " ORDER BY `parent_id` ASC, `id` ASC";

				$oResult = $this -> _oDbInstance -> query($sSql);

				if ($oResult -> num_rows > 0) {
					while ($aRecord = $oResult -> fetch_assoc()) {
						$childPermissionArray = $permissionArray;

						$path = $aRecord['path'];
						$pathArr = explode('/', $path);
						$pathArrCount = count($pathArr);

						// for permission
						$courseId = preg_replace('/cou/', '', $aRecord['id']);
						$sql = "SELECT `id`, `user_id`, `user_role_id`, `module_id`, `module_sub_id`, GROUP_CONCAT(`module_access_level`) As module_access_level FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_id` = '1' AND `module_sub_id` IN (" . $courseId . ") GROUP BY `module_id`, `module_sub_id` ORDER BY `module_sub_id` ASC";
						$Result = $this -> _oDbInstance -> query($sql);
						if ($Result -> num_rows > 0) {
							while ($Record = $Result -> fetch_assoc()) {
								$mod_acc_lev = explode(",", $Record['module_access_level']);
								if (in_array('C', $mod_acc_lev)) {
									$childPermissionArray['create'] = true;
								}
								if (in_array('R', $mod_acc_lev)) {
									$childPermissionArray['read'] = true;
								}
								if (in_array('U', $mod_acc_lev)) {
									$childPermissionArray['update'] = true;
								}
								if (in_array('D', $mod_acc_lev)) {
									$childPermissionArray['delete'] = true;
								}
								if (in_array('P', $mod_acc_lev)) {
									$childPermissionArray['permission'] = true;
								}
							}
						}
						$aRecord['permission'] = $childPermissionArray;
						// for permission

						if ($pathArrCount == 1) {
							
							$aRecordCollection[$aRecord['id']] = $aRecord;
						} else {
							$currentReference = &$aRecordCollection;
							for ($i = 0; $i < $pathArrCount; $i++) {

								if ($pathArr[$i] > 0) {
									if (isset($currentReference[$pathArr[$i]])) {
										if (!isset($currentReference[$pathArr[$i]]['children'])) {
											$currentReference[$pathArr[$i]]['children'] = array();
										}
										$currentReference = &$currentReference[$pathArr[$i]]['children'];
									}
								} else {
									$currentReference[$aRecord['id']] = $aRecord;
								}
							}
						}
					}
				} else {
					$aRecordCollection[] = array("leaf" => true, 'name' => "No Course");
				}
				
				$aRecordCollectionCount = count($aRecordCollection);
				$aRecordCollection = array_values($aRecordCollection);
				array_walk($aRecordCollection, array($this, "_convertAssocToNumArray"));
			} else {
				$aRecordCollection[] = array("leaf" => true, 'name' => "No permission");
			}

			return $aRecordCollection;
		}

		public function getCategoriesTree1($parent, $display, $type) {
			$aRecordCollection = array();
			$currentReference = &$aRecordCollection;

			$key = array();
			$user_id = $_SESSION['userDetails'][0]['id'];
			if ($parent != '1' && $user_id != '1') {
				$sql = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_id` = '$user_id' AND `module_sub_id` = '$parent'";
				$oResult = $this -> _oDbInstance -> query($sql);
				if ($oResult -> num_rows > 0) {
					while ($aRecord = $oResult -> fetch_assoc()) {
						$module_access = $aRecord['module_access_level'];
						if ($module_access == 'R') {
							$sSql = "SELECT child.id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, FALSE AS `leaf`, child.`parent_id`, `parent`.`name` AS `parent_name` ";
							$sSql .= " FROM `sabre`.`pt_category` AS `child`";
							$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`parent_id` = `parent`.`id`";
							$sSql .= " WHERE (`child`.`parent_id` = '$parent' AND `child`.`deleted` = 'F')";
							$sSql .= " UNION ALL ";
							$sSql .= " SELECT CONCAT('cou', child.id) AS id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, TRUE AS `leaf`, child.`category_id` AS `parent_id`, `parent`.`name` AS `parent_name` ";
							$sSql .= " FROM `sabre`.`pt_course` AS `child`";
							$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`category_id` = `parent`.`id`";
							$sSql .= " WHERE (`child`.`category_id` = '$parent' AND `child`.`deleted` = 'F')";
							$sSql .= " ORDER BY `parent_id` ASC, `id` ASC";

							$oResult = $this -> _oDbInstance -> query($sSql);

							if ($oResult -> num_rows > 0) {
								while ($aRecord = $oResult -> fetch_assoc()) {
									$path = $aRecord['path'];
									$pathArr = explode('/', $path);
									$pathArrCount = count($pathArr);

									if ($pathArrCount == 1) {
										$aRecordCollection[$aRecord['id']] = $aRecord;
									} else {
										$currentReference = &$aRecordCollection;
										for ($i = 0; $i < $pathArrCount; $i++) {

											if ($pathArr[$i] > 0) {
												if (isset($currentReference[$pathArr[$i]])) {
													if (!isset($currentReference[$pathArr[$i]]['children'])) {
														$currentReference[$pathArr[$i]]['children'] = array();
													}
													$currentReference = &$currentReference[$pathArr[$i]]['children'];
												}
											} else {
												$currentReference[$aRecord['id']] = $aRecord;
											}
										}
									}
								}
							} else {
								$aRecordCollection[] = array("leaf" => true, 'name' => "No Course");
							}
						}
					}
				} else {
					return json_encode(array('success' => true, 'message' => 'You don\'t have read permission'));

				}

			} else {
				$sSql = "SELECT child.id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, FALSE AS `leaf`, child.`parent_id`, `parent`.`name` AS `parent_name` ";
				$sSql .= " FROM `sabre`.`pt_category` AS `child`";
				$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`parent_id` = `parent`.`id`";
				$sSql .= " WHERE (`child`.`parent_id` = '$parent' AND `child`.`deleted` = 'F')";
				$sSql .= " UNION ALL ";
				$sSql .= " SELECT CONCAT('cou', child.id) AS id, child.name, child.description, SUBSTRING_INDEX(child.`path`, '/$parent/', -1) AS `path`, TRUE AS `leaf`, child.`category_id` AS `parent_id`, `parent`.`name` AS `parent_name` ";
				$sSql .= " FROM `sabre`.`pt_course` AS `child`";
				$sSql .= " LEFT JOIN `sabre`.`pt_category` AS `parent` ON `child`.`category_id` = `parent`.`id`";
				$sSql .= " WHERE (`child`.`category_id` = '$parent' AND `child`.`deleted` = 'F')";
				$sSql .= " ORDER BY `parent_id` ASC, `id` ASC";

				$oResult = $this -> _oDbInstance -> query($sSql);

				if ($oResult -> num_rows > 0) {
					while ($aRecord = $oResult -> fetch_assoc()) {
						$path = $aRecord['path'];
						$pathArr = explode('/', $path);
						$pathArrCount = count($pathArr);

						if ($pathArrCount == 1) {
							$aRecordCollection[$aRecord['id']] = $aRecord;
						} else {
							$currentReference = &$aRecordCollection;
							for ($i = 0; $i < $pathArrCount; $i++) {

								if ($pathArr[$i] > 0) {
									if (isset($currentReference[$pathArr[$i]])) {
										if (!isset($currentReference[$pathArr[$i]]['children'])) {
											$currentReference[$pathArr[$i]]['children'] = array();
										}
										$currentReference = &$currentReference[$pathArr[$i]]['children'];
									}
								} else {
									$currentReference[$aRecord['id']] = $aRecord;
								}
							}
						}
					}
				} else {
					$aRecordCollection[] = array("leaf" => true, 'name' => "No Course");
				}
			}

			$aRecordCollectionCount = count($aRecordCollection);
			$aRecordCollection = array_values($aRecordCollection);
			array_walk($aRecordCollection, array($this, "_convertAssocToNumArray"));

			return $aRecordCollection;
		}

		private function _convertAssocToNumArray(&$parentArr, $key) {
			if (is_array($parentArr) && isset($parentArr['children'])) {
				$parentArr['children'] = array_values($parentArr['children']);
				array_walk($parentArr['children'], array($this, "_convertAssocToNumArray"));
			}
		}

		public function getCategory(array $columns) {

		}

	}

}
?>
