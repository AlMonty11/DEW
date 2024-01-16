let num_registros = 0;

const carga_datos = () => {
  
  let cuerpo = document.querySelector("table tbody");
  
  //Variables del formulario
  let userId = document.querySelector("#userId");
  let id = document.querySelectorAll("form div")[1];
  let title = document.querySelector("#title");
  let completed = document.querySelector("#completed");
  let formulario = document.querySelector("#formulario");
  
  //Ocultar formulario
  formulario.style.display="none";
  
  fetch("../archivo.json")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    json.forEach(element => {
      let fila = cuerpo.insertRow();
      
      let celda0 = fila.insertCell();
      celda0.textContent=element.userId;
      
      let celda1 = fila.insertCell();
      celda1.textContent=element.id;
      
      let celda2 = fila.insertCell();
      celda2.textContent=element.title;
      
      let celda3 = fila.insertCell();
      element.completed ? celda3.textContent="Sí" : celda3.textContent="No";
      //CONTROLADOR DE ID AUTOMATICO
      num_registros++;
      fila.addEventListener('click',function(){
        formulario.style.display = 'block';
        userId.value = celda0.textContent;
        title.value=celda2.textContent;
        (celda3.textContent=="Sí") ? completed.checked=true : completed.checked=false;
      })
    });
  });


//Ocultar el campo ID del formulario
  id.style.display='none';


//Mostrar formulario al clickar NUEVO
  let nuevo = document.querySelector("#nuevo");
  nuevo.addEventListener('click',function(){
    formulario.style.display="block";
  });

  
//Borrar datos del formulario al clickar cancelar
  let cancelar = document.querySelectorAll("#formulario button")[1];
  cancelar.addEventListener('click',function(){
    userId.value="";
    title.value="";
    completed.checked=false;
    formulario.style.display="none";
  })
  
  let aceptar = document.querySelectorAll("#formulario button")[0];
//Añadir nuevos datos a la tabla 
  aceptar.addEventListener('click',function(){

    let fila = cuerpo.insertRow();

    let celda0 = fila.insertCell();
    if(userId.value<0 || isNaN(userId.value) || !parseInt(userId.value)){
      alert("El Id del usuario debe ser numérico, entero y positivo");
    }
    else{
      celda0.textContent = userId.value;
    }
    userId.value="";


    let celda1 = fila.insertCell();
    celda1.textContent = (num_registros++) +1;

    let celda2 = fila.insertCell();
    celda2.textContent = title.value;
    title.value="";

    let celda3 = fila.insertCell();
    completed.checked ? celda3.textContent = "Sí" : celda3.textContent="No"
    completed.checked=false;

// Ocultar el formulario de nuevo al insertar datos
    formulario.style.display="none";
    
//Añadir la misma funcionalidad que al crear la tabla a cada fila para que se abra el formilario al hacer click
    fila.addEventListener('click',function(){
      formulario.style.display = 'block';
      userId.value = celda0.textContent;
      title.value=celda2.textContent;
      (celda3.textContent=="Sí") ? completed.checked=true : completed.checked=false;
    })

  });

//Funcion doble click
cuerpo.addEventListener('dblclick', function(event) {
    let celda = event.target;

//CONDICION PARA QUE NO PUEDA SER MODIFICADO EL ID DEL COMENTERIO
    if (celda.tagName == 'TD' && celda.cellIndex !== 1) {
      let contenidoActual = celda.textContent;
      celda.innerHTML = '';
//Crear el input en la celda donde esta el target
      let input = document.createElement('input');
      input.value = contenidoActual;
      celda.appendChild(input);
// Enfocar al input
      input.focus();

//Al perder el foco del input, actualizar el contenido de la celda
      input.addEventListener('blur', function() {
        let nuevoContenido = input.value; // Obtener el valor del input

//Reemplazar el input con el nuevo contenido (como nodo de texto)
        nuevoContenido !== '' ? celda.innerHTML = nuevoContenido : celda.innerHTML = contenidoActual;
      });
    }
  });

};

const iniciar = () => {
  carga_datos();
};

window.addEventListener("load", iniciar, false); // Al realizar la carga se ejecuta la inicialización
