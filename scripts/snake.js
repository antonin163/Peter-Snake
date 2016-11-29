$(document).on('ready', function() {
	//Vamos a crear un contexto 2d de nuestro canvas.
	var canvas = $("#snake")[0];
	var context = canvas.getContext("2d");
	var finestraModal = document.getElementById("finestra-modal"),
			finestraModalObrir = document.getElementById("finestra-modal-obrir"),
			finestraModalTancar = document.getElementById("finestra-modal-tancar");
/*
	var img = new Image();
	img.src = "assets/pasto.jpg";
img.onload = function(){
	context.drawImage(img, 0, 0);
	paint();
}*/


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
	var array;
	var iBody = new Image();
	var iFood = new Image();
	var aEat = new Audio();
	var aDie = new Audio();
	var run;
	var iBackground = new Image();
	//var rr;
	//var tiempo = 0;
	//var stop;
	//var iBrick = new Image();
	//var relleno=context.createPattern(iFood, "no-repeat")
	//Creamos nuestra víbora
	var snake;

	//El juego tiene la dirección "right" por defecto y se ejecuta la función paint
	//dependiendo el nivel que hayas configurado arriba
	// function BtnAbrir()
	// {
		
	// 	finestraModalObrir = document.getElementById("finestra-modal-obrir");
	// }
	//window.addEventListener('load',init);
	function init()
	{
		
		d = "down";
		createFood();
		createSnake();

		

		//score = 0;
		

		/*if(typeof gameLoop != "undefined") {
			clearInterval(gameLoop);
		}*/
		right();
		down();
		/*agregacion de imagenes*/
		iBody.src = 'assets/body.png';
		iFood.src = 'assets/fruit.png';
		aEat.src = 'assets/chomp.oga';
		aDie.src = 'assets/dies.oga';
		iBackground.src = 'assets/flat-texture.png';
		//rr.src= 'assets/.png';
		

		//iBrick.src = 'assets/brick.png';
		
	// gameLoop = setInterval(paint, 1000 / level);
	}


	init();




	iBackground.onload = function(){
	context.drawImage(iBackground,0, 0, width, height );
	//context.drawImage(iBody, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	//context.drawImage(iFood, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	//context.drawImage(iBackground);
   // context.drawImage(iBackground,tiempo-800,0);
		 
         // tiempo--;
         // if(tiempo<0){
         //      tiempo = tiempo + 800;	
       //   }
	//context.drawImage(iBody, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	paint();
	
	}	

  //   function comenzar(){
    //      clearTimeout(stop);
      //    stop = setTimeout(comenzar,1);
        //  ee(context);
     //}

	
	//Creamos la víbora
	function createSnake()
	{
		var length = 5;
		snake = [];

		for(var i = length - 1; i >= 0; i--)
		{
			snake.push({ x: 2, y: i });
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
	function paint()
	{
		context.drawImage( iBackground, 0, 0, width, height );
		//context.fillStyle = background;
		//context.fillRect(0, 0, width, height);
		//context.strokeStyle = border;
		//context.strokeRect(0, 0, width, height);

		var nx = snake[0].x;
		var ny = snake[0].y;

		if (d == "right") {
			nx++;
		} 
		else if (d == "left") {
			nx--;
		} 
		else if (d == "up") {
			ny--;
		} 
		else if (d == "down") {
			ny++;
		}

		if (nx == -1 || nx == width / cellWidth || ny == -1 ||
			ny == height / cellWidth || checkCollision(nx, ny, snake) ) {
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
	
			// BtnAbrir();
			//createFood();
		} else {

			//aDie.play();
			var tail = snake.pop();

			tail.x = nx;
			tail.y = ny;			
			
		}

		snake.unshift(tail);

		for(var i = 0; i < snake.length; i++) {
			var c = snake[i];
		//context.drawImage(iBody, snake[i].x, snake[i].y);

			paintCell1(c.x, c.y);
		}

		paintCell(food.x, food.y);
		//context.drawImage(iFood,  food.x, food.y);
		//agregando fondo
		
	//	img.onload = function(){
	//	context.drawImage( iBackground, 0, 0, canvas.width, canvas.height );		
	//	}
		var scoreText = "Score: " + score;

		context.fillText(scoreText, 5, height - 5);

	}

/*
function muertes(){
	if(nx != food.x && ny != food.y)
	{
		aDie.play();
	};
}*/

 /*function run() {
 setTimeout(, 1000);  
 }*/

 /*
 window.requestAnimationFrame = (function () { 
 	return window.requestAnimationFrame || 
 	window.mozRequestAnimationFrame || 
 	window.webkitRequestAnimationFrame || 
 	function (callback) {
 	window.setTimeout(callback, 5); }; }());*/
 


	//Pintamos la celda
	function paintCell(x, y)
	{

		context.drawImage(iFood, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		//context.fillStyle = snakeColor;
		//context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		//context.strokeStyle = background;
		//context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

	}

	function paintCell1(x, y)
	{		
		context.drawImage(iBody, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	}

	//Verificiamos si hubo alguna colisión (si la hubo el juego se reinicia)
	function checkCollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y) {
				return true;
				 //aDie.play();
				 //finestraModal.classList.add("js-mostrar");
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
	//$(document).on('keydown', function(e) {
	//	var key = e.which;
	//	if (key == "37" && d != "right") {
	//		d = "left";
	//	} else if (key == "38" && d != "down") {
	//		d = "up";
	//	} else if (key == "39" && d != "left") {
	//		d = "right";
	//	} else if (key == "40" && d != "up") {
	//		d = "down";
	//	}
	//});

	var btnCompile=$('#compile');
	btnCompile.click(recyclerPiece);

	var btnReiniciar=$('#reiniciar');
	btnReiniciar.click(reiniciarDenuevo);

	function reiniciarDenuevo(){
		//aDie.play();
		document.getElementById('compile').style.display = 'block';
		init();
		return;	        
        //document.getElementById('piece-box').innerHTML= "";
        
	}



	var btnRepetir=$('#repetir');
	btnRepetir.click(repetirDenuevo);

	function repetirDenuevo(){
		finestraModal.classList.remove("js-mostrar");
	}
	
	
	function recyclerPiece(){
		document.getElementById('compile').style.display = 'none';
		var pieceBox=document.getElementsByClassName('piece-box');
		var pieces=document.getElementById('piece-box').getElementsByClassName('piece');
		var piece;
		var instruction;
		var length=pieces.length;
		var i=0;
		var array=[];
		console.log(length);
		//for(var i = 0; i <= length-1; i++)
		while (i<=length-1)
		{
				var piece=pieces[i];
				if(typeof piece.style != 'undefined')
	      {
					instruction=piece.dataset.instruction;
					setTimeout(function(){},i*2000);
					execInstruction(instruction);
					array[i]=instruction;
					console.log(array);
				}
				i++;
		}

    }         
		//btnCompile.click(reiniciarDenuevo);
		//btnCompile.click(recyclerPiece);
		//if (true) {}
		// for(i in pieces){
    //   var piece=pieces[i];
    //   if(typeof piece.style != 'undefined')
    //   {
		// 		instruction=piece.dataset.instruction;
		// 		setTimeout(function(){execInstruction(instruction)},2000);
		// 		console.log(instruction);
		// 	}

    //}



	//var myTimer = setTimeout(recyclerPiece(), 5000);
	//var myTimer = setTimeout(paintCell(), 5000);
	//var myTimer = setTimeout(paint(), 5000);
	//setInterval(recyclerPiece, 8000);
	//var timeoutId = setTimeout("recyclerPiece()", 6000);
	//var timeoutId = setTimeout(paintCell, 6000);
	//var timeoutId = setTimeout("paint()", 2000);
	//setInterval("reloj()",1000);

	// function setInstructionModal(arrayInstructions){


	function execInstruction(instruction){
		if (instruction == "left" && d != "right") {
			left();
			//run();

		} else if (instruction == "up" && d != "down") {
			up();
			//run();
		} else if (instruction == "right" && d != "left") {
			right();
			//run();
		} else if (instruction == "down" && d != "up") {
			down();
			//run();
		}
		//window.requestAnimationFrame(execInstruction(instruction));
	}

	var btnEmpty=$('#empty');
	btnEmpty.click(emptyContainer);

	function emptyContainer(){
		document.getElementById('piece-box').innerHTML= "";
	}
	
	


});
