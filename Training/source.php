<?PHP

class source {

	public $sourceUrl;
	public $type;

	public function __construct() {
		$this->type = isset($_REQUEST['type']) ? $_REQUEST['type'] : 'html';
		$this->sourceUrl = isset($_REQUEST['source']) ? $_REQUEST['source'] : 'day/1/Border_layout_and_Viewport/index.html';

		if(file_exists($this->sourceUrl)){
			$returnStr = str_replace(
							"#-REP-#", htmlentities(
											trim(
															str_replace(
																			"<?PHP", '', str_replace(
																							"?>", '', file_get_contents($this->sourceUrl)
																			)
															)
											)
							), $this->generateHtmlContent());
		}else{
			$returnStr = str_replace(
							"#-REP-#", "NO CONTENT", $this->generateHtmlContent());
		}
			
		echo $returnStr;
	}

	public function generateHtmlContent() {
		$source = "<!doctype html>";
		$source .= "<HTML>";
		$source .= "<HEAD>";
		$source .= "<link rel='stylesheet' type='text/css' href='lib/prettify/prettify.css' />";
		$source .= "<script src='lib/prettify/prettify.js' lang='javascript' type='text/javascript'></script>";
		$source .= "</HEAD>";
		$source .= "<BODY onload=\"prettyPrint()\">";
		$source .= "<pre class=\"prettyprint linenums:4\">";
		$source .= "<code class=\"language-" . $this->type . "\">";
		$source .= "#-REP-#";
		$source .= "</code>";
		$source .= "</pre>";
		$source .= "</BODY>";
		$source .= "</HTML>";
		return $source;
	}

}

new source();
?>