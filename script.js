const input = document.getElementById("todo-input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todo-list");
const countSpan = document.getElementById("count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on startup
window.onload = () => {
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  updateCount();
};

// Add Task
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, completed: false });
  saveTasks();

  addTaskToDOM(text, false);

  input.value = "";
  updateCount();
}

// Add task to UI
function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  li.className = "todo-item";

  const taskText = document.createElement("span");
  taskText.textContent = text;
  if (completed) taskText.classList.add("completed");

  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");
    toggleStatus(text);
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";

  removeBtn.addEventListener("click", () => {
    li.style.transform = "scale(0)";
    setTimeout(() => {
      li.remove();
      deleteTask(text);
    }, 300);
  });

  li.appendChild(taskText);
  li.appendChild(removeBtn);
  list.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task status
function toggleStatus(text) {
  tasks = tasks.map(task =>
    task.text === text ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
}

// Delete task
function deleteTask(text) {
  tasks = tasks.filter(task => task.text !== text);
  saveTasks();
  updateCount();
}

// Update task count
function updateCount() {
  countSpan.textContent = tasks.length;
}
