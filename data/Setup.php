<?PHP

namespace sabreHcode {

    use \sabreHcode\data\service\Install;
    
    require_once '../configuration/Application.php';

    class Setup {

        public static function init() {
            $returnVal = "";
            if (isset($_POST)) {
                if (isset($_POST['module']) && $_POST['module'] == 'db_config') {
                    $returnVal = self::database($_POST);
                }

                $returnVal = \json_encode($returnVal);
            }
            echo $returnVal;
        }

        public static function database($data) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Install");
            $in = new Install();
            return $in->database();
        }

    }
    
    
    Setup::init();            

}
?>