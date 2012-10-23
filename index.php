<?php
session_start();
if (isset($_SESSION["userDetails"])) {
	header("location:app.php");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="content-language" content="de" />
		<meta name="reply-to" content="mailto:DEFAULT_EMAIL" />
		<meta name="robots" content="index, nofollow" />
		<meta name="date" content="2012-05-31" />
		<title>Sabre LMS - Mock Tool</title>
		<link rel="stylesheet" type="text/css" href="resources/css/external.css"/>
		<link rel="stylesheet" type="text/css" href="resources/css/style.css"/>
		<script src="js/jquery.js" type="text/javascript"></script>
		<script type="text/javascript">
			$().ready(function() {
				$("#form").submit(function() 
				{
				    var username = $('#mail').val();
					var password = $('#pass').val();
					if(username != 'E-Mail-Address' && password != 'Password') {
						$.ajax({
							type : "POST",
							url : "data/session/User.php",
							data : {
								type : "login",
								username : username,
								password : password

							},
							dataType : "json",
							success : function(data) {
								if(data.success)
									$(location).attr('href', "app.php");
								else
									$('label').addClass("error");

							}
						});
					}
				  	 else 
					{
						alert("Please enter username and password");
					}
				});
			});
		</script>
	</head>
	<body>
		<div class="page_margins">
			<div id="header" role="banner">
				<div id="topnav" role="contentinfo">
					<h1>Sabre LMS - Mock Tool</h1>
				</div>
			</div>
			<div id="main">
				<div class="subcolumns">
					<form class="loginForm" method="post" action="" id="form" >
						<legend>
							Login
						</legend>
						<div class="input text">
							<input type="hidden" name="action" value="login" />
							<input type="text" name="mail" id="mail" value="E-Mail-Address" onclick="if(this.value=='E-Mail-Address'){this.value='';}"/>
							<label id="mailError" ></label>
						</div>
						<div class="input text">
							<input type="password" name="pass" id="pass" value="Password" onclick="if(this.value=='Password'){this.value='';}" />
							<label id="mailError" ></label>
						</div>
						<div class="input text">
							<div class="submit">
								<input class="submitBtn" type="submit" name="login" value="Anmelden" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>
</html>
