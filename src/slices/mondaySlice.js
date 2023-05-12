import { createSlice } from '@reduxjs/toolkit';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

const getInitialTodo = () => {
  // getting todo list
  //    const localTodoList = monday.storage.instance.getItem('todoList');
  const localTodoList = window.localStorage.getItem('todoList');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  //   window.localStorage.setItem('todoList', []);
  monday.storage.instance.setItem('todoList');
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const mondaySlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      //   const todoList = window.localStorage.getItem('todoList');
      const todoList = monday.storage.instance.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        // window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        monday.storage.instance.setItem(
          'todoList',
          JSON.stringify(todoListArr)
        );
        const testData = monday.storage.instance.getItem('todoList');
        console.log(JSON.parse(testData));
      } else {
        // window.localStorage.setItem('todoList', JSON.stringify([
        //     {
        //       ...action.payload,
        //     },
        //   ])
        // );
        monday.storage.instance.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
        const testData = monday.storage.instance.getItem('todoList');
        console.log(testData);
      }
    },
    updateTodo: (state, action) => {
      //   const todoList = window.localStorage.getItem('todoList');
      const todoList = monday.storage.instance.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        console.log(todoListArr);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        // window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        monday.storage.instance.setItem(
          'todoList',
          JSON.stringify(todoListArr)
        );
        console.log(todoListArr);
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      //   const todoList = window.localStorage.getItem('todoList');
      const todoList = monday.storage.instance.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        console.log(todoListArr);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        // window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        monday.storage.instance.setItem(
          'todoList',
          JSON.stringify(todoListArr)
        );
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  mondaySlice.actions;
export default mondaySlice.reducer;
