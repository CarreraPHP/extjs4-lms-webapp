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
		<script src="js/jquery.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="resources/css/external.css"/>
		<link rel="stylesheet" type="text/css" href="resources/css/style.css"/>
		<script type="text/javascript">
			$().ready(function() {
				$("#form").submit(function() {

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
					}else{
						alert("Please enter username and password");
					}

				});

			});

		</script>
	</head>

	<body>

		<div class="page_margins">
			<div class="page">
				<div id="header" role="banner">
					<div id="topnav" role="contentinfo">
						<h1>Sabre LMS - Mock Tool</h1>
					</div>
				</div>
				<!--<div id="header" role="banner">
				<div id="topnav" role="contentinfo">
				<span><a href="index.php?action=suche">Suche</a></span>
				</div>
				<a href="index.php"><img src="resources/images/logo.gif" /></a>
				</div>-->
				<!-- end: main navigation -->

				<!-- begin: main content area #main -->
				<div id="main">

					<!-- Subtemplate: 2 Spalten mit 50/50 Teilung -->
					<div class="subcolumns">
						<div class="c50l">
							<div class="subcl">
								<!-- Inhalt linker Block -->
								<!-- <span class="head">Login</span> -->
								<form class="loginForm" method="post" action="" id="form" >
									<legend>
										Login
									</legend>
									<div class="input text">
										<input type="hidden" name="action" value="login" />
										<input type="text" name="mail" id="mail" value="E-Mail-Address" onclick="if(this.value=='E-Mail-Address'){this.value='';}" />
										<label id="mailError" ></label>
									</div>
									<div class="input text">
										<input type="password" name="pass" id="pass" value="Password" onclick="if(this.value=='Password'){this.value='';}"  />
										<label id="mailError" ></label>
									</div>
									<div class="input text">
										<!--<div class="loginLinks">
											<a href="login_failure.php" title="Passwort vergessen">Passwort vergessen?</a>
											<a href="register.php" title="Jetzt kostenlos Registrieren">Jetzt kostenlos Registrieren</a>
										</div>-->
										<div class="submit">
											<input class="submitBtn" type="submit" name="login" value="Anmelden" />
										</div>
									</div>
								</form>
							</div>
						</div>

					</div>
				</div>
				<!-- end: #main -->
				<!-- begin: #footer -->
				<!--<div id="footer" role="contentinfo">
				<a href="./process.php?action=StaticText&grab=imp&height=500&width=720" title="Impressum" class="smoothbox">Impressum</a>
				|
				<a href="./process.php?action=StaticText&grab=agb&height=500&width=720" title="AGB" class="smoothbox">AGB</a>
				|
				<a href="./process.php?action=StaticText&grab=datenschutz&height=500&width=800" title="Datenschutz" class="smoothbox">Datenschutz</a>
				|
				<a href="./process.php?action=StaticText&grab=uns&height=500&width=720" title="Berater" class="smoothbox">Berater</a>
				|
				<a href="./process.php?action=StaticText&grab=presse&height=500&width=720" title="Partner" class="smoothbox">Partner</a>
				|
				<a target="_blank" href="http://www.research-science.com/index.php?dir=IC-Calculator/&file=Anwender-Handbuch-BETA.pdf">Downloads</a>
				|
				<a target="_blank" href="http://www.wissensbilanz.de/news/?s=ic-calculator" title="News">Thema</a>
				<br />
				<span style="color:silver;">&copy; Seneca. 2000 - 2012 All rights reserved, NoReg: 39753414.0
				<br />
				&nbsp;</span>
				</div>-->
				<!-- end: #footer -->
			</div>
		</div>
	</body>
</html>

<!--<strong>Systemvoraussetzung:</strong> Firefox 3.5 / Internet Explorer 8; Javascript; Adobe Flash Player 10; min. 1024x786 Bildschirmauflösung-->