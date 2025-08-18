const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");
const input = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect")

//get the element on the screen
let tasks = JSON.parse(localStorage.getItem("tasks"));

//set the element 
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



function renderTasks() {
  taskList.innerHTML = "";
   
  //set priority
  const priorityOrder = { High: 1, Medium: 2, Low: 3 }
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);



  tasks.forEach((taskText, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const btns = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      const newText = prompt("Edit task:", taskText);
      if (newText && newText.trim() !== "") {
        tasks[index] = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btns);
    taskList.appendChild(li);
  });
}

addBtn.onclick = function () {
  const taskText = input.value.trim();
  const priority = prioritySelect.value;


  if (taskText === "" || !priority) return;
  tasks.push({task:taskText, priority:priority});
  saveTasks();
  renderTasks();
  input.value = "";
  prioritySelect.selectIndex = 0;
  prioritySelect.disabled = true;
};

deleteAllBtn.onclick = function () {
  tasks = [];
  saveTasks();
  renderTasks();
};


// enable when some input
input.addEventListener("input", () => {
  prioritySelect.disabled = input.value.trim() === "";
});

// Initial render from localStorage
renderTasks();