let toggle = document.getElementById("container");
let toggleContainer = document.getElementById("mode");
let buttonScreen= document.getElementById("button-mode");
let body = document.querySelector('body');

// Obtener el estado del modo oscuro almacenado en localStorage
let isDarkMode = localStorage.getItem('dark-mode') === 'true';

// Si el modo oscuro está activado, aplicar las clases correspondientes
if (isDarkMode) {
  toggle.classList.add('active');
  body.classList.add('active-bg');
  toggleContainer.classList.add('active-container');
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
}

buttonScreen.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active-bg');
    toggleContainer.classList.toggle('active-container');

    // Actualizar el estado del modo oscuro en localStorage
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

buttonScreen.addEventListener("click", function() {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } 

// Actualizar el estado del modo oscuro en localStorage
localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});







