const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-check">
            <span>${taskText}</span>
        </div>

        <button class="delete-btn">
            Delete
        </button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    const checkbox = li.querySelector(".task-check");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            taskSpan.classList.add("completed");
        } else {
            taskSpan.classList.remove("completed");
        }

        updateProgress();
    });

    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateProgress();
    });

    updateProgress();
}

function updateProgress() {

    const allTasks =
        document.querySelectorAll(".task-check");

    const completedTasks =
        document.querySelectorAll(".task-check:checked");

    const total = allTasks.length;
    const completed = completedTasks.length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round(
            (completed / total) * 100
        );
    }

    progress.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";
}