const API_URL =
  "https://api.qoddi.com/push/?key=8u739fiwo4ngxhd2erqc1stzblyj5vpka6m";

async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
              <input type="checkbox" ${
                todo.completed ? "checked" : ""
              } onchange="toggleTodo(${todo.id})">
              <span>${todo.text}</span>
              <button onclick="deleteTodo(${todo.id})">Delete</button>
          `;
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text) {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (response.ok) {
      input.value = "";
      fetchTodos();
    }
  }
}

async function toggleTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
  });
  if (response.ok) {
    fetchTodos();
  }
}

async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    fetchTodos();
  }
}

fetchTodos();
