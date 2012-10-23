<?PHP

//error_reporting(-1);
require_once '../config/DataCredential.php';

class Catalog {
	
	public $dbConn;
	
	public function __construct($params = array()) {
		$this->dbConn = new mysqli(DataCredential::$host, DataCredential::$user, DataCredential::$passwd, DataCredential::$db);
		$params = $this->handleParams($params);
		echo $this->publish($params['page'], $params['resType']);
	}
	
	protected function handleParams($params){
		$page = isset($params['page']) ? $params['page'] : (isset($_REQUEST['page']) ? $_REQUEST['page'] : 'TrainingCatalog');
		$resType = isset($params['resType']) ? $params['resType'] : (isset($_REQUEST['resType']) ? $_REQUEST['resType'] : 'json');
		
		return array(
				"page" => $page,
				"resType" => $resType
		);
	}
	
	protected function publish($page, $resType){
		$returnVal = '';
		switch ($page) {
			case 'TrainingCatalog':
			default:
				$returnVal = $this->getTrainingCatalog($resType);
				break;
		}
		
		return $returnVal;
	}
	
	public function getTrainingCatalog($resType){
		$returnVal = array();
		$query = "select c.id, c.name, c.parent as parent_id, p.name as parent, c.type, ".
						"if(c.type = 'f', false, true) AS leaf, ".
						"if(c.type = 'f', true, false) AS expanded ". 
						" FROM sab_catalog c LEFT JOIN sab_catalog p ON c.parent = p.id ".
						" ORDER BY c.parent ASC, c.id ASC";
		$qRes = $this->dbConn->query($query);
		while ($row = $qRes->fetch_assoc()) {
			if($row['parent_id'] == 0){
				$row['leaf'] = (bool)$row['leaf'];
				$returnVal[$row['id']] = $row;
				if($row['leaf'] == false){
					$returnVal[$row['id']]['children'] = array();
				}
			}else{
				$returnVal[$row['parent_id']]['children'][] = $row;
			}			
		}
		return $this->getResponse(array_values($returnVal), $resType);
	}
	
	protected function getResponse($valArr = array(), $type = 'json'){
		switch ($type) {
			case 'tree':
				header('content-type: application/json');
				return json_encode(array(
						"text" => '.',
						'expanded' => true,
						"children" => $valArr
				));
				break;
			case 'json':
			default:
				header('content-type: application/json');
				return json_encode($valArr);
				break;
		}		
	}
	
	public function __destruct(){
		$this->dbConn->close();
	}


}

new Catalog();

?>