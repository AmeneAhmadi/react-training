import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import addIcon from "../assets/icons/add.svg";

//=======================================================================
//load from local storage
const getInitialTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  return data ? data : [];
};
//=======================================================================

const TaskList = ({ isDarkMode, filter, searchText }) => {
  //=======================================================================
  //states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); //show or hide add task modal
  const [tasks, setTasks] = useState(getInitialTasks); //tasks , this state is used to store and maintain tasks
  const [editingTask, setEditingTask] = useState(null); //edit task, this state is used to edit tasks

  //=======================================================================
  //save to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //=======================================================================
  //show add task modal
  const showAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  //hide add task modal
  const hideAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  //=======================================================================
  //add task
  const addTask = (task) => {
    setTasks([...tasks, task]);
    hideAddTaskModal(); //hide add task modal
  };

  //=======================================================================
  //edit tasks after getting edited task from AddTask modal
  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    hideAddTaskModal(); //hide add task modal
  };

  //=======================================================================
  //select the task and show modal to edit it when edit button clicked
  const editTaskAndShowModal = (task) => {
    setEditingTask(task);
    showAddTaskModal();
  };

  //=======================================================================
  //delete task
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  //=======================================================================
  //toggle complete task
  const toggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  //=======================================================================
  const filteredTasks = tasks.filter((task) => {
    const filterMatchedTasks =
      filter === "complete"
        ? task.completed
        : filter === "incomplete"
        ? !task.completed
        : true;

    const searchMatchedTasks = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return filterMatchedTasks && searchMatchedTasks;
  });
  
  //=======================================================================

  return (
    <>
      {/* show to do list */}
      <div className="flex flex-col justify-center items-center">
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isDarkMode={isDarkMode}
              toggleComplete={toggleComplete}
              editTaskAndShowModal={editTaskAndShowModal}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
      <div className="self-end p-10 fixed bottom-4">
        <button
          onClick={showAddTaskModal}
          className="bg-[#6c63ff] p-3 rounded-full relative group hover:bg-[#534cc2] transition-colors duration-300"
        >
          <span className="absolute inset-0 rounded-full border-[2px] border-[#6c63ff] scale-95 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
          <img src={addIcon} alt="add" className="relative z-10" />
        </button>
      </div>

      {/* add to do */}
      {isAddTaskModalOpen && (
        <AddTask
          isDarkMode={isDarkMode}
          hideAddTaskModal={hideAddTaskModal}
          onAddTask={addTask}
          onEditTask={editTask}
          editingTask={editingTask}
        />
      )}
    </>
  );
};
export default TaskList;

//=======================================================================
//props types
TaskList.propTypes = {
  isDarkMode: PropTypes.bool,
  filter: PropTypes.string,
  searchText: PropTypes.string,
};
