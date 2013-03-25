
//var wsUri = "ws://172.0.0.1:8080/GameServer/websocket";
var wsUri = "ws://427044.dyn.ufanet.ru:8080/GameServer/websocket";
var output;

function init()
{
	output = document.getElementById("output");
	myWebSocket();
}

function myWebSocket() 
{ 	
	websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) 
	{ 
		onOpen(evt);
	}; 
	websocket.onclose = function(evt) 
	{ 
		onClose(evt);
	}; 
	websocket.onmessage = function(evt) 
	{ 
		onMessage(evt);
	}; 
	websocket.onerror = function(evt) 
	{ 
		onError(evt);
	}; 
}

function onOpen(evt) 
{ 
	writeToScreen("CONNECTED"); 
	
	//отправляем номер игровой сессии, и логин игрока для проверки наличия его в данной игровой сессии 
	var temp = window.location.search.substr("4");
	var result = temp.split("$");
	doSend("id" + "," + result[0] + "," + result[1] + "," + result[2]); 
}  
function onClose(evt) 
{	
	var temp = window.location.search.substr("4");
	var result = temp.split("$");
	
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'disconnect',
			'id' : result[0]
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				document.location="/MyGame/main.html";
			}
		}
	})
	writeToScreen("DISCONNECTED"); 
}  
function onMessage(evt) 
{		
	msg = evt.data.split(',');

	if ( msg[0] == "id" )
		{
			//writeToScreen('<span style="color: blue;">RESPONSE: '+ "id:" + msg[0]+ " " + "x: " +  msg[1] + " " + "y: " + msg[2] +'</span>');
		}
	else if( msg[0] == "move")
		{
			moveOthers(msg[1], msg[2], msg[3]);
			//writeToScreen('<span style="color: blue;">RESPONSE: ' +  msg[1] + "," + msg[2] + "," + msg[3] + '</span>');
		}
	else if(msg[0] == "chat")
		{
			writeToScreen('<span style="color: blue;">RESPONSE: ' +  evt.data + '</span>');
		}
	
}  
function onError(evt) 
{
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
}  
function doSend(message) 
{ 
	//writeToScreen("SENT: " + message);  
	websocket.send(message); 
}  
function writeToScreen(message) 
{ 
	var pre = document.createElement("p"); 
	pre.style.wordWrap = "break-word"; 
	pre.innerHTML = message;
	
	/*
	if(output.hasChildNodes() == true)
	{
		output.removeChild(output.childNodes[0]);
	}
	*/
	output.appendChild(pre); 
}

window.addEventListener("load", init, false);
