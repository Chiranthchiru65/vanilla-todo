let userTasks = [];
let currentEditingTaskId = null;
let numberOftasksLeft = userTasks.filter((task) => !task.isCompleted);

const form = document.querySelector(".input-container");
const titleInput = document.querySelector(".task-title");
const container = document.querySelector(".tasks-list");
const remainingTodos = document.querySelector(".todo-number");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskTitle = titleInput.value;

  const newTask = {
    id: crypto.randomUUID(),
    title: taskTitle,
    timeCreated: Date.now(),
    isCompleted: false,
  };
  userTasks.push(newTask);

  console.log(userTasks);
  renderTasks();
  titleInput.value = "";
});

function renderTasks() {
  container.innerHTML = "";

  userTasks.forEach((task) => {
    const taskHTML = `
      <div id=${task.id} class="task-container">
        <div class="checkbox-input-child">
          <input data-task-id="${
            task.id
          }" class="isComplete-checkbox"  type="checkbox" ${
      task.isCompleted ? "checked" : ""
    }>
  ${
    task.id === currentEditingTaskId
      ? `<input data-task-id="${task.id}" class="edit-input" value="${task.title}">
   <button data-task-id="${task.id}" class="save-btn">  <i data-lucide="check"></i></button>`
      : `<p data-task-id="${task.id}" class="task-title ${
          task.isCompleted ? "completed" : ""
        }">${task.title}</p>`
  }
        </div>
          <button data-task-id="${task.id}" class="delete-btn">
                  <i data-lucide="x"></i>
          </button>
      </div>
    `;

    container.innerHTML += taskHTML;
  });
  updateRemainingTodos();
  lucide.createIcons();
}

// event delegation
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("isComplete-checkbox")) {
    // that particular checkbox id which you clicked in the tasks list - id will get stored in taskId
    const taskId = event.target.dataset.taskId;
    console.log("this task", taskId);
    const foundTask = userTasks.find((task) => task.id === taskId);
    foundTask.isCompleted = !foundTask.isCompleted;
    console.log("found task objct", foundTask);
    renderTasks();
  } else if (event.target.classList.contains("task-title")) {
    const taskId = event.target.dataset.taskId;
    currentEditingTaskId = taskId;
    renderTasks();
  } else if (
    event.target.classList.contains("save-btn") ||
    event.target.closest(".save-btn")
  ) {
    const button = event.target.closest(".save-btn");
    const taskId = button.dataset.taskId;
    const inputElement = button.parentElement.querySelector(".edit-input");
    const newTitle = inputElement.value;
    const foundTask = userTasks.find((task) => task.id === taskId);
    foundTask.title = newTitle;

    currentEditingTaskId = null;
    renderTasks();
  } else if (
    event.target.classList.contains("delete-btn") ||
    event.target.closest(".delete-btn")
  ) {
    const button = event.target.closest(".delete-btn");
    const taskId = button.dataset.taskId;
    console.log("delete id", taskId);
    userTasks = userTasks.filter((task) => task.id !== taskId);
    renderTasks();
  }
});

container.addEventListener("keypress", function (event) {
  if (event.target.classList.contains("edit-input") && event.key === "Enter") {
    const taskId = event.target.dataset.taskId;
    const newTitle = event.target.value;

    const foundTask = userTasks.find((task) => task.id === taskId);
    foundTask.title = newTitle;

    currentEditingTaskId = null;
    renderTasks();
  }
});

function updateRemainingTodos() {
  const taskLeftCount = userTasks.filter((task) => !task.isCompleted).length;
  remainingTodos.textContent = taskLeftCount;
}
function renderFooter() {}
