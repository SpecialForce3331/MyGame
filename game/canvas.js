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
     player = new user(10, canvasHeight-20, 10, 10);
     player.id = 1;
     player.id.color = "#000000";
     player.id.draw();
 
   //отрисовываем игроков с частотой 60 fps, 24 кадра в секунду
 	setInterval(function(){player.1.draw();}, 2.5); 
	setInterval(function(){player.2.draw();}, 2.5);
	setInterval(function(){player.3.draw();}, 2.5); 
   	
}

function user(x, y, width, height) //прототип игрока
{
	this.id;
	this.id.myContext = context;
	this.id.x = x;
	this.id.y = y;
	this.id.width = width;
	this.id.height = height;
	this.id.color;
	this.id.mass = 2;
	this.id.draw = function( x,y )
	{
		this.id.myContext.fillStyle = this.color;
		this.id.myContext.fillRect(this.id + "." + x, this.id + "." + y, this.id.width, this.id.height);
	}
}


function movePlayer(id, direction) //передвижение игрока
{

	doSend("move" + "," + player + "." + id + "," + direction ); //отправляем координаты и id через функцию файла wsclient.js
}

var forwardId; //id для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(player.id,"forward");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer(player.id,"back");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 87) //прыжок
		{
			movePlayer(player.id,"jump");
		}
	else if( event.keyCode == 83) //присед
		{
			movePlayer(player.id,"down");
		}
	else if( event.keyCode == 68 && event.keyCode == 87 ) //прыжок со смещением вперед
		{
			movePlayer(player.id,"jump");
			movePlayer(player.id,"forward");
		}
	else if( event.keyCode == 65 && event.keyCode == 87 ) //прыжок со смещением назад
		{
			movePlayer(player.id,"jump");
			movePlayer(player.id,"back");
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

function getId()
{
	$.ajax({								
		url : 'http://427044.dyn.ufanet.ru:8080/GameServer/mysql',
		async : false,
		data : {
			'action' : 'getId',
		},
		dataType : "jsonp",
		success : function(data) {
			if(data.result != "false")
			{
				player.id = data.result;
			}
		}
	})
}
