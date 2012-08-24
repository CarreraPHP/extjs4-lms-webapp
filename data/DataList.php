<?PHP
namespace sabreHcode {

	use \sabreHcode\data\service\Category;
	use \sabreHcode\data\service\AccessCategory;
	use \sabreHcode\data\service\Content;
	use \sabreHcode\data\service\Course;
	use \sabreHcode\data\service\Chart;
	use \sabreHcode\data\service\Search;
	use \sabreHcode\data\service\Advsearch;
	use \sabreHcode\data\service\Menu;
	use \sabreHcode\data\service\UserAccess;
	use \sabreHcode\data\service\contentType;
	use \sabreHcode\data\service\UserRole;
	use \sabreHcode\data\service\RolePermission;
	use \sabreHcode\data\service\AccessModule;
	use \sabreHcode\configuration\Database;
	use \sabreHcode\configuration\DataCredential;
	

	require_once '../configuration/Application.php';

	class DataList {

		public static function init() {
			$type = "";
			$display = "";
			$displayMode = "";
			$parent = 1;
			$query = "";

			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\DataCredential");
			\sabreHcode\configuration\Application::load("\sabreHcode\configuration\Database");

			if (isset($_GET['module'])) {

				if (isset($_GET['display'])) {
					$display = $_GET['display'];
				}
				if (isset($_GET['displayMode'])) {
					$displayMode = $_GET['displayMode'];
				}
				if (isset($_GET['userId'])) {
					$userId = $_GET['userId'];
				}
				if (isset($_GET['type'])) {
					$type = $_GET['type'];
				}
				if (isset($_GET['parent'])) {
					$parent = $_GET['parent'];
				}
				
				if (isset($_GET['id'])) {
					$parent = $_GET['id'];
				} else {
					if (isset($_GET['node'])) {
						$parent = $_GET['node'];
					}
				}
				if (isset($_GET['query'])) {

					$query = $_GET['query'];
				}
				if (isset($_GET['moduleType'])) {
					$module = $_GET['moduleType'];
				}
				if(isset($_GET['roleId'])){
					$role_id = $_GET['roleId'];
				}
				if(isset($_GET['module_id'])){
					$module_id = $_GET['module_id'];
				}
				if(isset($_GET['module_sub_id'])){
					$mod_sub_id = $_GET['module_sub_id'];
				}
				
				switch ($_GET['module']) {
					case 'course' :
						$returnVal = DataList::course($display, $type, $parent);
						break;
					case 'topicAccess' :
						$returnVal = DataList::topicAccess($display, $parent);
						break;
					case 'contentAccess' :
						$returnVal = DataList::contentAccess($display, $parent);
						break;
					
					case 'accessTCModule' :
						$returnVal = DataList::accessTCModule($display, $parent);
						break;

					case 'chart' :
						$returnVal = DataList::chart();
						break;

					case 'search' :
						$returnVal = DataList::search($query);
						break;
					case 'advsearch' :
						$returnVal = DataList::advsearch();
						break;

					case 'category' :
						$returnVal = DataList::category($display, $type, $parent);
						break;

					case 'topic' :
						$returnVal = DataList::topic($display, $type, $parent);
						break;

					case 'content' :
						$returnVal = DataList::content($display, $type, $parent);
						break;
					
					case 'forumTopic' :
						$returnVal = DataList::forumTopic($display, $type, $parent);
						break;
						
					case 'forumContent' :
						$returnVal = DataList::forumContent($display, $type, $parent);
						break;
					
					case 'forumSelectedTopic' :
						$returnVal = DataList::forumSelectedTopic($display, $type, $parent);
						break;
						
					case 'menu' :
						$returnVal = DataList::menu();
						break;

					case 'userAccess' :
						$returnVal = DataList::userAccess();
						break;

					case 'contentType' :
						$returnVal = DataList::contentType();
						break;

					case 'userRole' :
						$returnVal = DataList::userRole();
						break;

					case 'accessCategory' :
						$returnVal = DataList::accessCategory($display, $type, $displayMode, $userId, $module);
						break;
					case 'accessAllCategories' :
						$returnVal = DataList::accessAllCategory($display, $type, $displayMode);
						break;
					case 'accessAllCourse' :
						$returnVal = DataList::accessAllCourse($display, $type, $displayMode);
						break;
					case 'accessCourse' :
						$returnVal = DataList::accessCourse($display, $type, $displayMode);
						break;
					case 'rolePermission' :
						$returnVal = DataList::rolePermission();
						break;
					case 'accessModule' :
						$returnVal = DataList::accessModule($role_id);
						break;
					case 'modulePermission' :
						$returnVal = DataList::modulePermission($role_id, $module_id, $_GET['column']);
						break;
					case 'topicPermission' :
						$returnVal = DataList::topicPermission($role_id, $module_id, $userId, $mod_sub_id, $_GET['column']);
						break;
					default :
						$returnVal = DataList::course($display, $type, $parent);
						break;
				}

			} else {
				$returnVal = DataList::course($display, $type, $parent);
			}

			if (isset($_GET['module'])) {
				$returnVal = \json_encode($returnVal);
				//if($_GET['module']=='advsearch') {
				//	$totaldata=100;
				//	$returnVal='({"total":"'.$totaldata.'","results":'.$returnVal.'})';
				//	}

			}

			//echo "<pre>";
			//print_r($returnVal);
			//echo "</pre>";

			echo $returnVal;
		}

		public static function category($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Category");

			$oCategoryInstance = new Category(Database::load());

			if ($parent == 'NaN' || $parent == 'root') {
				$parent = 1;
			}

			if ($display != 'tree') {
				$aAllCategoryList = $oCategoryInstance -> getAllCategories($parent);
				return $aAllCategoryList;
			} else {
				$aCategoryTree = $oCategoryInstance -> getCategoriesTree($parent, $display, $type);
				return $aCategoryTree;
				//array("expanded" => true, "children" => );
			}
		}

		public static function accessCategory($display, $type, $displayMode, $userId, $module) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCategoryList = $oAccessCategoryInstance -> getAllCategories($displayMode, $userId, $module);
			return $aAccessAllCategoryList;

		}
		
		public static function topicAccess($display, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");
			
			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCategoryList = $oAccessCategoryInstance -> getTopics($display, $parent);
			return $aAccessAllCategoryList;

		}
		
		public static function contentAccess($display, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");
			
			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCategoryList = $oAccessCategoryInstance -> getContent($display, $parent);
			return $aAccessAllCategoryList;

		}
		
		public static function accessTCModule($display, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");
			
			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCategoryList = $oAccessCategoryInstance -> getTopicContentAccess($display, $parent);
			return $aAccessAllCategoryList;

		}

		public static function accessAllCategory($display, $type, $displayMode) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCategoryList = $oAccessCategoryInstance -> getAllCategory($displayMode);
			return $aAccessAllCategoryList;

		}

		public static function accessAllCourse($display, $type, $displayMode) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

			$oAccessCategoryInstance = new AccessCategory(Database::load());

			$aAccessAllCourseList = $oAccessCategoryInstance -> getAllCourses($displayMode);
			return $aAccessAllCourseList;

		}

		public static function accessCourse($display, $type, $displayMode, $userId, $module) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

			$oAccessCourseInstance = new AccessCategory(Database::load());

			$aAccessAllCourseList = $oAccessCourseInstance -> getAllcourses($displayMode, $userId, $module);
			return $aAccessAllCourseList;

		}
		
		public static function courseAccess($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessCategory");

			$oAccessCourseInstance = new courseAccess(Database::load());

			$aAccessAllCourseList = $oAccessCourseInstance -> getCourses($display, $type, $parent);
			return $aAccessAllCourseList;

		}

		public static function topic($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Topic");

			$oTopicInstance = new Category(Database::load());
			if ($display != 'tree') {
				$aAllTopicsList = $oTopicInstance -> getAllTopics();
				return $aAllTopicsList;
			} else {
				$aTopicsTree = $oTopicInstance -> getTopicsTree($display, $type, $parent);
				return $aTopicsTree;
			}
		}

		public static function course($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Course");

			$oCourseInstance = new Course(Database::load());
			$aAllCourseList = $oCourseInstance -> getAllCourses(0);
			return $aAllCourseList;
		}

		public static function chart() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Chart");

			$oCourseInstance = new Chart(Database::load());
			$aAllChartList = $oCourseInstance -> getAllChart();
			return $aAllChartList;
		}

		public static function search($query) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Search");

			$oCourseInstance = new Search(Database::load());
			$aAllSearchList = $oCourseInstance -> getAllSearch($query);
			return $aAllSearchList;
		}

		public static function advsearch() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Advsearch");

			$oCourseInstance = new Advsearch(Database::load());
			$aAllSearchList = $oCourseInstance -> getAllSearch();
			return $aAllSearchList;
		}

		public static function content($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

			$oCourseInstance = new Content(Database::load());
			$aAllContentList = $oCourseInstance -> getAllContent($display, $type, $parent);
			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAllContentList, 'total' => count($aAllContentList));
		}
		
		public static function forumTopic($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

			$oCourseInstance = new Content(Database::load());
			$aAllForumTopicList = $oCourseInstance -> getAllForumTopic($display, $type, $parent);
			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAllForumTopicList, 'total' => count($aAllForumTopicList));
		}
		
		public static function forumContent($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

			$oCourseInstance = new Content(Database::load());
			$aAllForumcontent = $oCourseInstance -> getAllForumContent($display, $type, $parent);
			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAllForumcontent, 'total' => count($aAllForumcontent));
		}
		
		public static function forumSelectedTopic($display, $type, $parent) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Content");

			$oCourseInstance = new Content(Database::load());
			$aAllForumTopicList = $oCourseInstance -> getForumSelectedTopic($display, $type, $parent);
			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAllForumTopicList, 'total' => count($aAllForumTopicList));
		}
		
		public static function menu() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\Menu");

			$oMenuInstance = new Menu(Database::load());
			$aMenuList = $oMenuInstance -> getAllMenus();

			return $aMenuList;
		}

		public static function userAccess() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\UserAccess");

			$oUserInstance = new UserAccess(Database::load());
			$aUserList = $oUserInstance -> getAllusers();

			return $aUserList;
		}

		public static function contentType() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\ContentType");

			$ocontentTypeInstance = new ContentType(Database::load());
			$acontentTypeList = $ocontentTypeInstance -> getAllContentType();

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $acontentTypeList, 'total' => count($acontentTypeList));
		}

		public static function userRole() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\UserRole");

			$oUserRoleInstance = new UserRole(Database::load());
			$auserRoleList = $oUserRoleInstance -> getAllUserRole();

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $auserRoleList, 'total' => count($auserRoleList));
		}

		public static function rolePermission() {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\RolePermission");

			$oRolePermissionInstance = new RolePermission(Database::load());
			$aRolePermissionList = $oRolePermissionInstance -> getRolePermissions();

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aRolePermissionList, 'total' => count($aRolePermissionList));
		}

		public static function accessModule($role_id) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessModule");

			$oAccessModuleInstance = new AccessModule(Database::load());
			$aAccessModuleList = $oAccessModuleInstance -> getAccessModule($role_id);

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAccessModuleList, 'total' => count($aAccessModuleList));
		}
		
		public static function modulePermission($role_id, $module_id, $column) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessModule");

			$oAccessModuleInstance = new AccessModule(Database::load());
			$aAccessModuleList = $oAccessModuleInstance -> changeModulePermission($role_id, $module_id, $column);

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAccessModuleList, 'total' => count($aAccessModuleList));
		}
		
		public static function topicPermission($role_id, $module_id, $userId, $mod_sub_id, $column) {
			\sabreHcode\configuration\Application::load("\sabreHcode\data\service\AccessModule");

			$oAccessModuleInstance = new AccessModule(Database::load());
			$aAccessModuleList = $oAccessModuleInstance -> changeTopicPermission($role_id, $module_id, $userId, $mod_sub_id, $column);

			return array('success' => true, 'message' => 'return all records successfully', 'data' => $aAccessModuleList, 'total' => count($aAccessModuleList));
		}

	}

	DataList::init();

}
?>
