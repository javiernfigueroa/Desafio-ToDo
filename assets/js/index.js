const addItemBtn = document.getElementById("add-item-btn");
const itemInput = document.getElementById("item-input");
const list = document.getElementById("list");
const totalTaskSpan = document.querySelector(".total-task");
const doneTaskSpan = document.querySelector(".done-task");

const toDoList = [];

addItemBtn.addEventListener("click", function () {
  const newItem = itemInput.value.trim(); // Elimina espacios en blanco al principio y al final
  if (newItem !== "") {
    if (!toDoList.some(task => task.task === newItem)) {
      toDoList.push({ task: newItem, done: false });
      render();
      itemInput.value = "";
    } else {
      window.alert("El item ya está en la lista");
      itemInput.value = "";
    }
  } else {
    window.alert("Por favor, complete el campo para agregar una tarea");
  }
});


function render() {
  let html = "";
  let totalTasks = toDoList.length;
  let doneTasks = 0;

  for (let i = 0; i < totalTasks; i++) {
    const task = toDoList[i].task;
    const done = toDoList[i].done;
    const taskId = i + 1;
    html += `<li class="list-item" data-task-id="${taskId}">
              <span class="id">${taskId}</span>
              <span class="item">${task}</span>
              <input type="checkbox" class="task-checkbox" data-index="${i}" ${
      done ? "checked" : ""
    }>
              <button class="delete-button" data-index="${i}">X</button>
            </li>`;
    if (done) {
      doneTasks++;
    }
  }
  list.innerHTML = html;

  totalTaskSpan.textContent = `Total: ${totalTasks}`;
  doneTaskSpan.textContent = `Realizadas: ${doneTasks}`;

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const index = e.target.getAttribute("data-index");
      deleteTask(index);
    });
  });

  const checkboxes = document.querySelectorAll(".task-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function (e) {
      const index = e.target.getAttribute("data-index");
      toggleTaskStatus(index);
    });
  });
}

function deleteTask(index) {
  toDoList.splice(index, 1);
  render();
}

function toggleTaskStatus(index) {
  toDoList[index].done = !toDoList[index].done;
  render();
}

render();
