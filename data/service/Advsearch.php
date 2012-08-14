<?PHP

namespace sabreHcode\data\service {

	class Advsearch {

		private $_oDbInstance;

		public function __construct($dbInstance) {

			$this -> _oDbInstance = $dbInstance;

		}

		public function getAllSearch() {

			$aRecordCollection = array();
			$finalArray = array();
			$orsybol = "";
			$query = $_GET["searchkey"];
			$first = 0;
			$coursename = "";
			if (isset($_GET["course-name"])) {
				$first = 1;
				$coursename = "`course_name` LIKE '%$query%'";
			}
			if (isset($_GET["course_description"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `course_description` LIKE '%$query%'";
				$first = 1;

			}

			if (isset($_GET["content-description"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `description` LIKE '%$query%'";
				$first = 1;

			}
			if (isset($_GET["content-name"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `name` LIKE '%$query%'";
				$first = 1;

			}
			if (isset($_GET["content-text"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `text` LIKE '%$query%'";
				$first = 1;

			}
			if (isset($_GET["topic-description"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `topic_description` LIKE '%$query%'";
				$first = 1;

			}

			if (isset($_GET["topic-name"])) {
				if ($first == 1) {
					$orsybol = "||";
				}
				$coursename .= " $orsybol `topic_name` LIKE '%$query%'";
				$first = 1;

			}

			$start = $_GET['start'];
			$limit = $_GET['limit'];
			$sSql = "SELECT id,name, description,text,topic_name,topic_description,course_name,course_id, course_description FROM `sabre`.`contentsearchview` where ($coursename);";

			$oResult = $this -> _oDbInstance -> query($sSql);
			$count = $oResult -> num_rows;
			
			$sSql  = "SELECT "; 
			$sSql .= "id, name, description, text, topic_name, topic_id, topic_description, ";
			$sSql .= "type_id, type, ";  
			$sSql .= "course_id, course_name, course_description "; 
			$sSql .= "FROM `sabre`.`contentsearchview` "; 
			$sSql .= "WHERE ($coursename) "; 
			$sSql .= "LIMIT " . $start .", " . $limit;
			
			$oResult = $this -> _oDbInstance -> query($sSql);
			if ($oResult -> num_rows > 0) {
				while ($aRecord = $oResult -> fetch_assoc()) {
					if($aRecord['type'] == 'FLASH' || $aRecord['type'] == 'VIDEO' || $aRecord['type'] == 'AUDIO'){
							$aRecord['text'] = "http://localhost/sabreHcode/".$aRecord['text'];
					}
					$aRecord['text'] = base64_encode($aRecord['text']);
					$aRecordCollection[] = $aRecord;
				}
			} else {
				$aRecordCollection["topic_name"] = "No matches found";

			}

			$finalArray['items'] = $aRecordCollection;
			$finalArray['total'] = $count;

			/*  for ($i = 0; $i < 10; $i++) {

			 $aRecordCollection[$i]['id'] = $i;
			 $aRecordCollection[$i]['title'] = "Title".$i;

			 }*/

			return $finalArray;
		}

		public function getCourse(array $columns) {

		}

	}

}
?>
