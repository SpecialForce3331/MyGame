var context;
var drawingCanvas;

window.onload = function() {
	
	
	window.addEventListener('keydown',doKeyDown,true); //слушаем нажатие клавиш
	window.addEventListener('keyup',doKeyUp,true); //слушаем нажатие клавиш

	
	drawingCanvas = document.getElementById('smile');
	context = drawingCanvas.getContext('2d');
	
     // Рисуем землю
     context.moveTo(0.5,290);
     context.lineTo(250,290);
     context.strokeStyle = "#000";
     context.stroke();
     
     //рисуем игрока 
     player = new user(10, 280, 10, 10);
     player.color = "#000000";
     player.draw();
     
     //рисуем второго игрока
     player2 = new user(100, 280, 10, 10);
     player2.color = "#FF0000";
     player2.draw();
     
     	setInterval(function(){player.draw();}, 1/40 * 1000); //отрисовываем игрока с частотой 60 fps
    	setInterval(function(){player2.draw();}, 1/40 * 1000); //отрисовываем игрока с частотой 60 fps
    	setInterval(function(){gravity();}, 30 ); //гравитация
    	
}

function user(x, y, width, height)
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


function movePlayer(y) //передвижение игрока
{
	context.clearRect(player.x, player.y, 10, 10);
	player.x = player.x + y;
	doSend(player.x +','+ player.y)
}
function movePlayer2(x,y)
{
	context.clearRect(player2.x, player2.y, 10, 10);
	player2.x = x;
	player2.y = y;
}
	

function jumpPlayer()
{
	context.clearRect(player.x, player.y, 10, 10);
	player.y -= 80;
}

function gravity()
{
	if (player.y < 280 ) //пока находится в воздухе
		{
			player.myContext.clearRect(player.x, player.y, 10, 10);
			player.y += 10;
		}
	else if(player.y > 280 ) //если ниже уровня земли
		{
			player.myContext.clearRect(player.x, player.y, 10, 10);
			player.y = 280;
		}
}

var forwardId; //id для интервалов ходьбы вперед и назад (чтобы не стакалось)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(5);}, 30 );
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer(-5);}, 30 );
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