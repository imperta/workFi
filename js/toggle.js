var toggle = document.getElementById("container");
let body = document.querySelector('body');
var modeScreen = document.getElementById("mode");


toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    mode.classList.toggle('active');
    // mode.classList.mode("remove");
}
