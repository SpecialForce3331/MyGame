
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
	//doSend("player connected!"); 
}  
function onClose(evt) 
{
	writeToScreen("DISCONNECTED"); 
}  
function onMessage(evt) 
{	
	msg = evt.data.split(',');
	writeToScreen('<span style="color: blue;">RESPONSE: '+ "id:" + msg[0]+ " " + "x: " +  msg[1] + " " + "y: " + msg[2] +'</span>');
	
	player + msg[0] + "." + myContext + "." + clearRect(); //стираем с экрана текущую позицию пользователя
	player + msg[0] + "." + draw(); //отрисовываем новую
	
}  
function onError(evt) 
{
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
}  
function doSend(message) 
{ 
	writeToScreen("SENT: " + message);  websocket.send(message); 
}  
function writeToScreen(message) 
{ 
	var pre = document.createElement("p"); 
	pre.style.wordWrap = "break-word"; 
	pre.innerHTML = message;
	
	if(output.hasChildNodes() == true)
	{
		output.removeChild(output.childNodes[0]);
	}
	output.appendChild(pre); 
}

window.addEventListener("load", init, false);
