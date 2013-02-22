function test()
{
	alert("test");
}

function createChar()
{
	for (var i = 0; i < 4; i++ )
	{
		if( document.getElementById("choice").children[i].selected == true )
			{
				var id = document.getElementById("choice").children[i].value;
				
				$.ajax({								
					url : '/MyGame/engine.php',
					async : false,
					data : {
						'action' : 'newChar',
						'login' : document.getElementById("login").value,
						'name' : document.getElementById("password").value
					},
					dataType : "json",
					success : function(data) {
						if(data.result == 1)
						{
							document.location="/MyGame/main.php";
						}
					}
				})
			}
	}
}