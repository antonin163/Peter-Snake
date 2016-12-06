document.addEventListener('DOMContentLoaded',function(){
	FinestraModal2();
});

function FinestraModal2(){
	var finestraModal2 = document.getElementById("finestra-modal2"),
			finestraModalObrir2 = document.getElementById("finestra-modal-obrir2"),
			finestraModalTancar2 = document.getElementById("finestra-modal-tancar2");

	finestraModalObrir2.addEventListener("click",function() {
		finestraModal2.classList.add("js-mostrar2");
	});
	finestraModalTancar2.addEventListener("click",function() {
		finestraModal2.classList.remove("js-mostrar2");
	});
	/*finestraModal.addEventListener("click",function() {
		finestraModal.classList.remove("js-mostrar");
	});*/
}

//console.log('from modal.js');