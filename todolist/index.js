const addBtn = document.getElementById("addBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const taskList = document.getElementById("taskList");
  const input = document.getElementById("taskInput");

  //get the element on the screen
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  //set the element 
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }



  function renderTasks() {
    taskList.innerHTML = "";                  
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
    if (taskText === "") return;
    tasks.push(taskText);
    saveTasks();
    renderTasks();
    input.value = "";
  };

  deleteAllBtn.onclick = function () {
    tasks = [];
    saveTasks();
    renderTasks();
  };

  // Initial render from localStorage
  renderTasks();