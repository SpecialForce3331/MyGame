function auth()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'auth',
			'login' : document.getElementById("login").value,
			'password' : document.getElementById("password").value
		},
		dataType : "jsonp",
		success : function(data) {
			if( data.result == 1 )
			{
				alert("sucess");
			}
		},
		error : function(data){alert("error");}
	})
}

function reg()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'reg',
			'login' : document.getElementById("login").value,
			'password' : document.getElementById("password").value
		},
		dataType : "jsonp",
		success : function(data) {
			alert(data.result);
			document.location="main.php";
		}
	})
}