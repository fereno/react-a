import React from "react";
import {ACTION_TYPE} from "./AppPro";
const ToDo = ({todo, dispatch}) => {
  return (
    <div>
      <span style={{color: `${todo.complete ? "lightgray" : "black"}`}}>
        {todo.name}
      </span>

      <button
        onClick={() =>
          dispatch({type: ACTION_TYPE.TOGGLE, payload: {id: todo.id}})
        }
      >
        toggle
      </button>
      <button
        onClick={() =>
          dispatch({type: ACTION_TYPE.DELETE, payload: {id: todo.id}})
        }
      >
        delete
      </button>
    </div>
  );
};

export default ToDo;
