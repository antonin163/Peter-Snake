document.addEventListener('DOMContentLoaded',function(){
	FinestraModal3();
});

function FinestraModal3(){
	var finestraModal3 = document.getElementById("finestra-modal3"),
			finestraModalObrir3 = document.getElementById("finestra-modal-obrir3"),
			finestraModalTancar3 = document.getElementById("finestra-modal-tancar3");

	finestraModalObrir3.addEventListener("click",function() {
		finestraModal3.classList.add("js-mostrar3");
	});
	finestraModalTancar3.addEventListener("click",function() {
		finestraModal3.classList.remove("js-mostrar3");
	});
	/*finestraModal.addEventListener("click",function() {
		finestraModal.classList.remove("js-mostrar");
	});*/
}

//console.log('from modal.js');