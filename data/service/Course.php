<?PHP

	namespace sabreHcode\data\service{
		
		class Course {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllCourses($parent){
				$aRecordCollection = array();
				//WHERE (`category_id` = $parent OR `path` LIKE '%/1/%') 
				$sSql = "SELECT CONCAT('cou', id) AS id, name, description, SUBSTRING_INDEX(`path`, '/1/', -1) AS `path`, TRUE AS `leaf`, `category_id` AS `parent_id` FROM `sabre`.`pt_course` WHERE `deleted` = 'F' ORDER BY `parent_id` ASC, `id` ASC";
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecordCollection[] = $aRecord;
					}
				}
				// var_dump($oResult);
				
				return $aRecordCollection;
			}

			public function getCourse(array $columns){
			
				

			}

			
		}
	}
	
?>
