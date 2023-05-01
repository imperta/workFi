window.onload = () => {
  // Pomodoro
  let workTime;
  let breakTime;
  let timesCompleted; //Cuantos tiempos se han completado
  let cyclesGoal;
  let cyclesCompleted = 0;

  function pomodoroController() {
    if (isRestTime()) {
      cyclesCompleted++;
      if (!goalReached()) {
        currentTime = restTime;
        timer();
        timesCompleted = 0;
      } else {
        console.log("Pomodoro ");
      }
      return;
    }

    function isRestTime() {
        return timesCompleted == 7;
      }
      function goalReached() {
        return cyclesGoal == cyclesCompleted;
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


    // Coneccion con el Front-end
    let clock = document.getElementById("clock");
    let cyclesInput = document.getElementById("cycles-input");
    let startButton = document.getElementById("start-button");
    let workTimeInput = document.getElementById("work-time");
    let breakTimeInput = document.getElementById("break-time");
    let restTimeInput = document.getElementById("rest-time");
  
    // Button Functionality
    startButton.onclick = () => {
      populateVariables();
      startPomodoro();
    };
    function startPomodoro() {
      console.log("Started Pomodoro");
      pomodoroController();
    }
    function populateVariables() {
      console.log("Populated Variables");
      workTime = workTimeInput.value;
      breakTime = breakTimeInput.value;
      restTime = restTimeInput.value;
      cyclesGoal = cyclesInput.value;
      timesCompleted = 0;
    }

    // Timer
    let currentTime = 1; //Minutos Seteados
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
        console.log(currentTime, seconds);
        interval = setTimeout(timer, 1000);
      } else {
        pomodoroController();
        //   console.log("El Temporizador Terminó");
      }
    }

  // Clock
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

};
