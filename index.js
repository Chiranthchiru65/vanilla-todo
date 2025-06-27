let userTasks = [];
let currentEditingTaskId = null;
let isDark = false;

const form = document.querySelector(".input-container");
const titleInput = document.querySelector(".task-title");
const container = document.querySelector(".tasks-list");
const remainingTodos = document.querySelector(".todo-number");
const themeBtn = document.querySelector(".light-dark");
const sortSelect = document.querySelector("#sort-options");

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
  saveTasksToStorage();
  titleInput.value = "";
});

function renderTasks() {
  container.innerHTML = "";

  userTasks.forEach((task) => {
    const taskHTML = `
     <li id=${task.id} class="task-container">
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
     </li>
   `;

    container.innerHTML += taskHTML;
  });
  updateRemainingTodos();
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
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
    userTasks.sort((a, b) => a.isCompleted - b.isCompleted);
    renderTasks();
    saveTasksToStorage();
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
    saveTasksToStorage();
  } else if (
    event.target.classList.contains("delete-btn") ||
    event.target.closest(".delete-btn")
  ) {
    const button = event.target.closest(".delete-btn");
    const taskId = button.dataset.taskId;
    console.log("delete id", taskId);
    userTasks = userTasks.filter((task) => task.id !== taskId);
    renderTasks();
    saveTasksToStorage();
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
    saveTasksToStorage();
  }
});

function updateRemainingTodos() {
  const taskLeftCount = userTasks.filter((task) => !task.isCompleted).length;
  remainingTodos.textContent = taskLeftCount;
}

themeBtn.addEventListener("click", function () {
  isDark = !isDark;

  if (isDark) {
    document.body.className = "dark";
  } else {
    document.body.className = "light";
  }

  updateThemeIcon();
  saveTasksToStorage();
});

function updateThemeIcon() {
  const iconContainer = themeBtn.querySelector("i");
  iconContainer.setAttribute("data-lucide", isDark ? "sun" : "moon");
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// select sort options
sortSelect.addEventListener("change", function (event) {
  const sortOption = event.target.value;

  if (sortOption === "alphabetical") {
    userTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "recent") {
    userTasks.sort((a, b) => b.timeCreated - a.timeCreated);
  } else if (sortOption === "") {
    userTasks.sort((a, b) => a.timeCreated - b.timeCreated);
  }
  saveTasksToStorage();
  renderTasks();
});

function loadTasksFromStorage() {
  const savedTasks = localStorage.getItem("todoTasks");
  const storedIsDark = localStorage.getItem("isDarkTheme");

  if (savedTasks) {
    userTasks = JSON.parse(savedTasks);
    renderTasks();
  }

  if (storedIsDark !== null) {
    isDark = JSON.parse(storedIsDark);
  }

  if (isDark) {
    document.body.className = "dark";
  } else {
    document.body.className = "light";
  }
  updateThemeIcon();
}

loadTasksFromStorage();

// save task after every change
function saveTasksToStorage() {
  localStorage.setItem("todoTasks", JSON.stringify(userTasks));
  localStorage.setItem("isDarkTheme", JSON.stringify(isDark));
}
