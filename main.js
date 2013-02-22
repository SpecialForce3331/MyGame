var myServer = "ws://427044.dyn.ufanet.ru:8080/GameServer/websocket";
var output;

window.onload = function()
{
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