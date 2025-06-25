let userTasks = [];

const form = document.querySelector(".input-container");
const titleInput = document.querySelector(".task-title");

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
  const container = document.querySelector(".tasks-list");

  container.innerHTML = "";

  userTasks.forEach((task) => {
    const taskHTML = `
      <div class="task-container">
        <div class="checkbox-input-child">
          <input type="checkbox" ${task.isCompleted ? "checked" : ""}>
          <p>${task.title}</p>
        </div>
        <button class="delete-btn">
         <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg></button>
      </div>
    `;

    container.innerHTML += taskHTML;
  });
}
