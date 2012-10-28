<?php

/**
 * Description of example
 *
 * @author dasz
 */
date_default_timezone_set('Asia/Kolkata');

class example {

    public $sourceUrl;
    public $type;

    public function __construct() {
        $this->type = isset($_REQUEST['type']) ? $_REQUEST['type'] : 'html';
        $this->sourceUrl = isset($_REQUEST['source']) ? $_REQUEST['source'] : 'day/1/Border_layout_and_Viewport/index.html';

        $dataPathContent = "<script type=\"text/javascript\">var dataPath = \"" . str_replace("index.html", "data.php", $this->sourceUrl) . "\";</script>";

        if (file_exists($this->sourceUrl)) {
            $returnStr = trim(
                    str_replace(
                            "../../../", '', str_replace(
                                    "app.js", str_replace("index.html", "app.js", $this->sourceUrl), str_replace(
                                            "</head>", "\t" . $dataPathContent . "\n" . "</head>", file_get_contents($this->sourceUrl)
                                    )
                            )
                    )
            );
        } else {
            $returnStr = str_replace(
                    "#-REP-#", "NO EXAMPLE AVAILABLE", $this->generateHtmlContent());
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
        $source .= "<BODY onload=\"prettyPrint()\" style=\"background:halfgray;\">";
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

new example();
?>
