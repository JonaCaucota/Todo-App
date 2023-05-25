import { Todo } from '../todos/models/todo.model';

export const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'pending',
};

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del realidad'),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log(state);
  console.log('InitStore :)');
};

const loadStore = () => {
  if (localStorage.getItem('state')) {
    console.log(localStorage.getItem('state'));
  } else {
    return;
  }

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateTodoStore = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done === true);
    case Filters.Pending:
      return state.todos.filter((todo) => todo.done === false);
    default:
      throw new Error(`Option ${filter} ist not valid.`);
      break;
  }
};

const addTodo = (description) => {
  if (!description) {
    throw new Error('Description is required');
  }

  saveStateTodoStore();

  state.todos.push(new Todo(description));
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateTodoStore();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
};

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateTodoStore();
};

const getCurrentFilter = () => {
  return state.filter;
};
export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
