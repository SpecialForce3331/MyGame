window.onload = function() {
	
	
	window.addEventListener('keydown',doKeyDown,true); //слушаем нажатие клавиш
	window.addEventListener('keyup',doKeyUp,true); //слушаем нажатие клавиш

	
	var drawingCanvas = document.getElementById('smile');
	context = drawingCanvas.getContext('2d');
     // Рисуем землю
     context.moveTo(0.5,590);
     context.lineTo(890,590);
     context.strokeStyle = "#000";
     context.stroke();
     
     //рисуем игрока
     player = new rect(1,560,10,9);
     player.draw();
         	
     	setInterval(function(){player.draw()}, 1000/60); //отрисовываем игрока с частотой 60 fps
    	setInterval(function(){gravity()}, 100 );
    	
}


function rect(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = function()
	{
		
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function gravity()
{
	if ( player.y <= 560 )
		{
			context.clearRect(player.x, player.y, 10, 9);
			player.y += 20;
		}

}

function movePlayer(y, z) //передвижение игрока
{
	context.clearRect(player.x + z, player.y, 10, 9); //если от оси Х не отнять (прибавить в случае движения другую сторону) единицу остаются полосы на экране
	player.x = player.x + y;
}

function jumpPlayer()
{
	context.clearRect(player.x, player.y, 10, 9);
	player.y -= 20;
}

var forwardId; //id для интервалов ходьбы вперед и назад
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if(forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer(5, -1)}, 30 );
				}
		}
	else if(event.keyCode == 65) //назад
		{
			if(backId == null)
				{
					backId = setInterval(function(){movePlayer(-5, +1)}, 30 );
				}
		}
	else if(event.keyCode == 87) //прыжок
		{
			jumpPlayer();
		}
	else if(event.keyCode == 83) //присед
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

function doKeyUp(event) //при отжатии клавиши вперед или назад
{

	if(event.keyCode == 68) //вперед
	{
		clearInterval(forwardId);
		forwardId = null;
	}
	else if(event.keyCode == 65) //назад
	{
		clearInterval(backId);
		backId = null;
	}

}
