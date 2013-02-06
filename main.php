<?php
session_start();

if(is_null($_SESSION["login"]))
{
	echo "<script>document.location='index.html'</script>";
}
?>
<html>
	<head>
	<script type="text/javascript" src="jquery-1.8.3.js"></script>
	<script type="text/javascript" src="main.js"></script>
		
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Welcome to MyGame</title>
	</head>
	<body>
		<input id="login" type="text" disabled value="<?php echo $_SESSION["login"] ?>" />
		
	<div align="center" style="padding-top:10%;" id="output">
		<div id="characters">Ваши персонажи</div><br/>
		<button onclick="javascript:location='game/newChar.php';">Новый персонаж</button><br/>
		<button onclick="showGames();">Показать текущие игры</button><br/>
		<button onclick="newGame();">Создать новую игру</button><br/>
	</div>
		
		
	</body>
</html>

