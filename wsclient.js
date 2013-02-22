
//var wsUri = "ws://172.0.0.1:8080/ServerWS";
var wsUri = "ws://427044.dyn.ufanet.ru:8080/ServerWS";
var output;

function init()
{
	output = document.getElementById("output");
	testWebSocket();
}

function testWebSocket() 
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
	writeToScreen('<span style="color: blue;">RESPONSE: ' + msg[0] + " " + msg[1] +'</span>'); //websocket.close();
	movePlayer2(msg[0],msg[1]);
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
	output.appendChild(pre); 
}

window.addEventListener("load", init, false);
