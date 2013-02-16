var myServer = "ws://427044.dyn.ufanet.ru:8080/GameServer/websocket";
var output;

window.onload = function()
{
	output = document.getElementById("output");
	checkSession();
}

function checkSession()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'checkSession'
		},
		dataType : "jsonp",
		success : function(data) {
			if(typeof(data.result) != undefined)
			{
				document.getElementById("login").value = data.result;
				getCharacters();
			}
		},
		error: function(data)
			{
				document.location="/MyGame/index.html";
			}
	})
}

function getCharacters()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'getCharacters'
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				for( var i = 0; i < data.result.length; i++ ) //перебираем массив с персонажами
				{	
					var result = data.result[i].split(","); //разбиваем значения персонажа по запятым
					$("#characters").append("<div style='display:inline-block; border:solid 1px black; width: 200px;' id="+ i +"><button onclick='choise("+ "\"" + result[0] + "\"" +")'>Выбрать</button></div> "); //выводим контейнеры для персонажей в одну строку				
					
					for ( var x = 0; x < result.length; x++ ) //перебираем значения персонажа
					{
						$("#"+ i ).append("<div id='"+ i +"'>" + result[x] + "</div>");//выводим значения персонажей в столбец
					}
				}				
			}
		}
	})
}

//выбор персонажа
function choise(name)
{

	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'choiseChar',
			'name' : name
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				alert(data.result);
			}
		}
	})
}

function writeToScreen(message) 
{ 
	var pre = document.createElement("p"); 
	pre.style.wordWrap = "break-word"; 
	pre.innerHTML = message;
	
	output.appendChild(pre); 
}

function showCreateGame()
{
	$("#createGame").empty();
	$("#createGame").append("" +
			"Описание игры: <input type='text' id='title' /><br/>" +
			"Если вы оставите поле Пароль пустым, то к вам сможет подключится кто угодно.<br/>" +
			"Пароль к игре: <input type='text' id='password' /><br/>" +
			"<button onclick='newGame()'>Создать Игру</button>");
}

function newGame()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'newGame',
			'title' : document.getElementById("title").value,
			'password' : document.getElementById("password").value
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				document.getElementById("login").value = data.result;
			}
		}
	})
	
	$("#createGame").empty();
}

function showGames()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'showGames'
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				for( var i = 0; i < data.result.length; i++ ) //перебираем массив с персонажами
				{	
					var result = data.result[i].split(","); //разбиваем значения игры по запятым
					$("#games").append("<div style='border:solid 1px black; width: 200px;' id=" + "game" + i +"><button onclick='join()'>Присоединиться</button></div><br/> "); //выводим контейнеры для игр в столбец			
					
					for ( var x = 0; x < result.length; x++ ) //перебираем значения персонажа
					{
						$("#game"+ i ).append("<div style='display:inline-block;'>" + result[x] + "</div>");//выводим значения игр в строку
					}
				}
			}
		}
	})
}

function join()
{
	for (var i = 0; i < 4; i ++ )
		{
			if( document.getElementById("choice").children[i].selected == true )
				{
					var id = document.getElementById("choice").children[i].value;
					
					websocket = new WebSocket(myServer);
					websocket.onopen = function(evt)
					{
						writeToScreen("connected");
						websocket.send( "login" + "," + document.getElementById("login").value );
					}
					websocket.onclose = writeToScreen("disconnected");
					
					break;
				}
		}
}

function create()
{
	for (var i = 0; i < 4; i++ )
	{
		if( document.getElementById("choice").children[i].selected == true )
			{
				var id = document.getElementById("choice").children[i].value;
				
				websocket = new WebSocket(myServer);
				websocket.onopen = function()
				{
					writeToScreen("connected");
					writeToScreen("SEND: " + "login" + "," + document.getElementById("login").value );
					websocket.send( "login" + "," + document.getElementById("login").value );
				}
				
				websocket.onmessage = function(evt)
				{
					writeToScreen("ANSWER: " + evt.data);
				}
				websocket.onclose = function()
				{
					writeToScreen("disconnected");
				}
				
				break;
			}
	}
	
}

function send()
{
	websocket.send( "toPlayer" + "," + document.getElementById("toPlayer").value + "," + document.getElementById("msg").value );
	writeToScreen("SEND: " + "toPlayer" + "," + document.getElementById("toPlayer").value + "," + document.getElementById("msg").value );

}