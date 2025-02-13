import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

const AddTask = ({ hideAddTaskModal, onAddTask, onEditTask, editingTask }) => {
  const [task, setTask] = useState(editingTask ? editingTask.title : "");
  const { isDarkMode } = useContext(ThemeContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
    editingTask
      ? onEditTask({ ...editingTask, title: task })
      : onAddTask({ id: Date.now(), title: task, completed: false });
    setTask("");
  };

  //updating task title while writing in input
  const handleTaskChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  return (
    <div className="flex justify-center w-full h-full fixed top-0 left-0">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-2"></div>
      <div
        className={`${
          isDarkMode
            ? "bg-[#252525] border-white"
            : " bg-white border-[#6c63ff]"
        } border rounded-2xl w-[500px] h-[289px] flex justify-between flex-col items-center p-6 mt-28 z-10`}
      >
        <h2
          className={`Kanit-Medium text-2xl ${
            isDarkMode ? "text-white" : "text-black"
          } uppercase`}
        >
          New Note
        </h2>
        <input
          type="text"
          value={task}
          ref={inputRef}
          onChange={handleTaskChange}
          className={`${
            isDarkMode
              ? "border-white placeholder-[#666666] text-white caret-white"
              : "border-[#6c63ff] placeholder-[#c3c1e5] text-[#6c63ff] caret-[#6c63ff]"
          } bg-transparent  w-[96%] outline-none border py-2 px-4 rounded-md mb-16`}
          placeholder="Input your note..."
        />
        <div className="flex justify-between items-center w-full">
          <button
            onClick={hideAddTaskModal}
            className="Kanit-Medium text-[18px] flex justify-center items-center uppercase text-[#6c63ff] px-[22px] py-[6px] border border-[#6c63ff] focus:bg-[#534cc2] w-[97px] rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={submitTask}
            className="Kanit-Medium text-[18px] flex justify-center items-center uppercase text-white px-[22px] py-[6px] bg-[#6c63ff] focus:bg-[#534cc2] w-[97px] rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;

AddTask.propTypes = {
  hideAddTaskModal: PropTypes.func,
  onAddTask: PropTypes.func,
  onEditTask: PropTypes.func,
  editingTask: PropTypes.object,
};
