function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      let idx = elem.id;
      fullElemPage[idx].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      let idx = back.id;
      fullElemPage[idx].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  let currentTask = JSON.parse(localStorage.getItem("currentTask")) || [];

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let sum = "";

    currentTask.forEach((elem, idx) => {
      sum += `
            <div class="task">
              <h5>${elem.task}</h5>
              <p>${elem.details}</p>
              <button data-idx="${idx}">Mark as Complete</button>
            </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markCompletedBtn = document.querySelectorAll(".task button");

    markCompletedBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        let idx = btn.dataset.idx;
        currentTask.splice(idx, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = form.querySelector("input");
  let taskDetailsInput = form.querySelector("textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
    });
    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}
todoList();

function dailyPlanner() {
  let hours = Array.from({ length: 18 }, (_, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    wholeDaySum += `
        <div class="day-planner-time">
          <p>${elem}</p>
          <input id="${idx}" type="text" placeholder="...">
        </div>`;
  });

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let dayPlanner = document.querySelector(".day-planner");
  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInputs = document.querySelectorAll(".day-planner input");

  dayPlannerInputs.forEach((elem) => {
    if (dayPlanData[elem.id]) {
      elem.value = dayPlanData[elem.id];
    }

    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();
