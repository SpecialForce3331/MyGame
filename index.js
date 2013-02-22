//Как только страница прогружена, отображаем поля для авторизации.
window.onload = function()
{
	var inputWindow = " Login:<br/><input type='text' id='login' /><br/>" +
			"Password:<br/><input type='password' id='password' /><br/>" +
			"<button onclick='auth();'>Авторизиация</button><br/>" +
			"<button onclick='reg();'>Регистрация</button><br/>"
	$("#mainWidow").empty()
	$("#mainWindow").append(inputWindow);

}

//var login = $("#login").value;
//var password = $("#password").value;

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