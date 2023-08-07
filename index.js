const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 1700,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 2000,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 2200,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 2200,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza para enfermos",
    precio: 2,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const miFormulario = document.getElementById("miFormulario");
const inputNumber = document.getElementById("inputNumber");
const buttonSubmit = document.getElementById("botonSubmit");
const contenedorPizza = document.getElementById('contenedorPizza');


// Función para verificar si el número ingresado coincide con algún id de las pizzas
function verificarIdPizza(numeroIngresado) {
  return pizzas.some((pizza) => pizza.id === numeroIngresado);
}

// Función para renderizar la card de la pizza en el contenedor
function renderizarPizza(pizza) {
  const cardHTML = `
          <div class="card">
          <h2>${pizza.nombre}</h2>
              <img src="${pizza.imagen}" alt="${pizza.nombre}">
              <p>Ingredientes: ${pizza.ingredientes}</p>
              <p>Precio: $${pizza.precio}</p>
          </div>
      `;
  contenedorPizza.innerHTML = cardHTML;
  guardarUltimaPizza(pizza);
  ocultarMensajeError();
}

// Función para mostrar el mensaje de error
function mostrarMensajeError() {
  error.innerHTML = '<p>No se encontró ninguna pizza con ese ID.</p>';
}

// Función para ocultar el mensaje de error
function ocultarMensajeError() {
  error.innerHTML = '';
}

// Función para guardar la última pizza en localStorage
function guardarUltimaPizza(pizza) {
  localStorage.setItem('ultimaPizza', JSON.stringify(pizza));
}

// Función para obtener la última pizza guardada en localStorage
function obtenerUltimaPizza() {
  const pizzaGuardada = localStorage.getItem('ultimaPizza');
  return pizzaGuardada ? JSON.parse(pizzaGuardada) : null;
}

// Evento submit en el formulario

miFormulario.addEventListener('submit', function (event) {

  //Evitar que el formulario se envie de una
  event.preventDefault();


  // Obtener el valor ingresado por el usuario en el campo de entrada //Acá se pone el diez para evitar problemas si el valor ingresado empeiza en 0.
  const numeroIngresado = parseInt(inputNumber.value, 10);

  // Borrar el contenido del contenedor antes de renderizar la pizza o mostrar el mensaje de error
  contenedorPizza.innerHTML = "";


  // Verificar si el número ingresado coincide con algún id de las pizzas
  const pizzaEncontrada = pizzas.find((pizza) => pizza.id === numeroIngresado);

  if (pizzaEncontrada) {
    // Si se encontró la pizza, renderizar la card de la pizza en el contenedor
    renderizarPizza(pizzaEncontrada);
  }

  else {
    // Si no se encontró la pizza, mostrar un mensaje de error en el contenedor
    mostrarMensajeError();
  }
});

  // Al cargar la página, mostrar la última pizza guardada en localStorage
  window.addEventListener('load', function () {
    const ultimaPizza = obtenerUltimaPizza();
    if (ultimaPizza) {
      renderizarPizza(ultimaPizza);
    }
  });