var myServer = "ws://427044.dyn.ufanet.ru:8080/ServerWS";
var output;


window.onload = function()
{
	$("#output").empty();
	$("#output").append("<select id='choice'>" +
			"<option value='1'>Рыцарь</option>" +
			"<option value='2'>Маг</option>" +
			"<option value='3'>Лучник</option>" +
			"</select><br/>" +
			"Введите логин игрока, к которому хотите присоединиться</br>" +
			"<input type='text id='gameName' />" +
			"<button onclick='join();'>Присоединиться к игре</button><br/>" +
			"Или вы можете создать свою игру</br>" +
			"<button onclick='create();'>Создать игру</button><br/>" +
			"Игроку: <input type='text' id='toPlayer' /> Сообщение: <input type='text' id='msg' /><button onclick='send();'>Отправить игроку</button>" +
			"<button onclick='websocket.close()'>Отсоединиться</button><br/>");
	
	output = document.getElementById("output");
}



function writeToScreen(message) 
{ 
	var pre = document.createElement("p"); 
	pre.style.wordWrap = "break-word"; 
	pre.innerHTML = message;
	
	output.appendChild(pre); 
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