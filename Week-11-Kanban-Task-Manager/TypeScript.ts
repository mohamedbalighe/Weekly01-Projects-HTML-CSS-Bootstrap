const TaskName_Input = document.getElementById("TaskName") as HTMLInputElement;
const groupSelect_Input = document.getElementById("groupSelect") as HTMLInputElement;
const date_Input = document.getElementById("date") as HTMLInputElement;
const message_Input = document.getElementById("message") as HTMLInputElement;
const AddButton = document.getElementById("AddB") as HTMLButtonElement;
const EditButton = document.getElementById("Edit") as HTMLButtonElement;
const HTML_DATA = document.getElementById("Data") as HTMLElement;
const Box_2 = document.querySelector(".BOX-2") as HTMLElement;
// const Delet_Task= document.getElementById("Delete") as HTMLButtonElement;
let Glabel_Index:number;
let Container_Inputs=document.querySelector(".modal") as HTMLElement;
let Task_m=document.querySelector(".Taskat") as HTMLElement;

const Start_Button= document.getElementById("Start") as HTMLButtonElement;
const Complet_Button= document.getElementById("Complet") as HTMLButtonElement;

const All_Data: Task[] = [];
const stored = localStorage.getItem("All_Data");
if (stored) {
    const parsed: Task[] = JSON.parse(stored);
    All_Data.push(...parsed);
}
Display_Data();

interface Task {
    Task_Name: string;
    group_Select: string;
    date: string;
    message: string;
}

AddButton.addEventListener("click", function() {
    Save_Tasks();

    function Save_Tasks(): void {
    const User_Data: Task = {
        Task_Name: TaskName_Input?.value || "",
        group_Select: groupSelect_Input?.value || "", 
        date: date_Input?.value || "",
        message: message_Input?.value || "",
    };
      All_Data.push(User_Data);
      localStorage.setItem ("All_Data",JSON.stringify(All_Data));
      Display_Data();
    Clear_Form();
    Container_Inputs.classList.remove("show");}
});

function Clear_Form():void{
  TaskName_Input.value="";
  groupSelect_Input.value="";
  date_Input.value="";
  message_Input.value="";
}
if(All_Data.length == 0){
  HTML_DATA.innerHTML +=`<div class="container">
    <div class="row d-flex flex-column align-items-center mt-5">
        <div class="col-md-6 text-center">
            
            <div class="mb-2">
                <i class="fa-regular folder fa-folder-open"></i>
            </div>
            
            <h2 class="h4 empty-state-title mb-1">No tasks yet</h2>
            
            <p class="lead  empty-state-text">Click + to add one</p>
            
        </div>
    </div>
</div>`
}

function Display_Data(): void {
    let Box = "";
    for (let N = 0; N < All_Data.length; N++) {
      let priorityColor = "#6c757d";
    if (All_Data[N].group_Select === "High") priorityColor = "#dc3545";
    else if (All_Data[N].group_Select === "Meduim") priorityColor = "#ffc107";
    else if (All_Data[N].group_Select === "Low") priorityColor = "#198754";

    Task_m.innerHTML += `<p class="Taskat m-0 text-secondary ">${All_Data.length} tasks</p>`;

        Box += `<div class="The-Box-Inside rounded-3 ">
          <div class="All-Data rounded-3 my-3 px-3">
          <div class="spot-and-Buttons d-flex justify-content-between mb-2">
          <div class="Spot-And-indexing d-flex gap-2 mt-3">
            <div class="spot-icon "><i class="fa-solid spot fa-circle"></i></div>
            <h6 class="Box-indexing ">#${N + 1}</h6>
            </div>
            <div class="The-Buttons">
              <button type="button" class="btn Edit-Task-button btn-secondary" data-index="${N}"><i class="fa-solid fa-pen"></i></button>
              <button type="button" class="btn Delet-button btn-primary" data-index="${N}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
          <div class="User-inputs-And-Buttons text-start d-flex flex-column gap-2">
            <div class="Task-name fw-bold">${All_Data[N].Task_Name}</div>
              <p class="Task-Description m-0">${All_Data[N].message}</p>
                <div class="Task-Priority d-flex gap-2"><i class="fa-solid spot2 fa-circle mt-2"></i>${All_Data[N].group_Select}</div>
                <div class="Task-Date-and-time-adding d-flex gap-2 mb-2">
                  <div class="task-date me-2"><i class="fa-regular fa-calendar me-2"></i>${All_Data[N].date}</div>
                  <h6 class="time-adding"><i class="fa-regular fa-clock me-2"></i> just now</h6>
                </div>
                <div class="The-Buttons-2">
                  <button type="button" class="btn btn-danger"><i class="fa-solid fa-play me-2 "></i>Start</button>
                  <button type="button" class="btn btn-success fw-bolder"><i class="fa-solid fa-check me-2 fw-bolder"></i>Complet</button>
                </div>
          </div>
          </div>
        </div>`;
        Glabel_Index=N;
        
    }
       HTML_DATA.innerHTML = Box;
}

HTML_DATA.addEventListener("click", function(e: Event) {
    const target = e.target as HTMLElement;
    const editBtn = target.closest(".Edit-Task-button") as HTMLElement | null;
    if (editBtn) {
        const index = parseInt(editBtn.getAttribute("data-index") || "0");
        Glabel_Index = index;
        Update_Inputs(Glabel_Index);
    }
});

function Update_Inputs(index: number): void {
    if (All_Data[index] === undefined) return;
    TaskName_Input.value = All_Data[index].Task_Name;
    groupSelect_Input.value = All_Data[index].group_Select;
    date_Input.value = All_Data[index].date;
    message_Input.value = All_Data[index].message;
    const modalElement = document.getElementById("exampleModal") as HTMLElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
}

HTML_DATA.addEventListener("click", function(e: Event) {
    const target = e.target as HTMLElement;
    const deleteBtn = target.closest(".Delet-button") as HTMLElement | null;
    if (deleteBtn) {
        const index = parseInt(deleteBtn.getAttribute("data-index") || "0");
        All_Data.splice(index, 1);
        localStorage.setItem("All_Data", JSON.stringify(All_Data));
        Display_Data();
    }
});



export{}