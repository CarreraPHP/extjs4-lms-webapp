<?PHP

	namespace sabreHcode\data\service{
		
		class Chart {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllChart(){
				$aRecordCollection = array();

			        for ($i = 0; $i < 10; $i++) {
				
				$aRecordCollection[$i]['name'] = $i;
				$aRecordCollection[$i]['data1'] = 10+$i;
				$aRecordCollection[$i]['data2'] = 5+$i;
				$aRecordCollection[$i]['data3'] = 13+$i;
				$aRecordCollection[$i]['data4'] = 17+$i;
				$aRecordCollection[$i]['data5'] = 40+$i;
				$aRecordCollection[$i]['data6'] = 1+$i;
				$aRecordCollection[$i]['data7'] = 4+$i;
				$aRecordCollection[$i]['data8'] = 5+$i;
				$aRecordCollection[$i]['data9'] = 6+$i;

					}
				
				return $aRecordCollection;
			}

			public function getCourse(array $columns){
			
				

			}

			
		}
	}
	
?>
