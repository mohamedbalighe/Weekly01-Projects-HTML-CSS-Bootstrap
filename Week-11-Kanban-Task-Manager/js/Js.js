const TaskName_Input = document.getElementById("TaskName");
const groupSelect_Input = document.getElementById("groupSelect");
const date_Input = document.getElementById("date");
const message_Input = document.getElementById("message");
const AddButton = document.getElementById("AddB");
const nameAlert = document.getElementById("nameAlert");

const TODO_COL = document.getElementById("todo-col");
const PROGRESS_COL = document.getElementById("progress-col");
const COMPLETED_COL = document.getElementById("completed-col");

 let All_Data = JSON.parse(localStorage.getItem("tasks")) || [];

 All_Data.forEach(task => {
  if (!task.status) task.status = "todo";
});

 Display_Data();

 AddButton.addEventListener("click", function () {
  if (!ValidateName()) {
    return;
  }
  
  const User_Data = {
    Task_Name: TaskName_Input.value,
    group_Select: groupSelect_Input.value,
    date: date_Input.value,
    message: message_Input.value,
    status: "todo"
  };

  All_Data.push(User_Data);
  localStorage.setItem("tasks", JSON.stringify(All_Data));
  Display_Data();
  clearForm();

  const modalEl = document.getElementById("exampleModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

TaskName_Input.addEventListener("input", ValidateName);
function clearForm() {
  TaskName_Input.value = "";
  groupSelect_Input.value = "Low";
  date_Input.value = "";
  message_Input.value = "";
  TaskName_Input.classList.remove("is-valid", "is-invalid");
  nameAlert.classList.add("d-none");
}

function Update_Inputs(index) {
  if (All_Data[index] === undefined) return;

  TaskName_Input.value = All_Data[index].Task_Name;
  groupSelect_Input.value = All_Data[index].group_Select;
  date_Input.value = All_Data[index].date;
  message_Input.value = All_Data[index].message;

  const modalEl = document.getElementById("exampleModal");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function deleteTask(index) {
  All_Data.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(All_Data));
  Display_Data();
}

function changeTaskStatus(index, newStatus) {
  if (All_Data[index]) {
    All_Data[index].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(All_Data));
    Display_Data();
  }
}

function Display_Data() {
  let boxes = { "todo": "", "in-progress": "", "completed": "" };
  let counts = { "todo": 0, "in-progress": 0, "completed": 0 };

  for (let N = 0; N < All_Data.length; N++) {
    let task = All_Data[N];
    let status = task.status || "todo";
    counts[status]++;

    let priorityColor = "#6c757d";
    if (task.group_Select === "High") priorityColor = "#dc3545";
    else if (task.group_Select === "Meduim") priorityColor = "#ffc107";
    else if (task.group_Select === "Low") priorityColor = "#198754";

    let bottomButtons = "";
    if (status === "todo") {
      bottomButtons = `
        <button type="button" class="btn btn-danger move-progress-btn" data-index="${N}"><i class="fa-solid fa-play me-2"></i>Start</button>
        <button type="button" class="btn btn-success fw-bolder move-completed-btn" data-index="${N}"><i class="fa-solid fa-check me-2 fw-bolder"></i>Complete</button>`;
    } else if (status === "in-progress") {
      bottomButtons = `
      <button type="button" class="btn btn-secondary move-todo-btn" data-index="${N}"><i class="fa-solid fa-arrow-rotate-left me-2"></i>To Do</button>
      <button type="button" class="btn btn-success fw-bolder move-completed-btn" data-index="${N}"><i class="fa-solid fa-check me-2 fw-bolder"></i>Complete</button>`;
    } else if (status === "completed") {
      bottomButtons = `
       <button type="button" class="btn btn-danger move-progress-btn" data-index="${N}"><i class="fa-solid fa-play me-2"></i>Start</button>
      <button type="button" class="btn btn-secondary move-todo-btn" data-index="${N}"><i class="fa-solid fa-arrow-rotate-left me-2"></i>To Do</button>`;
    }

    boxes[status] += `
      <div class="The-Box-Inside rounded-3">
        <div class="All-Data rounded-3 my-3 px-3">
          <div class="spot-and-Buttons d-flex justify-content-between mb-2">
            <div class="Spot-And-indexing d-flex gap-2 mt-3">
              <div class="spot-icon"><i class="fa-solid fa-circle " style="color:${priorityColor}"></i></div>
              <h6 class="Box-indexing">#${N + 1}</h6>
            </div>
            <div class="The-Buttons">
              <button type="button" class="btn Edit-Task-button btn-secondary" data-index="${N}">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button type="button" class="btn Delet-button btn-primary" data-index="${N}">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
          <div class="User-inputs-And-Buttons text-start d-flex flex-column gap-2">
            <div class="Task-name fw-bold">${task.Task_Name}</div>
            <p class="Task-Description m-0">${task.message}</p>
            <div class="Task-Priority d-flex gap-2">
              <i class="fa-solid fa-circle mt-2" style="color:${priorityColor}"></i>
              ${task.group_Select}
            </div>
            <div class="Task-Date-and-time-adding d-flex gap-2 mb-2">
              <div class="task-date me-2">
                <i class="fa-regular fa-calendar me-2"></i>${task.date || "No date"}
              </div>
              <h6 class="time-adding"><i class="fa-regular fa-clock me-2"></i>just now</h6>
            </div>
            <div class="The-Buttons-2">
              ${bottomButtons}
            </div>
          </div>
        </div>
      </div>`;
  }

  if (TODO_COL) TODO_COL.innerHTML = boxes["todo"] || `<div class="text-center py-4 text-secondary"><i class="fa-regular fa-folder-open fs-3 mb-2 d-block"></i><p class="m-0">No tasks</p></div>`;
  if (PROGRESS_COL) PROGRESS_COL.innerHTML = boxes["in-progress"] || `<div class="text-center py-4 text-secondary"><i class="fa-regular fa-folder-open fs-3 mb-2 d-block"></i><p class="m-0">No tasks</p></div>`;
  if (COMPLETED_COL) COMPLETED_COL.innerHTML = boxes["completed"] || `<div class="text-center py-4 text-secondary"><i class="fa-regular fa-folder-open fs-3 mb-2 d-block"></i><p class="m-0">No tasks</p></div>`;
  
  document.querySelectorAll(".toDo-Word p").forEach((p, idx) => {
      if(idx === 0) p.innerHTML = `${counts["todo"]} tasks`;
      if(idx === 1) p.innerHTML = `${counts["in-progress"]} tasks`;
      if(idx === 2) p.innerHTML = `${counts["completed"]} tasks`;
  });
}

document.body.addEventListener("click", function (e) {
  let editBtn = e.target.closest(".Edit-Task-button");
  if (editBtn) {
    Update_Inputs(parseInt(editBtn.getAttribute("data-index")));
    return;
  }

  let deleteBtn = e.target.closest(".Delet-button");
  if (deleteBtn) {
    deleteTask(parseInt(deleteBtn.getAttribute("data-index")));
    return;
  }

  let startBtn = e.target.closest(".move-progress-btn");
  if (startBtn) {
    changeTaskStatus(parseInt(startBtn.getAttribute("data-index")), "in-progress");
    return;
  }

  let completeBtn = e.target.closest(".move-completed-btn");
  if (completeBtn) {
    changeTaskStatus(parseInt(completeBtn.getAttribute("data-index")), "completed");
    return;
  }

  let backBtn = e.target.closest(".move-todo-btn");
  if (backBtn) {
    changeTaskStatus(parseInt(backBtn.getAttribute("data-index")), "todo");
    return;
  }
});

document.getElementById("exampleModal").addEventListener("hidden.bs.modal", function () {
  clearForm();
});

function ValidateName() {
  let regax = /^[A-Za-z][a-zA-Z0-9_\s]{2,}$/;

  if (regax.test(TaskName_Input.value) === true) {
    TaskName_Input.classList.add("is-valid");
    TaskName_Input.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    TaskName_Input.classList.add("is-invalid");
    TaskName_Input.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}