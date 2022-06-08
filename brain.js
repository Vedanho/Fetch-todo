window.addEventListener("DOMContentLoaded", () => {
  const nameOfTask = document.createElement("h1");
  nameOfTask.textContent = "ToDoList";

  const input_conteiner = document.createElement("div");
  input_conteiner.id = "input_conteiner";

  const input = document.createElement("input");
  input.classList.add("input_1");

  const button_add_task = document.createElement("button");
  button_add_task.textContent = "Добавить";
  button_add_task.classList.add("button_add");

  const header_2 = document.createElement("h2");
  header_2.textContent = "Задачи на сегодня";

  const list = document.createElement("div");
  list.classList.add("list");

  async function getListOfTasks() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    console.log(data);
    render(data);
  }

  async function postNewTask() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input.value, completed: false }),
    });
    const data = await res.json();
    console.log(data);
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  }

  async function patchTask(id, status) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !status }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function render(data) {
    data.forEach((element) => {
      const task_container = document.createElement("div");
      const task_input = document.createElement("input");
      const button_delete = document.createElement("button");
      task_container.classList.add("list_item");

      task_input.type = "checkbox";
      task_container.textContent = element.title;
      button_delete.textContent = "delete";
      button_delete.id = "button_delete";

      task_container.append(button_delete);
      task_container.prepend(task_input);
      list.append(task_container);

      button_delete.addEventListener("click", () => {
        list.removeChild(task_container);
        deleteTask(element.id);
      });

      task_input.addEventListener("change", () => {
        patchTask(element.id, element.completed);
        if (task_input.checked) {
          task_container.style.background = "orange";
        }
        if (!task_input.checked) {
          task_container.style.background = "inherit";
        }
      });
    });

    button_add_task.addEventListener("click", () => {
      const task_container = document.createElement("div");
      const task_input = document.createElement("input");
      const button_delete = document.createElement("button");
      task_container.classList.add("list_item");

      task_input.type = "checkbox";
      task_container.textContent = input.value;
      button_delete.textContent = "delete";
      button_delete.id = "button_delete";
      postNewTask();

      input.value = "";
      task_container.append(button_delete);
      task_container.prepend(task_input);
      list.prepend(task_container);

      button_delete.addEventListener("click", () => {
        list.removeChild(task_container);
        deleteTask();
      });

      task_input.addEventListener("change", () => {
        patchTask();
        if (task_input.checked) {
          task_container.style.background = "orange";
        }
        if (!task_input.checked) {
          task_container.style.background = "inherit";
        }
      });
    });
    input_conteiner.prepend(input, button_add_task);
    document.body.prepend(nameOfTask, input_conteiner, header_2, list);
  }
  getListOfTasks();
});
