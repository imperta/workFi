let toggle = document.getElementById("container");
let toggleContainer = document.getElementById("mode");
let buttonScreen= document.getElementById("button-mode");
let body = document.querySelector('body');

buttonScreen.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active-bg');
    toggleContainer.classList.toggle('active-container');
    setTimeout(toggleBodyClass, 100); // Espera 100 milisegundos antes de cambiar la clase del cuerpo del documento
}

buttonScreen.addEventListener("click", function() {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } 
});





