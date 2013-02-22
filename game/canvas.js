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
	drawingCanvas = document.getElementByrole('game');
	
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
     player = new user(10, canvasHeight-20, 10, 10);
     player.role = 1;
     player.role.color = "black";
     player.role.draw();
 
   //отрисовываем игроков с частотой 60 fps, 24 кадра в секунду
 	setInterval(function(){player.1.draw()}, 2.5); 
	setInterval(function(){player.2.draw()}, 2.5);
	setInterval(function(){player.3.draw()}, 2.5); 
   	
}

function user(x, y, width, height) //прототип игрока
{
	this.role;
	this.role.myContext = context;
	this.role.x = x;
	this.role.y = y;
	this.role.width = width;
	this.role.height = height;
	this.role.color;
	this.role.mass = 2;
	this.role.draw = function( x,y )
	{
		this.role.myContext.fillStyle = this.color;
		this.role.myContext.fillRect(this.role + "." + x, this.role + "." + y, this.role.width, this.role.height);
	}
}


function movePlayer(role, direction) //передвижение игрока
{

	doSend("move" + "," + player + "." + role + "," + direction ); //отправляем координаты и role через функцию файла wsclient.js
}

var forwardId; //role для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardrole == null )
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
		forwardrole = null;
	}
	else if( event.keyCode == 65 ) //назад
	{
		clearInterval( backId );
		backrole = null;
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
