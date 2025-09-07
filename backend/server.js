const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory "database"
let todos = [
  { id: 1, task: "Finish placement test prep", done: false },
  { id: 2, task: "Revise DSA", done: true },
];

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.done = done;
  res.json(todo);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
