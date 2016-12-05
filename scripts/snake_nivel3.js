$(document).on('ready', function() {
	//Vamos a crear un contexto 2d de nuestro canvas.
	var canvas = $("#snake")[0];
	var context = canvas.getContext("2d");
	var finestraModal = document.getElementById("finestra-modal"),
			finestraModalObrir = document.getElementById("finestra-modal-obrir"),
			finestraModalTancar = document.getElementById("finestra-modal-tancar");

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
	var array;
	var iBody = new Image();
	var iFood = new Image();
	var iHead = new Image();
	var iHead2 = new Image();
	var iHead3 = new Image();
	var iHead4 = new Image();
	var aEat = new Audio();
	var aDie = new Audio();
	var salto = new Audio();
	var iBackground = new Image();
	//var iBrick = new Image();
	//var relleno=context.createPattern(iFood, "no-repeat")
	//Creamos nuestra víbora
	var snake;

	//El juego tiene la dirección "right" por defecto y se ejecuta la función paint
	//dependiendo el nivel que hayas configurado arriba

	function init()
	{

		d = "down";
		createSnake();
		createFood();
//		score = 0;

		/*if(typeof gameLoop != "undefined") {
			clearInterval(gameLoop);
		}*/

		/*agregacion de imagenes*/
		iBody.src = 'assets/body.png';
		iFood.src = 'assets/apple_green.png';
		iHead.src = 'assets/abajo_snake.png';
		iHead2.src = 'assets/arriba_snake.png';
		iHead3.src = 'assets/izq_snake.png';
		iHead4.src = 'assets/der_snake.png';
		aEat.src = 'assets/chomp.oga';
		aDie.src = 'assets/dies.oga';
		iBackground.src = 'assets/flat-texture.png';
		salto.src= 'assets/salto.wav';

		//iBrick.src = 'assets/brick.png';
	//	paint(d);
	// gameLoop = setInterval(paint, 1000 / level);
	}

	init();

	iBackground.onload = function(){
	context.drawImage(iBackground,0, 0, width, height );
	setTimeout(paint,1000,"left");
	setTimeout(paint,2000,"left");
	setTimeout(paint,3000,"down");
	setTimeout(paint,4000,"down");

	}

	//Creamos la víbora
	function createSnake()
	{
		var length = 6;
		snake = [];

		for(var i = length - 1; i >= 0; i--)
		{
			snake.push({ x: 4, y: i-2 });
		}
	}

	//Creamos la comida de la víbora de manera aleatoria
	function createFood()
	{
		food = {
			x: Math.round(0.6 * (width - cellWidth) / cellWidth),
			y: Math.round(0.7 * (height - cellWidth) / cellWidth),

		};
	}

	//Dibujamos la víbora
	function paint(direccion)
	{
		var dir=direccion;
		d=dir;
		console.log(dir);

		context.drawImage( iBackground, 0, 0, width, height );
		//context.fillStyle = background;
		//context.fillRect(0, 0, width, height);
		//context.strokeStyle = border;
		//context.strokeRect(0, 0, width, height);

		var nx = snake[0].x;
		var ny = snake[0].y;

		if (dir == "right") {
			nx++;
		}
		else if (dir == "left") {
			nx--;
		}
		else if (dir == "up") {
			ny--;
		}
		else if (dir == "down") {
			ny++;
		}

		if (nx == -1 || nx == width / cellWidth || ny == -1 ||
			ny == height / cellWidth || checkCollision(nx, ny, snake)) {
			init();
			aDie.play();
			return;
		}

		if(nx == food.x && ny == food.y) {
			var tail = {
				x: nx,
				y: ny
			};

			score++;
			aEat.play();
			finestraModal.classList.add("js-mostrar");

			//createFood();
		} else {

			salto.play();
			var tail = snake.pop();

			tail.x = nx;
			tail.y = ny;
		}

		typeCell='food';
		paintCell(food.x, food.y,typeCell);

		snake.unshift(tail);
		//Pintar cabeza
		var typeCell="head";
		var c = snake[0];
		paintCell(c.x, c.y, typeCell);

		//Pintar Cuerpo
		typeCell='body';
		for(var i = 1; i < snake.length; i++) {
			c = snake[i];
		//context.drawImage(iBody, snake[i].x, snake[i].y);
			paintCell(c.x, c.y, typeCell);
		}

/*		typeCell='head';
		paintCell(c.x, c.y, typeCell);*/
		//context.drawImage(iFood,  food.x, food.y);
		//agregando fondo

		var scoreText = "Score: " + score;

		context.fillText(scoreText, 5, height - 5);

	}

	//
	// //Pintamos la celda
	// function paintCell(x, y)
	// {
	//
	// 	context.drawImage(iFood, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	// 	//context.fillStyle = snakeColor;
	// 	//context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	// 	//context.strokeStyle = background;
	// 	//context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	//
	// }

	function paintCell(x, y, type)
	{
		var t=type;
		if (t=="food") {
			context.drawImage(iFood, x * cellWidth, y * cellWidth, cellWidth, cellWidth);

		}
		else if (t=="head"){
			if(d=="down"){
			context.drawImage(iHead, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="right"){
			context.drawImage(iHead4, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="up"){
			context.drawImage(iHead2, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="left"){
			context.drawImage(iHead3, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
		}
		else if (t=="body"){
			context.drawImage(iBody, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		}
	}

	//Verificiamos si hubo alguna colisión (si la hubo el juego se reinicia)
	function checkCollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y) {
				return true;
				 aDie.play();
				// finestraModal.classList.add("js-mostrar");
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
	/*$(document).on('keydown', function(e) {
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
	});*/
		var btnReiniciar=$('#reiniciar');
	btnReiniciar.click(reiniciarDenuevo);

	function reiniciarDenuevo(){
		//aDie.play();
		document.getElementById('compile').style.display = 'block';
		init();
		//document.getElementById('piece-box').innerHTML= "";
		return;

	}

	var btnRepetir=$('#repetir');
	btnRepetir.click(repetirDenuevo);

	function repetirDenuevo(){
		finestraModal.classList.remove("js-mostrar");
	}

	var btnCompile=$('#compile');
	btnCompile.click(recyclerPiece);

	function recyclerPiece(){
		document.getElementById('compile').style.display = 'none';
		var pieceBox=document.getElementsByClassName('piece-box');
		var pieces=document.getElementById('piece-box').getElementsByClassName('piece');
		var piece;
		var instruction;
		var instructionSig;
		var length=pieces.length;
		var i=0;
		var iFor=0;
		var array=[];
		console.log(length);
		//for(var i = 0; i <= length-1; i++)
		while (i<=length-1)
		{
				var piece=pieces[i];
				var pieceSiguiente=pieces[i+1]
				var piecesInfor;
				if(typeof pieceSiguiente != 'undefined')
	      {

					instructionSig=pieceSiguiente.dataset.instruction;
				}

					instruction=piece.dataset.instruction;

					if(instruction=='for')
					{
						//setTimeout(paint,i*1000,instructionSig);
						piecesInfor=recogerPiezasInfor(pieces,piece);
						console.log(piecesInfor);
						ejecutarPiezasInfor(piecesInfor,i);
						// setTimeout(function(){},i*2000);
						// execInstruction(instructionSig);
					}else if(piece.className.search('in-for') == -1){
						console.log(piece.className);
						setTimeout(paint,i*1000,instruction);
					}
					console.log(piece.className);
						array[i]=instruction;
						console.log(array);
				i++;
		}
		console.log(array);

		// for(i in pieces){
    //   var piece=pieces[i];
    //   if(typeof piece.style != 'undefined')
    //   {
		// 		instruction=piece.dataset.instruction;
		// 		setTimeout(function(){execInstruction(instruction)},2000);
		// 		console.log(instruction);
		// 	}

    //}

	}

	function recogerPiezasInfor(pieces,pieceFor){
		var piecesInFor=pieceFor.getElementsByClassName('piece');
		for (var i = 0; i < piecesInFor.length; i++) {
		    piecesInFor[i].className += ' in-for';
		}
		console.log(pieceFor);
		console.log(piecesInFor);
		return piecesInFor;
	}
	function ejecutarPiezasInfor(piecesInFor,retraso){
		console.log(piecesInFor);
		var piece;
		var instruction;
		var j=1;
		while (j<=2) {
			for (var i = 0; i < piecesInFor.length; i++) {
				piece=piecesInFor[i];
				instruction=piece.dataset.instruction;
				setTimeout(paint,(retraso)*1000,instruction);
				retraso++;
			}
			j++;
		}

	}

	var btnEmpty=$('#empty');
	btnEmpty.click(emptyContainer);

	function emptyContainer(){
		document.getElementById('piece-box').innerHTML= "";
	}




});
