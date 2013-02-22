function auth()
{
	$.ajax({								
		url : 'engine.php',
		async : false,
		data : {
			'action' : 'auth',
			'login' : document.getElementById("login").value,
			'password' : document.getElementById("password").value
		},
		dataType : "json",
		success : function(data) {
			if(data.result == 1)
			{
				document.location="main.php";
			}
		}
	})
}

function reg()
{
	$.ajax({								
		url : 'engine.php',
		async : false,
		data : {
			'action' : 'reg',
			'login' : document.getElementById("login").value,
			'password' : document.getElementById("password").value
		},
		dataType : "json",
		success : function(data) {
			alert(data.result);
			document.location="main.php";
		}
	})
}