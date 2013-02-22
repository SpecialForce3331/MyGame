<?php
session_start();

if(!is_null($_SESSION["login"]))
{
	echo 
		'<html>
		<head>
		<script type="text/javascript" src="jquery-1.8.3.js"></script>
		<script type="text/javascript" src="main.js"></script>
		<script type="text/javascript" src="game/wsclient.js"></script>
			
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Welcome to MyGame</title>
		</head>
		<body>
			<div align="center" style="padding-top:10%;" id="output"></div>
		</body>
		</html>';
}
else
{
	echo "<script>document.location='index.html'</script>";	
}
?>