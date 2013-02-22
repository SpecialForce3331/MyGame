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
     player.color = "#000000";
     player.draw();
     
     //рисуем второго игрока
     player2 = new user(100, canvasHeight-20, 10, 10);
     player2.color = "#FF0000";
     player2.draw();
     
     	setInterval(function(){player.draw();}, 1/40 * 1000); //отрисовываем игрока с частотой 60 fps
    	setInterval(function(){player2.draw();}, 1/40 * 1000); //отрисовываем игрока с частотой 60 fps
    	setInterval(function(){gravity();}, 30 ); //гравитация
    	
}

function user(x, y, width, height) //прототип игрока
{
	this.myContext = context;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color;
	this.mass = 2;
	this.draw = function()
	{
		this.myContext.fillStyle = this.color;
		this.myContext.fillRect(this.x, this.y, this.width, this.height);
	}
}


function movePlayer(z) //передвижение игрока
{
	context.clearRect(player.x, player.y, 10, 10);
	
	if( (player.x + z) < canvasWidth && (player.x + z) > 0 ) //проверка на выход за границы
	{
		player.x = player.x + z;
	}
	
	doSend(player.x +','+ player.y); //отправляем координаты через функцию файла wsclient.js
}

function movePlayer2(x,y) //движение второго игрока
{
	context.clearRect(player2.x, player2.y, 10, 10);
	player2.x = x;
	player2.y = y;
}
	

function jumpPlayer() //прыжок
{
	context.clearRect(player.x, player.y, 10, 10);
	player.y -= 80;
	
	doSend(player.x +','+ player.y); 
}

function gravity() //якобы гравитация ))
{
	if (player.y < (canvasHeight-20) ) //пока находится в воздухе
		{
			player.myContext.clearRect(player.x, player.y, 10, 10);
			player.y += 10;
			
			doSend(player.x +','+ player.y);
		}
	else if(player.y > (canvasHeight-20) ) //если ниже уровня земли
		{
			player.myContext.clearRect(player.x, player.y, 10, 10);
			player.y = 280;
			
			doSend(player.x +','+ player.y);
		}
}

var forwardId; //id для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(5);}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer(-5);}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 87) //прыжок
		{
			jumpPlayer();
		}
	else if( event.keyCode == 83) //присед
		{
			downPlayer();
		}
	else if( event.keyCode == 68 && event.keyCode == 87 ) //прыжок со смещением вперед
		{
			jumpPlayer();
			movePlayer(5, -1);
		}
	else if( event.keyCode == 65 && event.keyCode == 87 ) //прыжок со смещением назад
		{
			jumpPlayer();
			movePlayer(-5, -1);
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