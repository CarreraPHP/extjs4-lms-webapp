<?PHP

namespace sabreHcode\data\service {

	class AccessModule {

		private $_oDbInstance;

		public function __construct($dbInstance) {

			$this -> _oDbInstance = $dbInstance;

		}

		public function getAccessModule($role_id) {
			$aRecordCollection = array();
			$mod_acs_lev = array();
			$sSql = "SELECT `id`, `name`, 'N' AS `C`, 'N' AS `R`, 'N' AS `U`, 'N' AS `D`, 'N' AS `P`  FROM `sabre`.`pt_module`";
			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aRecordCollection[$aRecord['id']] = $aRecord;
				}
			}

			$sSql = "SELECT m1.module_id, GROUP_CONCAT(m1.module_acess_level ORDER BY m1.module_acess_level) AS module_acess_level, m2.name";
			$sSql .= " FROM `sabre`.`pt_user_role_meta` m1";
			$sSql .= " LEFT JOIN `sabre`.`pt_module` m2 ON m2.id = m1.module_id";
			$sSql .= " WHERE m1.`role_id` ='$role_id'";
			$sSql .= " GROUP BY m1.module_id ORDER BY name ASC";
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$moduleInstance = &$aRecordCollection[$aRecord['module_id']];
					$mod_acs_lev = explode(',', $aRecord['module_acess_level']);
					$moduleInstance['C'] = in_array('C', $mod_acs_lev) ? 'Y' : 'N';
					$moduleInstance['R'] = in_array('R', $mod_acs_lev) ? 'Y' : 'N';
					$moduleInstance['U'] = in_array('U', $mod_acs_lev) ? 'Y' : 'N';
					$moduleInstance['D'] = in_array('D', $mod_acs_lev) ? 'Y' : 'N';
					$moduleInstance['P'] = in_array('P', $mod_acs_lev) ? 'Y' : 'N';

				}

			}

			return array_values($aRecordCollection);

		}

		public function changeModulePermission($role_id, $module_id, $column) {
			$sSql = "SELECT `id` FROM `sabre`.`pt_user_role_meta` WHERE `role_id` = '$role_id' AND `module_id` = '$module_id' AND `module_acess_level` = '$column'";
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$delete = "DELETE FROM `sabre`.`pt_user_role_meta` WHERE `id` = '" . $aRecord['id'] . "'";
					$oResult = $this -> _oDbInstance -> query($delete);
					if ($oResult) {
						$sql = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_role_id` = '$role_id' AND `module_id` = '$module_id' AND `module_access_level` = '$column'";
						$Result = $this -> _oDbInstance -> query($sql);
						if ($Result -> num_rows > 0) {
							while ($Record = $Result -> fetch_assoc()) {
								$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `id` = '" . $Record['id'] . "'";
								$oResult = $this -> _oDbInstance -> query($delete);
							}
						}
						return json_encode(array('success' => true, 'message' => 'Successfully Deleted'));
					}
				}
			} else {
				$insert = "INSERT INTO `sabre`.`pt_user_role_meta` (`module_acess_level`, `role_id`, `module_id`, `created_by`, `updated_by`, `created_date`, `updated_date`) VALUES('$column', '$role_id', '$module_id', '1', '1', UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()))";
				$oResult = $this -> _oDbInstance -> query($insert);
				if ($oResult) {
					$sql = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_role_id` = '$role_id' AND `module_id` = '$module_id'  AND `module_access_level` != '$column'";
					$Result = $this -> _oDbInstance -> query($sql);
					if ($Result -> num_rows > 0) {
						while ($Record = $Result -> fetch_assoc()) {
							$insert = "INSERT INTO `sabre`.`pt_user_module_access`";
							$insert .= " (`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`,";
							$insert .= " `created_by`, `updated_by`, `created_date`, `updated_date`)";
							$insert .= " VALUES('" . $Record['user_id'] . "', '$role_id', '$module_id', '" . $Record['module_sub_id'] . "', '$column', '1', '1', NOW(), NOW())";
							$oResult = $this -> _oDbInstance -> query($insert);
						}
						return json_encode(array('success' => true, 'message' => 'Successfully Inserted'));
					}
				}
			}

		}

		public function changeTopicPermission($role_id, $module_id, $user_id, $mod_sub_id, $column) {

			$sql = "SELECT * FROM `sabre`.`pt_user_module_access` WHERE `user_role_id` = '$role_id' AND `user_id` = '$user_id' AND `module_id` = '$module_id' AND `module_sub_id` = '$mod_sub_id' AND `module_access_level` = '$column'";
			$Result = $this -> _oDbInstance -> query($sql);
			if ($Result -> num_rows > 0) {
				while ($Record = $Result -> fetch_assoc()) {
					$delete = "DELETE FROM `sabre`.`pt_user_module_access` WHERE `id` = '" . $Record['id'] . "'";
					$oResult = $this -> _oDbInstance -> query($delete);
				}
				return json_encode(array('success' => true, 'message' => 'Successfully Deleted'));
			} else {
				$insert = "INSERT INTO `sabre`.`pt_user_module_access`";
				$insert .= " (`user_id`, `user_role_id`, `module_id`, `module_sub_id`, `module_access_level`,";
				$insert .= " `created_by`, `updated_by`, `created_date`, `updated_date`)";
				$insert .= " VALUES('$user_id', '$role_id', '$module_id', '$mod_sub_id', '$column', '1', '1', NOW(), NOW())";
				$oResult = $this -> _oDbInstance -> query($insert);
				return json_encode(array('success' => true, 'message' => 'Successfully Inserted'));
			}

		}

	}

}
?>
