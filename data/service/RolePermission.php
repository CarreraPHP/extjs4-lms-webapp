<?PHP

	namespace sabreHcode\data\service{
		
		class UserRole {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getRolePermissions(){
				$aRecordCollection = array();
				$sSql = "SELECT `id`, `name` FROM `pt_user_role` WHERE `level` = 'M'";
				$oResult = $this -> _oDbInstance -> query($sSql);
			
				if($oResult -> num_rows > 0){
					while($aRecord = $oResult -> fetch_assoc()){
						$aRecordCollection[] = $aRecord;
					}
				}
				// var_dump($oResult);
				
				return $aRecordCollection;
				
			}
		}
	}
	
?>
