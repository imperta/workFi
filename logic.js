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
  function resetPomodoro() {
    clearInterval(interval);
    workTimeInput.value = 25;
    breakTimeInput.value = 5;
    restTimeInput.value = 15;
    cyclesInput.value = 4;
    startButton.disabled = false;
    currentTime = workTimeInput.value;
    seconds = 0;
    cyclesCompleted = 0;
    updateClock();
  }

  // Button Functionality
  startButton.onclick = () => {
    populateVariables();
    startPomodoro();
    startButton.disabled = true;
    pauseButton.disabled = false;
  };

  pauseButton.onclick = () => {
    clearInterval(interval);
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
    startButton.style.display = "none";
    resumeButton.style.display = "block";
    resetButton.style.display = "block";
  };

  resumeButton.onclick = () => {
    timer();
    pauseButton.style.display = "block";
    resumeButton.style.display = "block";
    resumeButton.style.display = "none";
  };

  resetButton.onclick = () => {
    resetPomodoro();
    startButton.style.display = "block";
    resumeButton.style.display = "none";
    resetButton.style.display = "none";
    pauseButton.style.display = "block";
    pauseButton.disabled = true;
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
};
