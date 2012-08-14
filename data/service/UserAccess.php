<?PHP

	namespace sabreHcode\data\service{
		
		class UserAccess {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllusers(){
				$aRecordCollection = array();
				//WHERE (`category_id` = $parent OR `path` LIKE '%/1/%') 
				$sSql = "SELECT `id`, `first_name`, `last_name`, `screenname`, `user_email`, `role_id` FROM `sabre`.`pt_user` WHERE role_id != '' ORDER BY `role_id` ASC";
				$oResult = $this -> _oDbInstance -> query($sSql);
				
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecordCollection[] = $aRecord;
					}
				}
				return $aRecordCollection;
			}
		}
	}
	
?>
