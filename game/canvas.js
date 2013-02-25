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
 
   //отрисовываем игроков с частотой 60 fps, 24 кадра в секунду
 	setInterval(function(){player.draw();}, 2.5); 
	//setInterval(function(){player.2.draw()}, 2.5);
	//setInterval(function(){player.3.draw()}, 2.5); 
 	
 	setInterval(function(){gravity()}, 2.5);
   	
}

function user(x, y, width, height) //прототип игрока
{
	this.myContext = context;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color;
	this.weight = 2;
	this.draw = function( x,y )
	{
		this.myContext.fillStyle = this.color;
		this.myContext.fillRect(this.x, this.y, this.width, this.height);
	}
}	


function movePlayer(number, direction) //передвижение игрока
{

	//doSend("move" + "," + "player" +  number + "," + direction ); //отправляем координаты через функцию файла wsclient.js
	
	player.myContext.clearRect(player.x, player.y, player.width, player.height);
	
	if ( direction == "forward" )
		{
			player.x = player.x + 2;
		}
	else if ( direction == "back" )
		{
			player.x = player.x - 2;
		}
	else if (direction == "jump" )
		{
			player.y = player.y - 20;
		}
}

function gravity()
{
	if ( player.y < (canvasHeight - 20) )
		{
			player.myContext.clearRect(player.x, player.y, player.width, player.height);
			player.y = player.y + 2;
		}
}

var forwardId; //role для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(1,"forward");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer(player,"back");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 87) //прыжок
		{
			movePlayer(player,"jump");
		}
	else if( event.keyCode == 83) //присед
		{
			movePlayer(player,"down");
		}
	else if( event.keyCode == 68 && event.keyCode == 87 ) //прыжок со смещением вперед
		{
			movePlayer(player,"jump");
			movePlayer(player,"forward");
		}
	else if( event.keyCode == 65 && event.keyCode == 87 ) //прыжок со смещением назад
		{
			movePlayer(player,"jump");
			movePlayer(player,"back");
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
