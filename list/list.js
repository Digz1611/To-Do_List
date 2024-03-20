// Retrieve tasks from localStorage or initialize empty array
const localTodoTasksArray = JSON.parse(localStorage.getItem("localTodoTasks")) || [];

const localTodosContainer = document.getElementById("todos-container");
const localInputEle = document.getElementById("todo-input-ele");
const localAddTaskBtn = document.getElementById("add-task-btn");

const localRemoveTasksBtn = document.getElementById("remove-all-btn");


// Function to update tasks in localStorage
function updateStorageTasks() {
  localStorage.setItem("localTodoTasks", JSON.stringify(localTodoTasksArray));
}

// Function to create todo li elements
function createTodoLiElements(todoArray, sectionType) {
  return todoArray.map((todo, index) => {
    const liElement = document.createElement("li");
    const checkboxEle = document.createElement("input");
    const labelEle = document.createElement("label");

    checkboxEle.setAttribute("type", "checkbox");
    checkboxEle.setAttribute("id", `${sectionType}-chbx-${index}`);
    checkboxEle.checked = todo.checked;

    labelEle.setAttribute("for", `${sectionType}-chbx-${index}`);
    labelEle.textContent = todo.text;

    checkboxEle.addEventListener("click", () => {
      todo.checked = checkboxEle.checked;
      labelEle.classList.toggle("todo-task-done");
      updateStorageTasks();
    });

    liElement.append(checkboxEle, labelEle);
    return liElement;
  });
}

// Display tasks from localStorage on page load
window.addEventListener("load", () => {
  const localTodoLiElements = createTodoLiElements(localTodoTasksArray, "local");
  localTodosContainer.append(...localTodoLiElements);
});

// Event listener to add task in Local section
localAddTaskBtn.addEventListener("click", () => {
  const newTodoInfo = { checked: false, text: localInputEle.value };
  localTodoTasksArray.push(newTodoInfo);

  const todoLiElements = createTodoLiElements(localTodoTasksArray, "local");
  localTodosContainer.replaceChildren(...todoLiElements);

  localInputEle.value = "";
  updateStorageTasks();
});

/* Function to remove tasks but manily for the local storage */
localRemoveTasksBtn.addEventListener("click", () => {
  localStorage.removeItem("localTodoTasks"); // Remove the specific item holding the tasks
  localTodoTasksArray.length = 0; // Clear the tasks array as well
  localTodosContainer.innerHTML = ''; // Clear the UI
});

function createTodoLiElements(todoArray, sectionType) {
  // Sort the todoArray alphabetically by text
  todoArray.sort((a, b) => a.text.localeCompare(b.text));

  return todoArray.map((todo, index) => {
    const liElement = document.createElement("li");
    const checkboxEle = document.createElement("input");
    const labelEle = document.createElement("label");

    checkboxEle.setAttribute("type", "checkbox");
    checkboxEle.setAttribute("id", `${sectionType}-chbx-${index}`);
    checkboxEle.checked = todo.checked;

    labelEle.setAttribute("for", `${sectionType}-chbx-${index}`);
    labelEle.textContent = todo.text;

    checkboxEle.addEventListener("click", () => {
      todo.checked = checkboxEle.checked;
      labelEle.classList.toggle("todo-task-done");
      updateStorageTasks();
    });

    liElement.append(checkboxEle, labelEle);
    return liElement;
  });
}
