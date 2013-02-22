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
	elseif( $_GET["action"] == "newGame" ) //создание новой игровой сессии
	{
		if ( $_GET["open"] == true ) //если игра открытая
		{
			$mysqli->query( "INSERT INTO `games` ( `login`, `title` ) VALUES ('".$_GET['login']."','".md5($_GET['title'])."')" );
			
			if ($mysqli->error)
			{
				echo "Failed to insert data: (" . $mysqli->errno . ") " . $mysqli->error;
			}
			else
			{
				$result = array("result" => "success");
				echo json_encode($result);
			}
		}
		else if( $_GET["open"] == false ) //если игра защищена паролем
		{
			$mysqli->query( "INSERT INTO `games` ( `login`, `title`, `open`, `password` ) VALUES ('".$_GET['login']."','".$_GET['title']."','false','".md5($_GET['password'])."')" );
			
			if ($mysqli->error)
			{
				echo "Failed to insert data: (" . $mysqli->errno . ") " . $mysqli->error;
			}
			else
			{
				$result = array("result" => "success");
				echo json_encode($result);
			}
		}
	}
	elseif( $_GET["action"] == "searchGame" ) //поиск всех игр
	{
		$result = $mysqli->query( "SELECT `login`,`title`,`count` FROM `games`" );
		
		if ($mysqli->connect_errno)
		{
			echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
				
		}else{
			$rows = $result->num_rows;
			$answer = array( "result" => $rows);
			echo json_encode( $answer ); //Отдаем данные в формате json
		}
		$result->close;
	}
	elseif( $_GET["action"] == "createChar" )
	{
		$result = $mysqli->query( "SELECT `name` FROM `heroes`" );
		
		if ($mysqli->connect_errno)
		{
			echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		
		}else{
			$rows = $result->num_rows;
			
			if ( $rows > 0 ) //проверка на совпадении имен в базе данных
			{
				$answer = array( "result" => $rows);
				echo json_encode( $answer ); //Отдаем данные в формате json
			}
			else
			{
				$mysqli->query( "INSERT INTO `heroes` ( `login`, `name` ) VALUES ('".$_GET['login']."','".$_GET['name']."')" );
					
				if ($mysqli->error)
				{
					echo "Failed to insert data: (" . $mysqli->errno . ") " . $mysqli->error;
				}
				else
				{
					$result = array("result" => "success");
					echo json_encode($result);
				}
			}
		}
		$result->close;
	}
?>