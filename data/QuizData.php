<?PHP

namespace sabreHcode {

    use \sabreHcode\data\service\Quiz;
use \sabreHcode\configuration\Database;
use \sabreHcode\configuration\DataCredential;

require_once '../configuration/Application.php';

    class QuizData {

        public static function init() {
            $type = "";

            \sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
            \sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");

            if (isset($_GET['module'])) {

                if (isset($_POST['user_id'])) {
                    $user_id = $_POST['user_id'];
                }
                if (isset($_GET['type'])) {
                    $type = $_GET['type'];
                }
                if (isset($_GET['course_id'])) {
                    $course_id = $_GET['course_id'];
                }
                if (isset($_GET['topic_id'])) {
                    $topic_id = $_GET['topic_id'];
                }
                if (isset($_GET['content_id'])) {
                    $content_id = $_GET['content_id'];
                }
                if (isset($_POST['course_id'])) {
                    $course_id = $_POST['course_id'];
                }
                if (isset($_POST['topic_id'])) {
                    $topic_id = $_POST['topic_id'];
                }
                if (isset($_POST['content_id'])) {
                    $content_id = $_POST['content_id'];
                }

                switch ($_GET['module']) {
                    case 'Quiz' :
                        $returnVal = QuizData::quiz($type, $course_id, $topic_id, $content_id);
                        break;
                    case 'quizAttempt' :
                        $returnVal = QuizData::quizAttempt($user_id, $course_id, $topic_id, $content_id);
                        break;
                    case 'resultChart' :
                        $returnVal = QuizData::resultChart($course_id, $topic_id, $content_id);
                        break;
                    case 'quizType' :
                        $returnVal = QuizData::quizType();
                        break;
                    default :
                        $returnVal = QuizData::quiz($type, $course_id, $topic_id, $content_id);
                        break;
                }
            }
            if (isset($_POST['module'])) {
                if (isset($_POST['type'])) {
                    $type = $_POST['type'];
                }
                if (isset($_POST['course_id'])) {
                    $course_id = $_POST['course_id'];
                }
                if (isset($_POST['topic_id'])) {
                    $topic_id = $_POST['topic_id'];
                }
                if (isset($_POST['content_id'])) {
                    $content_id = $_POST['content_id'];
                }
                switch ($_POST['module']) {
                    case 'saveQuiz':
                        $returnVal = QuizData::saveQuiz($_POST);
                        break;
                    case 'resultQuiz' :
                        $returnVal = QuizData::quiz($type, $course_id, $topic_id, $content_id);
                        break;
                    case 'addQuiz' :
                        $returnVal = QuizData::addQuiz($_POST);
                        break;
                    default:
                        $returnVal = QuizData::saveQuiz($_POST);
                        break;
                }
            }

            if (isset($_GET['module'])) {
                $returnVal = \json_encode($returnVal);
            } else {
                $returnVal = \json_encode($returnVal);
            }
            echo $returnVal;
        }

        public static function quizType() {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aQuizType = $oQuizInstance->getQuizType();
            return $aQuizType;
        }

        public static function quiz($type, $course_id, $topic_id, $content_id) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aAllSingleQuizList = $oQuizInstance->getAllSingleQuiz($course_id, $topic_id, $content_id);
            return $aAllSingleQuizList;

            if ($type == 'result') {
                $type_id = '4';
                $aSingleQuizResult = $oQuizInstance->getSingleQuizResult($type_id, $course_id, $topic_id, $content_id);
                return $aSingleQuizResult;
            }
        }

        public static function resultChart($course_id, $topic_id, $content_id) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aQuizResultChart = $oQuizInstance->getQuizResultChart($course_id, $topic_id, $content_id);
            return $aQuizResultChart;
        }

        public static function saveQuiz($data) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aSaveQuiz = $oQuizInstance->SaveQuiz($data);
            return $aSaveQuiz;
        }

        public static function addQuiz($data) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aAddQuiz = $oQuizInstance->AddQuiz($data);
            return $aAddQuiz;
        }

        public static function quizAttempt($user_id, $course_id, $topic_id, $content_id) {
            \sabreHcode\configuration\Application::load("\sabreHcode\data\service\Quiz");

            $oQuizInstance = new Quiz(Database::load());
            $aGetQuizAttempt = $oQuizInstance->setQuizAttempt($user_id, $course_id, $topic_id, $content_id);
            return $aGetQuizAttempt;
        }

    }

    QuizData::init();
}
?>
