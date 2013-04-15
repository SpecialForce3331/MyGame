//прописываем необходимые переменные
var context;
var drawingCanvas;

//для отрисовки персонажей
var currentFrame=0;
var numberOfFrames,xOffset,frameWidth,frameHeight,currentFrame; 

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
     
     //Отрисовка рыцаря     
     img = new Image();
     img.src="sprites/knight_sprite.gif"
     img.onload = function()
     {
    	 numberOfFrames=6;
    	 frameHeight=img.height/6;
    	 setInterval("drawSprite()",120);
     }
     
     
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

function drawSprite()
{
	 currentFrame++;
	 if (currentFrame == numberOfFrames)
	 currentFrame=0;
	 frameWidth=img.width/6;
	 xOffset=frameWidth*currentFrame;
	 context.clearRect ( 200, 200, frameWidth, frameHeight );
	 context.drawImage(img, xOffset, 275,frameWidth, frameHeight, 200, 200, frameWidth, frameHeight);
}

function user(x, y, width, height) //прототип игрока
{
	this.myContext = context;
	this.role = "";
	this.login = "";
	this.name;
	this.lvl;
	this.exp;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color;
	this.weight = 2;
	this.draw = function( x,y )
	{
		this.myContext.fillStyle = this.color;
		//this.myContext.fillText(this.name, this.x - 1, this.y);
		this.myContext.fillRect(this.x, this.y, this.width, this.height);
	}
}	

function movePlayer(direction) //передвижение игрока
{	
	//player.myContext.clearRect(player.x, player.y - 10, player.width + 10, player.height + 10); //очищаем область где отображается ник
	player.myContext.clearRect(player.x, player.y, player.width, player.height);
	
	if ( direction == "forward" )
		{
			player.x = player.x + 2;
			doSend("move" + "," +  "forward");
		}
	else if ( direction == "back" )
		{
			player.x = player.x - 2;
			doSend("move" + "," +  "back");
		}
	else if ( direction == "jump" )
		{
			if ( player.y == ( canvasHeight - 20 ))
			{
				player.y = player.y - 80;
				doSend("move" + "," +  "jump");
			}
		}
}

function movePlayers(login, x, y) //функция отвечающая за передвижение других игроков
{
	if ( player.login == login )
		{
			if( player.x != x || player.y != y ) //если координаты игрока отличаются от тех что на сервере, то правим
				{
					//player.myContext.clearRect(player.x, player.y - 10, player.width, player.height + 10);
					player.myContext.clearRect(player.x, player.y, player.width, player.height);
					player.x = x;
					player.y = y;
					writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
				}
		}
	else if ( player2.login == login )
		{
			//player2.myContext.clearRect(player2.x, player2.y - 10, player2.width, player2.height + 10);
			player2.myContext.clearRect(player2.x, player2.y, player2.width, player2.height);
			player2.x = x;
			player2.y = y;
			writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
		}
	else if ( player3.login == login )
		{
			//player3.myContext.clearRect(player3.x, player3.y - 10, player3.width, player3.height + 10);
			player3.myContext.clearRect(player3.x, player3.y, player3.width, player3.height);
			player3.x = x;
			player3.y = y;
			writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
		}
	else if ( player2.login == "" )
		{
			player2.login = login;
			//player2.myContext.clearRect(player2.x, player2.y - 10, player2.width, player2.height + 10);
			player2.myContext.clearRect(player2.x, player2.y, player2.width, player2.height);
			player2.x = x;
			player2.y = y;
			writeToScreen(login + " is entered in game as player2");
		}
	else if ( player3.login == "" )
		{
			player3.login = login;
			//player3.myContext.clearRect(player3.x, player3.y - 10, player3.width, player3.height + 10);
			player3.myContext.clearRect(player3.x, player3.y, player3.width, player3.height);
			player3.x = x;
			player3.y = y;
			writeToScreen(login + " is entered in game as player3");
		}
}

function gravity()
{
	if ( player.y < (canvasHeight - 20) )
		{
			// player.myContext.clearRect(player.x, player.y - 10, player.width, player.height + 10);
			player.myContext.clearRect(player.x, player.y, player.width, player.height);
			player.y = player.y + 2;
		}
}

function attack()
{
	
}

var forwardId; // для интервалов ходьбы вперед и назад (чтобы не суммировалась скорость)
var backId;

function doKeyDown(event) //при нажатии клавиш управления
{
	if(event.keyCode == 68) //вперед
		{
			if( forwardId == null )
				{
					forwardId = setInterval(function(){movePlayer("forward");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 65) //назад
		{
			if( backId == null)
				{
					backId = setInterval(function(){movePlayer("back");}, 30 ); //идем пока клавиша нажата
				}
		}
	else if( event.keyCode == 87) //прыжок
		{
			movePlayer("jump");
		}
	else if( event.keyCode == 83) //присед
		{
			//movePlayer(player.role,"down");
		}
	else if( event.keyCode == 68 && event.keyCode == 87 ) //прыжок со смещением вперед
		{
			movePlayer("jump");
			movePlayer("forward");
		}
	else if( event.keyCode == 65 && event.keyCode == 87 ) //прыжок со смещением назад
		{
			movePlayer("jump");
			movePlayer("back");
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
				player.role = data.result[0];
				player.login = data.result[1];
				player.name = data.result[2];
				player.lvl = data.result[3];
				player.exp = data.result[4];
				
				$("#character").append("<div>Login: " + player.login + "</div>");
				$("#character").append("<div>Name: " + player.name + "</div>");
				$("#character").append("<div>lvl: " + player.lvl + "</div>");
				$("#character").append("<div>exp: " + player.exp + "</div>");
			}
		}
	})
}