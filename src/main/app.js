const input = document.getElementById('ingresar-tarea');
const boton = document.querySelector('button');
const listaDeTareas = document.getElementById('lista-de-tareas');

const baseBackendUrl = window.origin;
console.log({baseBackendUrl});

function crearItemTarea(name, completada, id) {
  let tareaNueva = document.createElement('div');
    tareaNueva.classList.add('tarea');
    if (completada) tareaNueva.classList.toggle('completada');
    // Texto ingresado por el usuario
    let texto = document.createElement('p');
    texto.innerText = name;
    tareaNueva.appendChild(texto);
    tareaNueva.setAttribute('id', id);

    // Crear y agregar contenedor de iconos
    let iconos = document.createElement('div');
    iconos.classList.add('iconos');
    tareaNueva.appendChild(iconos);

    // Iconos
    let completar = document.createElement('i');
    completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
    completar.addEventListener('click', completarTarea);

    let eliminar = document.createElement('i');
    eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
    eliminar.addEventListener('click', eliminarTarea);

    iconos.append(completar, eliminar);

    listaDeTareas.appendChild(tareaNueva);
}

function agregarTarea() {
  if (input.value) {
    // armar la peticion y enviarla
    fetch(`${baseBackendUrl}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input.value }),
    }).then((res) => {
      //console.log({ res });
      return res.json();
    }).then((resJSON) => {      
      crearItemTarea(input.value, false, resJSON.data._id);
    });    
  } else {
    alert('Por favot, ingrese una tarea.');
  }
}

function listarTareas( tareas ) {
  if (tareas) {
    tareas.forEach(tarea => {
       //crear tarea
      crearItemTarea(tarea.name, tarea.done, tarea._id);
    });

  } else {
    alert('Arreglo de Tareas vacio');
  }
};

function obtenerTareas() {
  fetch(`${baseBackendUrl}/task`).then((res) => {
    //console.log({ res });
    return res.json();
  }).then((resJSON) => {
    //console.log(resJSON.data);
    listarTareas(resJSON.data);
  });
};

function completarTarea(e) {
  let tarea = e.target.parentNode.parentNode;
  const data = { text: tarea.querySelector('p').innerText , done: !(tarea.classList.contains('completada')) };  
  fetch(`${baseBackendUrl}/task`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    //console.log({ res });
    return res.json();
  }).then((resJSON) => {
    //console.log( resJSON.data );
    tarea.classList.toggle('completada');
  });
};

function eliminarTarea(e) {
  let tarea = e.target.parentNode.parentNode;
  fetch(`${baseBackendUrl}/task/${tarea.id}`, {
    method: "DELETE",
  }).then((res) => {
    //console.log({ res });
    return res.json();
  }).then((resJSON) => {
    //console.log( resJSON );
    tarea.remove();
  });
};

boton.addEventListener('click', agregarTarea);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    agregarTarea();
  }
});

window.addEventListener('load', obtenerTareas);
