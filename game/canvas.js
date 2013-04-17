//прописываем необходимые переменные
var context;
var drawingCanvas;

var currentFrame = 0;
var numberOfFrames = 11;
var xFrame;
var yFrame = 0;
//Отрисовка рыцаря     
img = new Image();
img.src="sprites/atack.png";
//img.src="sprites/knight_sprite.gif";

//Ширина и высота холста
var canvasHeight = 300;
var canvasWidth = 600;

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
     context.moveTo(0.5,canvasHeight);
     context.lineTo(600,canvasHeight);
     context.strokeStyle = "#000";
     context.stroke();
     
     
     //рисуем игроков
     player = new user(10, canvasHeight-66.8, img.width/11, img.height);
     player.draw();
     
     player2 = new user(50, canvasHeight-70, img.width/11 - 20, img.height);
     player2.draw();
     
     player3 = new user(90, canvasHeight-70, img.width/11 - 20, img.height);
     player3.draw();
     
 
   //отрисовываем игроков с частотой 60 fps, 24 кадра в секунду
 	//setInterval(function(){player.draw();}, 1000/16); 
	//setInterval(function(){player2.draw();}, 1000/16);
	//setInterval(function(){player3.draw();}, 1000/16); 
 	
 	setInterval(function(){gravity();}, 6);
   	
 	getUserData(); //получаем роль игрока
}

function drawAnimMove(x,y,width,height) //функция отображения анимации движения персонажа
{
	 currentFrame++;
	 if (currentFrame == numberOfFrames)
		 {
		 	currentFrame=0;
		 } 
	 frameWidth=img.width/11;
	 xFrame=frameWidth*currentFrame;
	 context.clearRect ( x, y, width, height );
	 context.drawImage(img, xFrame, yFrame,frameWidth, player.height, x, y, width, height);
}


function user(x, y, width, height ) //прототип игрока
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
	this.weight = 2;
	this.draw = function( x,y )
	{
		this.myContext.drawImage( img, img.width/11, 0, this.width, this.height, this.x, this.y, this.width, this.height );
	}
}	

function movePlayer(direction) //передвижение игрока
{	
	player.myContext.clearRect(player.x, player.y, player.width, player.height);
	
	if ( direction == "forward" )
		{
			player.x = player.x + 2;
			doSend("move" + "," +  "forward");
			drawAnimMove(player.x, player.y, player.width, player.height);
		}
	else if ( direction == "back" )
		{
			player.x = player.x - 2;
			doSend("move" + "," +  "back");
			drawAnimMove(player.x, player.y, player.width, player.height);
		}
	else if ( direction == "jump" )
		{
			if ( player.y == ( canvasHeight - 70 ))
			{
				player.y = player.y - 80;
				doSend("move" + "," +  "jump");
				player.draw();
			}
		}
}

function movePlayers(login, x, y) //функция отвечающая за передвижение других игроков
{
	if ( player.login == login )
		{
			if( player.x != x || player.y != y ) //если координаты игрока отличаются от тех что на сервере, то правим
				{					
					player.myContext.clearRect(player.x, player.y, player.width, player.height);
					player.x = x;
					player.y = y;
					drawAnimMove(player.x, player.y, player.width, player.height);
					writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
				}
		}
	else if ( player2.login == login )
		{		
			player2.myContext.clearRect(player2.x, player2.y, player2.width, player2.height);
			player2.x = x;
			player2.y = y;
			player2.draw();
			writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
		}
	else if ( player3.login == login )
		{			
			player3.myContext.clearRect(player3.x, player3.y, player3.width, player3.height);
			player3.x = x;
			player3.y = y;
			player3.draw();
			writeToScreen("login: " + login + " x:" + x + " " + "y:" + y);
		}
	else if ( player2.login == "" )
		{
			player2.login = login;
			player2.myContext.clearRect(player2.x, player2.y, player2.width, player2.height);
			player2.x = x;
			player2.y = y;
			player2.draw();
			writeToScreen(login + " is entered in game as player2");
		}
	else if ( player3.login == "" )
		{
			player3.login = login;
			player3.myContext.clearRect(player3.x, player3.y, player3.width, player3.height);
			player3.x = x;
			player3.y = y;
			player3.draw();
			writeToScreen(login + " is entered in game as player3");
		}
}

function gravity()
{
	if ( player.y < (canvasHeight - 70) )
		{
			player.myContext.clearRect(player.x, player.y, player.width, player.height);
			player.y = player.y + 2;
			player.draw();
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
			//movePlayer("down");
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
		
		player.myContext.clearRect(player.x, player.y, player.width, player.height);
		player.draw();
	}
	else if( event.keyCode == 65 ) //назад
	{
		clearInterval( backId );
		backId = null;
		
		player.myContext.clearRect(player.x, player.y, player.width, player.height);
		player.draw();
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