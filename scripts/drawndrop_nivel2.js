$(document).on('ready',function (){
    var box=document.querySelector('.piece-box');
    var pieces=document.getElementsByClassName('piece');
    var pieceFor=document.querySelector('.piece-for');
    //droppablePieceFor();
    console.log(pieceFor);
    box.addEventListener('drop', recogerpieza,false);
    box.addEventListener('dragover', piezasobre,false);
    box.addEventListener('dragenter', piezaingresa,false);
    box.addEventListener('dragleave', piezasale,false);
    console.log(box);
    for(i in pieces){
      var piece=pieces[i];
      if(typeof piece.style != 'undefined')
      {
        piece.addEventListener('dragstart', alzarpieza, false);
        piece.addEventListener('dragend', soltarpieza, false);
      }
    }

    function alzarpieza(e){
      console.log(e);
      this.style.backgroundColor='#e74c3c';
      //Creamos un padre
      var padre=document.createElement('div');
      //creamos un clon de la pieza
      var clon=this.cloneNode(true);
      //Agregamos como el clon como hijo del contenedor que hemos creado
      padre.appendChild(clon);
      //se puede agregar informacion al evento mediante su elemento dataTransfer
      //Nosotros agregaremos el codigo html que tiene el padre en su interior
      //osea le agregaremos el clon
      e.dataTransfer.setData('text',padre.innerHTML);
      console.log(padre);
      padre.appendChild(clon);
    }

    function recogerpieza(e){
      e.preventDefault();
      var datoclon=e.dataTransfer.getData('text');
      this.innerHTML += datoclon;
      if (e.target.id == 'piece-for') {
        e.target.parentNode.removeEventListener('drop',recogerpieza,false);
        var nodoshijos=e.target.childNodes;
        console.log(nodoshijos);
        //agregarClaseInfor(nodoshijos);
        // Agregar clase in-for a todos los elementos dentro del for
        for (var i = 0; i <= nodoshijos.length; i++) {
            nodoshijos[i].className += ' in-for';
            console.log(i);
        }
      }
    }
    function soltarpieza(e){
      e.preventDefault();
      this.style.backgroundColor='#3498db';
      droppablePieceFor();
    }

    function piezasobre(e){
      e.preventDefault();
      this.style.backgroundColor='';
    }
    function piezaingresa(e){
      // console.log(e.target.id);
      // console.log(e.target.parentNode);
      if (e.target.id == 'piece-for') {
        this.style.backgroundColor='green';
        console.log(e.target.parentNode);
        this.parentNode.removeEventListener('drop',recogerpieza,false);

      }

    }
    function piezasale(e){
      console.log(e.target.parentNode);
      if (e.target.id == 'piece-for') {
        e.target.parentNode.addEventListener('drop',recogerpieza,false);

      }
    }
    function droppablePieceFor(){
      piecesFor=document.querySelectorAll('.piece-box .piece-for');
      console.log(piecesFor);
      for(i in piecesFor){
        var pieceFor=piecesFor[i];
        if(typeof pieceFor.style != 'undefined' )
        {
          console.log(piecesFor);
          pieceFor.addEventListener('drop', recogerpieza,false);
          pieceFor.addEventListener('dragover', piezasobre,false);
        }
      }

    }

})
