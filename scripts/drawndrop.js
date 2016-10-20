$(document).on('ready',function (){
    var box=document.querySelector('.piece-box');
    var pieces=document.getElementsByClassName('piece');

    box.addEventListener('drop', recogerpieza,false);
    box.addEventListener('dragover', piezasobre,false);
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
      this.style.backgroundColor='red';
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
    }

    function recogerpieza(e){
      e.preventDefault();
      
      var datoclon=e.dataTransfer.getData('text');
      console.log(datoclon);
      this.innerHTML += datoclon;
    }
    function soltarpieza(e){
      this.style.backgroundColor='blue';
    }

    function piezasobre(e){
      e.preventDefault();

    }



})
