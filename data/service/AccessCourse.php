<?PHP

namespace sabreHcode\data\service {

	class AccessCourse {

		private $_oDbInstance;

		public function __construct($dbInstance) {

			$this -> _oDbInstance = $dbInstance;

		}

		public function getAllcourses($parent) {
			$aRecordCollection = array();

			$sSql = "SELECT * FROM `sabre`.`pt_course`";

			$oResult = $this -> _oDbInstance -> query($sSql);

			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					$aRecordCollection[] = $aRecord;
				}
			}

			return $aRecordCollection;
		}

	}

}
?>
