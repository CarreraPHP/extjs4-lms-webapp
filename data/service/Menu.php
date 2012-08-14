<?PHP

	namespace sabreHcode\data\service{
		
		class Menu {

			private $_oDbInstance;
			
			public function __construct($dbInstance){

				$this -> _oDbInstance = $dbInstance;

			}

			public function getAllMenus(){
				$aMenuCollection = array(
					array(
						'name' => 'Category',
						'cls' => 'add-button',
						'appliedfor' => 'course'  
					),
					array(
						'name' => 'Course',
						'cls' => 'add-button',
						'appliedfor' => 'course'
					),
					array(
						'name' => 'Topic',
						'cls' => 'add-button',
						'appliedfor' => 'content',  
					),
					array(
						'name' => 'Content',
						'cls' => 'add-button',
						'appliedfor' => 'content'  
					),
					array(
						'name' => 'Login',
						'cls' => '',
						'appliedfor' => 'user'  
					),
					array(
						'name' => 'Logout',
						'cls' => '',
						'appliedfor' => 'user'  
					)
				);
				
				return $aMenuCollection;
			}
		}
	}
	
?>
