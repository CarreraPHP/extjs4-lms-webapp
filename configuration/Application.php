<?PHP

	namespace sabreHcode\configuration{

		session_start();
		date_default_timezone_set('Asia/Kolkata');
		error_reporting(-1);
		
		class Application {

//			public static $environment = "internal";
//			public static $driver = "mysqli";
			
			/**
			 * load is a factory pattern method for the Application
			 * 
			 * @param $file
			 * should be a fully qualified class name with namespace.
			 * 
			 * @param $factory
			 * should specify whether the inclusion is a runtime level or not.
			 */
			public static function load($file, $factory = FALSE){

				//var_dump($file);
				$delimiter = '';
				
				if(preg_match('/:\\\/', $_SERVER['SCRIPT_FILENAME'])){
					$delimiter = '\\';
				}else{
					$delimiter = '/';
				}
				
				$basepathArr = explode(substr(__NAMESPACE__, 0, stripos(__NAMESPACE__, '\\')), $_SERVER['SCRIPT_FILENAME']);
				$basepath = $basepathArr[0];
				
				if($factory){
					if(include_once $basepath . str_replace('\\', $delimiter, $file) . ".php"){
						return new $file;
					}
				}else{
					require_once $basepath . str_replace('\\', $delimiter, $file) . ".php";
				}
			}
			
		}
	}
	
?>
