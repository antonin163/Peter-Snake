document.addEventListener('DOMContentLoaded',function(){
	FinestraModal();
});

function FinestraModal(){
	var finestraModal = document.getElementById("finestra-modal"),
			finestraModalObrir = document.getElementById("finestra-modal-obrir"),
			finestraModalTancar = document.getElementById("finestra-modal-tancar");

	finestraModalObrir.addEventListener("click",function() {
		finestraModal.classList.add("js-mostrar");
	});
	finestraModalTancar.addEventListener("click",function() {
		finestraModal.classList.remove("js-mostrar");
	});
	/*finestraModal.addEventListener("click",function() {
		finestraModal.classList.remove("js-mostrar");
	});*/
}

//console.log('from modal.js');