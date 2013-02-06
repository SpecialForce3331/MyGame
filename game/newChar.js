function getLogin()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'checkSession'
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				document.getElementById("login").value = data.result;
			}
		}
	})
}

function createChar()
{
	var i;
	
	for ( i = 0; i < 4; i++ )
	{
		if( document.getElementById("choice").children[i].selected == true )
			{
				var id = i;
				
				$.ajax({								
					url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
					async : false,
					data : {
						'action' : 'newChar',
						'login' : document.getElementById("login").value,
						'name' : document.getElementById("name").value,
						'role' : id
					},
					dataType : "jsonp",
					success : function(data) {
						if(data.result == "ok")
						{
							document.location="/MyGame/main.html";
						}
					}
				})
				break;
			}
	}
}