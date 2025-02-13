import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { TaskContext } from "../contexts/TaskContext";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import checkIcon from "../assets/icons/checked.svg";

const TaskItem = ({ task, editTaskAndShowModal }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { deleteTask, toggleComplete } = useContext(TaskContext);

  return (
    <li key={task.id}>
      <div className="border-b py-4 border-[#6c63ff] w-[525px] flex justify-between items-center">
        <button
          onClick={() => toggleComplete(task.id)}
          className="flex gap-3 items-center cursor-pointer"
        >
          <div
            className={`border border-[#6c63ff] rounded-sm w-[26px] h-[26px] flex justify-center items-center ${
              task.completed ? "bg-[#6c63ff]" : ""
            }`}
          >
            {task.completed && (
              <img className="mb-[2px]" src={checkIcon} alt="checked" />
            )}
          </div>
          <span
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } Kanit-Medium uppercase ${
              task.completed ? "line-through opacity-50" : ""
            }`}
          >
            {task.title}
          </span>
        </button>
        <div className="flex gap-2 items-center me-1">
          <IconButton
            onClick={() => editTaskAndShowModal(task)}
            icon="/icons/edit.svg"
            hoverIcon="/icons/edit-violet.svg"
            altText="edit"
          />
          <IconButton
            onClick={() => deleteTask(task.id)}
            icon="/icons/trash.svg"
            hoverIcon="/icons/trash-red.svg"
            altText="delete"
          />
        </div>
      </div>
    </li>
  );
};
export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object,
  editTaskAndShowModal: PropTypes.func,
};
