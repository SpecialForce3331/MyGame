<?php
	
	//Данные для подключения к БД
	$server = "localhost";
	$username = "MyGame";
	$password = "MyGame";
	$database = "MyGame";
	
	$mysqli = new mysqli( $server, $username, $password, $database ); //Устанавливаем соединение в базой мускула
	
	if ( $mysqli->connect_errno )
	{
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error; //Не удалось установить соединение с базой мускула.
	}
	else
	{
		$mysqli->set_charset("utf8"); //Устанавливаем принудительно кодировку в UTF-8!
	}
	
	

	if ( $_GET["action"] == "auth" )
	{
		$_GET['login'] = strip_tags($_GET['login']);
		$_GET['password'] = strip_tags($_GET['password']); //Убираем теги из логина и пароля ( XSS ).
		
		$result = $mysqli->query("SELECT `login` FROM `users` WHERE `login` = '".$_GET['login']."' AND `password` = '".md5($_GET['password'])."'" );
		if ($mysqli->connect_errno)
		{
			echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
				
		}else{
			$rows = $result->num_rows;
			//$userData = $result->fetch_array(MYSQLI_ASSOC);
			$answer = array( "result" => $rows);
			echo json_encode( $answer ); //Отдаем данные в формате json
			if( $rows == 1 )
			{
				session_start(); //Устанавливаем HTTP сессию и пишем логин в сессионную переменную
				$_SESSION['login'] = $_GET['login'];
			}
		}
		$result->close;
	}
	elseif( $_GET["action"] == "reg" )
	{
		//Убираем из полученных данных теги (XSS)
		$_GET['login'] = strip_tags($_GET['login']);
		$_GET['password'] = strip_tags($_GET['password']);
		
		$mysqli->query( "INSERT INTO `users` ( `login`, `password` ) VALUES ('".$_GET['login']."','".md5($_GET['password'])."')" );
		if ($mysqli->error)
		{
			echo "Failed to insert data: (" . $mysqli->errno . ") " . $mysqli->error;
				
		}
		else
		{
				
			session_start(); //Устанавливаем HTTP сессию и пишем логин в сессионную переменную
			$_SESSION['login'] = $_GET['login'];
			$result = array("result" => $_SESSION['login']);
			echo json_encode($result);
		}
		
	}

?>