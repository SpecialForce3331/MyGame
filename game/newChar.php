<?php

	session_start();
	
	if(is_null($_SESSION["login"]))
	{
		echo "<script>document.location='index.html'</script>";
	}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome to MyGame</title>

	<script type="text/javascript" src="/MyGame/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="newChar.js"></script>

</head>
<body>
	<input id="login" type="text" disabled value="<?php echo $_SESSION["login"] ?>" />
	<div align="center" style="bottom-top:10%;">
	
	<p>Вы можете иметь не более 3-х персонажей</p><br/>
	
		Имя персонажа:<br/> 
		<input type="text" id="name" /><br/>
		Класс персонажа:<br/>
			<select id='choice'>
				<option value='1'>Рыцарь</option>
				<option value='2'>Маг</option>
				<option value='3'>Лучник</option>
			</select><br/>
			<button onclick="createChar();">Создать персонажа</button>
	</div>
</body>
</html>