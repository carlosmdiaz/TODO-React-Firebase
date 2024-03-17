import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

function Todo(props) {
  const { item, toggleComplete, deleteTodo } = props;
  //item.completed.booleanValue
  return (
    <li
      className={
        item._document.data.value.mapValue.fields.completed.booleanValue
          ? style.liComplete
          : style.li
      }
    >
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(item)}
          type="checkbox"
          checked={
            item._document.data.value.mapValue.fields.completed.booleanValue
              ? "checked"
              : ""
          }
        />
        <p
          onClick={() => toggleComplete(item)}
          className={
            item._document.data.value.mapValue.fields.completed.booleanValue
              ? style.textComplete
              : style.text
          }
        >
          {item._document.data.value.mapValue.fields.text.stringValue}
        </p>
      </div>
      <button onClick={() => deleteTodo(item)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
}

export default Todo;
