import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import checkIcon from "../assets/icons/checked.svg";

const TaskItem = ({
  task,
  toggleComplete,
  editTaskAndShowModal,
  deleteTask,
}) => {
  const { isDarkMode } = useContext(ThemeContext); //theme

  //class of task item to simplify code
  const taskClass = `${
    isDarkMode ? "text-white" : "text-black"
  } Kanit-Medium uppercase ${task.completed ? "line-through opacity-50" : ""}`;

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
          <span className={taskClass}>{task.title}</span>
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
  isDarkMode: PropTypes.bool,
  editTaskAndShowModal: PropTypes.func,
  deleteTask: PropTypes.func,
  toggleComplete: PropTypes.func,
  task: PropTypes.object,
};
