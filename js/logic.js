window.onload = () => {
  // Pomodoro
  let workTime;
  let breakTime;
  let restTime;
  let timesCompleted; //Cuantos tiempos se han completado
  let cyclesGoal;
  let cyclesCompleted = 0;
  let interval;

  function pomodoroController() {
    if (isRestTime()) {
      cyclesCompleted++;
      if (goalReached()) {
        currentTime = restTime;
        timer();
        timesCompleted = 0;
      } else {
        console.log("Pomodoro Finished");
      }
      return;
    }

    if (timesCompleted % 2 == 0) {
      currentTime = workTime;
      timesCompleted++;
      timer();
      console.log(
        "Time to work! TC:" + timesCompleted + ", cycles:" + cyclesCompleted
      );
    } else {
      currentTime = breakTime;
      timesCompleted++;
      timer();
      console.log(
        "Time to break! TC:" + timesCompleted + ", cycles:" + cyclesCompleted
      );
    }
  }

  function goalReached() {
    return cyclesGoal == cyclesCompleted;
  }
  function isRestTime() {
    return timesCompleted == 7;
  }

  // Coneccion con el Front-end
  let clock = document.getElementById("clock");
  let cyclesInput = document.getElementById("cycles-input");
  let startButton = document.getElementById("start-button");
  let pauseButton = document.getElementById("pause-button");
  let resumeButton = document.getElementById("resume-button");
  let resetButton = document.getElementById("reset-button");
  let workTimeInput = document.getElementById("work-time");
  let breakTimeInput = document.getElementById("break-time");
  let restTimeInput = document.getElementById("rest-time");

  // Variables de modos
  // ID
  let workTimeMode = document.getElementById("mode-selection-work");
  let shortTimeMode = document.getElementById("mode-selection-short");
  let longTimeMode = document.getElementById("mode-selection-long");
  // Class
  let modeActiveClassW = document.querySelector(".button-mode-selection-w");
  let modeActiveClassS = document.querySelector(".button-mode-selection-s");
  let modeActiveClassL = document.querySelector(".button-mode-selection-l");

  // Estilos por defecto de modos en barra de navegacion
  function barStyles() {}
  if (modeActiveClassW.classList.contains("")) {
    modeActiveClassW.classList.remove("active");
  } else {
    modeActiveClassW.classList.add("active");
  }
  barStyles();

  // Variables engrupadas
  function populateVariables() {
    console.log("Populated Variables");
    workTime = workTimeInput.value;
    breakTime = breakTimeInput.value;
    restTime = restTimeInput.value;
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
  }

  // Funcion de reiniciar el contador
  // function resetPomodoro() {
  //   clearInterval(interval);
  //   workTimeInput.value = 25;
  //   breakTimeInput.value = 5;
  //   restTimeInput.value = 15;
  //   // cyclesInput.value = 4;
  //   startButton.disabled = false;
  //   currentTime = workTimeInput.value;
  //   seconds = 0;
  //   cyclesCompleted = 0;
  //   updateClock();
  // }

  // Funcion para el modo de trabajo
  function workTimeMode_f() {
    clearInterval(interval);
    workTimeInput.value = 25;
    breakTimeInput.value = 5;
    restTimeInput.value = 15;
    startButton.disabled = false;
    currentTime = workTimeInput.value;
    seconds = 0;
    cyclesCompleted = 0;
    updateClock();

    // Secuencias de modo en la barra de navegacion
    if (modeActiveClassW.classList.contains("")) {
    } else {
      modeActiveClassW.classList.add("active");
      modeActiveClassS.classList.remove("active");
      modeActiveClassL.classList.remove("active");
    }
  }
  // Funcion para el modo de descanso corto
  function shortTimeMode_f() {
    clearInterval(interval);
    workTimeInput.value = 0;
    breakTimeInput.value = 5;
    restTimeInput.value = 15;
    startButton.disabled = false;
    currentTime = breakTimeInput.value;
    seconds = 0;
    cyclesCompleted = 0;
    updateClock();

    // Secuencias de modo en la barra de navegacion
    if (modeActiveClassS.classList.contains("")) {
    } else {
      modeActiveClassS.classList.add("active");
      modeActiveClassL.classList.remove("active");
      modeActiveClassW.classList.remove("active");
    }
  }
  // Funcion para el modo de descanso largo
  function longTimeMode_f() {
    clearInterval(interval);
    workTimeInput.value = 0;
    breakTimeInput.value = 0;
    restTimeInput.value = 15;
    startButton.disabled = false;
    currentTime = breakTimeInput.value;
    seconds = 0;
    cyclesCompleted = 0;
    updateClock();

    // Secuencias de modo en la barra de navegacion
    if (modeActiveClassL.classList.contains("")) {
    } else {
      modeActiveClassL.classList.add("active");
      modeActiveClassS.classList.remove("active");
      modeActiveClassW.classList.remove("active");
    }
  }

  // Button Functionality

  // Modos de pomodoro
  workTimeMode.onclick = () => {
    workTimeMode_f();
    // console.log("work time mode");
  };

  shortTimeMode.onclick = () => {
    shortTimeMode_f();
    // console.log("Short time mode");
  };

  longTimeMode.onclick = () => {
    longTimeMode_f();
    // console.log("Long time mode");
  };

  // Botones de pomodoro
  startButton.onclick = () => {
    populateVariables();
    startPomodoro();
    pauseButton.disabled = false;
    pauseButton.style.display = "block";
    startButton.style.display = "none";
    workTimeMode.disabled = true;
    shortTimeMode.disabled = true;
    longTimeMode.disabled = true;
  };

  pauseButton.onclick = () => {
    clearInterval(interval);
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
    startButton.style.display = "none";
    resumeButton.disabled = false;
  };
  resumeButton.onclick = () => {
    timer();
    pauseButton.style.display = "block";
    resumeButton.style.display = "none";
    resumeButton.disabled = true;
  };
  resetButton.onclick = () => {
    workTimeMode_f();
    startButton.style.display = "block";
    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
    workTimeMode.disabled = false;
    shortTimeMode.disabled = false;
    longTimeMode.disabled = false;
    console.log("Pomodoro Reseted");
  };
  function startPomodoro() {
    console.log("Started Pomodoro");
    pomodoroController();
  }

  // Clock y fix de numeros
  let clockMinutes;
  let clockSeconds;

  function updateClock() {
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
  }
  function formatNumbers(time) {
    let formattedDigits;
    if (time < 10) {
      formattedDigits = "0" + time;
    } else {
      formattedDigits = time;
    }
    return formattedDigits;
  }

  // Timer
  let currentTime; //Minutos Seteados
  let seconds = 0;

  function timer() {
    if (currentTime > 0 || seconds > 0) {
      if (seconds == 0) {
        seconds = 59;
        currentTime--;
      } else {
        seconds--;
      }
      updateClock();
      // console.log(currentTime, seconds);
      interval = setTimeout(timer, 1000);
    } else {
      pomodoroController();
      //   console.log("El Temporizador Terminó");
    }
  }

  // Mensaje tooltip
  const tooltips = document.querySelectorAll(".tooltip");

  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", () => {
      tooltip.querySelector(".tooltip-box").style.display = "block";
    });

    tooltip.addEventListener("mouseleave", () => {
      tooltip.querySelector(".tooltip-box").style.display = "none";
    });
  });

  // Animacion de slider
  const openClose = document.getElementById("open-close"),
    aside = document.getElementById("aside");

  // Funcion para evitar que se abra el slider automaticamente
  function openSlider() {
    if (aside.classList.contains("cerrado")) {
      aside.classList.remove("cerrado");
      aside.classList.add("desplegar");
    } else {
      aside.classList.add("desplegar");
    }
  }
  openSlider();

  // Modo para abrir el slider
  openClose.addEventListener("click", () => {
    aside.classList.toggle("desplegar");
  });
};

//Animacion de loader de la pagina
const fadeOut = () => {
  const loaderWrapper = document.querySelector(".wrapper");
  loaderWrapper.classList.add("fade");
};
window.addEventListener("load", fadeOut);
