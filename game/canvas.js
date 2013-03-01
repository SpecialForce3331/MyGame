//прописываем необходимые переменные
var context;
var drawingCanvas;

//Ширина и высота холста
var canvasHeight = 260;
var canvasWidth = 450;


window.onload = function() {
	
	
	//устанавливаем нужные размеры холста
	
	//слушаем нажатие клавиш
	window.addEventListener('keydown',doKeyDown,true); 
	window.addEventListener('keyup',doKeyUp,true); 

	//Записываем объект канваса в переменную
	drawingCanvas = document.getElementById('game');
	
	//устанавливаем нужные размеры холста
	drawingCanvas.setAttribute("height",canvasHeight);
	drawingCanvas.setAttribute("width",canvasWidth);
	
	//почва для рисования
	context = drawingCanvas.getContext('2d');
	
     // Рисуем землю
     context.moveTo(0.5,canvasHeight-10);
     context.lineTo(450,canvasHeight-10);
     context.strokeStyle = "#000";
     context.stroke();
     
     //рисуем игрока 
     player = new user(10, canvasHeight-20, 10, 10, 1);
     player.color = "black";
     player.draw();
     
     player2 = new user(30, canvasHeight-20, 10, 10, 2);
     player2.color = "blue";
     player2.draw();
     
     player3 = new user(50, canvasHeight-20, 10, 10, 3);
     player3.color = "red";
     player3.draw();
 
   //отрисовываем игроков с частотой 60 fps, 24 кадра в секунду
 	setInterval(function(){player.draw();}, 2.5); 
	setInterval(function(){player2.draw()}, 2.5);
	setInterval(function(){player3.draw()}, 2.5); 
 	
 	setInterval(function(){gravity();}, 6);
   	
 	getUserData(); //получаем роль игрока
}

function user(x, y, width, height) //прототип игрока
{
	this.myContext = context;
	this.role = "";
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color;
	this.weight = 2;
	this.draw = function( x,y )
	{
		this.myContext.fillStyle = this.color;
		this.myContext.fillText(this.role, this.x + 2, this.y);
		this.myContext.fillRect(this.x, this.y, this.width, this.height);
	}
}	


function movePlayer(number, direction) //передвижение игрока
{	
	player.myContext.clearRect(player.x, player.y, player.width, player.height);
	player.myContext.clearRect(player.x, player.y - 10, player.width, player.height + 10);
	
	if ( direction == "forward" )
		{
			player.x = player.x + 2;
		}
	else if ( direction == "back" )
		{
			player.x = player.x - 2;
		}
	else if ( direction == "jump" )
		{
			if ( player.y = ( canvasHeight - 20 ))
			{
				player.y = player.y - 80;
			}
		}
	
	doSend("toMembersOfGame" + "," + "move" + "," +  number + "," + player.x + "," + player.y ); //отправляем координаты через функцию файла wsclient.js
}

function moveOthers(role, x, y)
{
	if ( player.role == role )
		{
			/*
			player.myContext.clearRect(player.x, player.y - 10, player.width, player.height + 10);
			player.myContext.clearRect(player.x, player.y, player.width, player.height);
			player.x = x;
			player.y = y;*/
		}
	else if ( player2.role == role )
		{
			player2.myContext.clearRect(player2.x, player2.y, player2.width, player2.height);
			player2.x = x;
			player2.y = y;
		}
	else
		{
			player3.myContext.clearRect(player3.x, player3.y, player3.width, player3.height);
			player3.x = x;
			player3.y = y;
		}
}

function gravity()
{
	if ( player.y < (canvasHeight - 20) )
		{
			player.myContext.clearRect(player.x, player.y, player.width, player.height);
			player.myContext.clearRect(player.x, player.y - 10, player.width, player.height + 10);
			player.y = player.y + 2;
			
			doSend("toMembersOfGame" + "," + "move" + "," +  player.role + "," + player.x + "," + player.y ); //отправляем координаты через функцию файла wsclient.js
		}
}

var forwardId; // для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(player.role,"forward");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer(player.role,"back");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 87) //прыжок
		{
			movePlayer(player.role,"jump");
		}
	else if( event.keyCode == 83) //присед
		{
			movePlayer(player.role,"down");
		}
	else if( event.keyCode == 68 && event.keyCode == 87 ) //прыжок со смещением вперед
		{
			movePlayer(player.role,"jump");
			movePlayer(player.role,"forward");
		}
	else if( event.keyCode == 65 && event.keyCode == 87 ) //прыжок со смещением назад
		{
			movePlayer(player.role,"jump");
			movePlayer(player.role,"back");
		}
}

function doKeyUp( event ) //при отжатии клавиши вперед или назад
{

	if( event.keyCode == 68 ) //вперед
	{
		clearInterval( forwardId );
		forwardId = null;
	}
	else if( event.keyCode == 65 ) //назад
	{
		clearInterval( backId );
		backId = null;
	}

}

function getUserData()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'getUserData',
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				player.role = data.result;
			}
		}
	})
}
