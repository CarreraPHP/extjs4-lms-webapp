<?PHP

	namespace sabreHcode\data\service{
		
		class Search {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllSearch($query){
				$aRecordCollection = array();

							
				$sSql = "SELECT CONCAT('cou', id) AS id, name, description FROM `sabre`.`pt_course` WHERE (`name` LIKE '%$query%' || `description` LIKE '%$query%') and deleted='F'";
//echo $sSql;
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecordCollection[] = $aRecord;

						// $aRecordCollection['children'] = $aRecord;
					}
				}

			      /*  for ($i = 0; $i < 10; $i++) {
				
				$aRecordCollection[$i]['id'] = $i;
				$aRecordCollection[$i]['title'] = "Title".$i;
		

					}*/
				
				return $aRecordCollection;
			}

			public function getCourse(array $columns){
			
				

			}

			
		}
	}
	
?>
