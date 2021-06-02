let pagina = 1; // Variable global, estara disponible en todas las funciones

document.addEventListener('DOMContentLoaded', function() {
  iniciarApp();
});

function iniciarApp() {
  mostrarServicios();

  // Resalta el DIV actual segun el Tab al que se presiona
  mostrarSeccion();

  // Oculta o muestra una seccion segun el Tab que se presiona
  cambiarSeccion();
}

function mostrarSeccion() {
  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add('mostrar-seccion');
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll('.tabs button');

  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      pagina = parseInt(e.target.dataset.paso);

      //  Eliminar mostrar-seccion de la seccion anterior
      document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

      const seccion = document.querySelector(`#paso-${pagina}`);
      seccion.classList.add('mostrar-seccion');

    })
  })
}

async function mostrarServicios() {
  try {
    const resultado = await fetch ('./servicios.json');
    const db = await resultado.json();

    const { servicios } = db;

    // Generar el HTML
    servicios.forEach( servicio => {
      const {
        id,
        nombre,
        precio
      } = servicio;

      // DOM Scripting
      // Generar Nombre de Servicio
      const nombreServicio = document.createElement('P');
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add('nombre-servicio');

      // Generar Precio de Servicio
      const precioServicio = document.createElement('P');
      precioServicio.textContent = `$ ${precio}`;
      precioServicio.classList.add('precio-servicio');

      // Generar DIV contenedor
      const servicioDiv = document.createElement('DIV');
      servicioDiv.classList.add('servicio');
      servicioDiv.dataset.idServicio = id;

      // Selecciona un servicio para la Cita
      servicioDiv.onclick = seleccionarServicio;

      // Inyectar Precio y Nombre a DIV de Servicio
      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      // Inyectarlo en el HTML
      document.querySelector('#servicios').appendChild(servicioDiv);

      console.log(servicioDiv);
    })

  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {

  let elemento;
  // Forzar que el elemento al que le damos click sea el DIV
  if (e.target.tagName === 'P') {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  // Seleccionar y Deseleccionar el elemento
  if (elemento.classList.contains('seleccionado')) {
    elemento.classList.remove('seleccionado');
  } else {
    elemento.classList.add('seleccionado');
  }
}
