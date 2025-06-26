let userTasks = [];

const form = document.querySelector(".input-container");
const titleInput = document.querySelector(".task-title");
const container = document.querySelector(".tasks-list");

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
          <p class = ${task.isCompleted ? "completed" : ""}>${task.title}</p>
        </div>
          <button data-task-id="${task.id}" class="delete-btn">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
      </div>
    `;

    container.innerHTML += taskHTML;
  });
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
