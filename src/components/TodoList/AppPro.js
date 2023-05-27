import React, {useEffect, useReducer, useState} from "react";
import ToDo from "./ToDo";
export const ACTION_TYPE = {ADD: "add", TOGGLE: "toggle", DELETE: "delete"};

const todoReducer = (todoList, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
      return [...todoList, newNameToDo(action.payload.name)];
    case ACTION_TYPE.TOGGLE:
      return todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete};
        }
        return todo;
      });
    case ACTION_TYPE.DELETE:
      return todoList.filter((todo) => todo.id !== action.payload.id);
  }
};

const newNameToDo = (newName) => {
  return {id: Date.now(), name: newName, complete: false};
};
const AppPro = () => {
  const [todoList, dispatchTodo] = useReducer(todoReducer, []);
  const [nameToDo, setNameToDo] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (nameToDo !== "") {
      dispatchTodo({
        type: ACTION_TYPE.ADD,
        payload: {name: nameToDo},
      });
      setNameToDo("");
    }
  };
  const onchangeHandler = (event) => {
    setNameToDo(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={nameToDo} onChange={onchangeHandler} />
        <button type="submit">insert</button>
      </form>
      {todoList.map((todo) => (
        <ToDo key={todo.id} todo={todo} dispatch={dispatchTodo} />
      ))}
    </div>
  );
};

export default AppPro;
