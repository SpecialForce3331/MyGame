
window.onload = function()
{
	$("#output").empty();
	$("#output").append("<select id='choice'>" +
			"<option value='1'>Рыцарь</option>" +
			"<option value='2'>Маг</option>" +
			"<option value='3'>Лучник</option>" +
			"</select>" +
			"<button onclick='join();'>Присоединиться к игре</button>");
}

function join()
{
	for (var i = 0; i < 4; i ++ )
		{
			if( document.getElementById("choice").children[i].selected == true )
				{
					//alert(document.getElementById("choice").children[i].value);
					myWebSocket();
					
					break;
				}
		}
}
