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
		},
		error: function(data)
			{
				document.location="/MyGame/index.html";
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
				var id = i + 1; //добавляем единицу чтобы отсчет персонажей был с 1, а не с 0, мне так проще )
				
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