$(document).on('ready', function() {
	//Vamos a crear un contexto 2d de nuestro canvas.
	var canvas = $("#snake")[0];
	var context = canvas.getContext("2d");

	//Obtenemos el ancho y alto de nuestro canvas.
	var width = $("#snake").width();
	var height = $("#snake").height();

	//Definimos algunas variables para configurar nuestro juego
	var cellWidth = 50;
	var d;
	var food;
	var score;
	var level = 1; //1 El nivel más lento, 10 el nivel más rápido.
	var background = '#27ae60';
	var border = 'black';
	var snakeColor = 'black';

	//Creamos nuestra víbora
	var snake;

	//El juego tiene la dirección "right" por defecto y se ejecuta la función paint
	//dependiendo el nivel que hayas configurado arriba
	function init()
	{
		d = "down";
		createSnake();
		createFood();
		score = 0;

		if(typeof gameLoop != "undefined") {
			clearInterval(gameLoop);
		}
		right();
		down();


	// gameLoop = setInterval(paint, 1000 / level);
	}

	init();

	//Creamos la víbora
	function createSnake()
	{
		var length = 5;
		snake = [];

		for(var i = length - 1; i >= 0; i--)
		{
			snake.push({ x: 0, y: i });
		}
	}

	//Creamos la comida de la víbora de manera aleatoria
	function createFood()
	{
		food = {
			x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
			y: Math.round(Math.random() * (height - cellWidth) / cellWidth),
		};
	}

	//Dibujamos la víbora
	function paint()
	{
		context.fillStyle = background;
		context.fillRect(0, 0, width, height);
		context.strokeStyle = border;
		context.strokeRect(0, 0, width, height);

		var nx = snake[0].x;
		var ny = snake[0].y;

		if (d == "right") {
			nx++;
		} else if (d == "left") {
			nx--;
		} else if (d == "up") {
			ny--;
		} else if (d == "down") {
			ny++;
		}

		if (nx == -1 || nx == width / cellWidth || ny == -1 ||
			ny == height / cellWidth || checkCollision(nx, ny, snake)) {
			init();

			return;
		}

		if(nx == food.x && ny == food.y) {
			var tail = {
				x: nx,
				y: ny
			};

			score++;

			createFood();
		} else {
			var tail = snake.pop();

			tail.x = nx;
			tail.y = ny;
		}

		snake.unshift(tail);

		for(var i = 0; i < snake.length; i++) {
			var c = snake[i];

			paintCell(c.x, c.y);
		}

		paintCell(food.x, food.y);

		var scoreText = "Score: " + score;

		context.fillText(scoreText, 5, height - 5);
	}

	//Pintamos la celda
	function paintCell(x, y)
	{
		context.fillStyle = snakeColor;
		context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		context.strokeStyle = background;
		context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	}

	//Verificiamos si hubo alguna colisión (si la hubo el juego se reinicia)
	function checkCollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y) {
				return true;
			}
		}

		return false;
	}

	function down(){
		d="down";
		paint();
	}
	function up(){
		d="up";
		paint();
	}
	function left(){
		d="left";
		paint();
	}
	function right(){
		d="right";
		paint();
	}
	//Captamos las flechas de nuestro teclado para poder mover a nuestra víbora
	$(document).on('keydown', function(e) {
		var key = e.which;
		if (key == "37" && d != "right") {
			d = "left";
		} else if (key == "38" && d != "down") {
			d = "up";
		} else if (key == "39" && d != "left") {
			d = "right";
		} else if (key == "40" && d != "up") {
			d = "down";
		}
	});
	var btnCompile=$('#compile');
	console.log(btnCompile);
	btnCompile.on('click',recyclerPiece);

	function recyclerPiece(){
		var pieceBox=document.querySelector('.piece-box');
		var pieces=pieceBox.getElementsByClassName('.piece');
		var piece;
		var array=[];
		for(i in pieces){
      var piece=pieces[i];
      if(typeof piece.style != 'undefined')
      {
				array[i]=piece.getAttribute('class');
			}

    }
		console.log(array);
	}

});
