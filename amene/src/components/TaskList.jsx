import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import addIcon from "../assets/icons/add.svg";

//load from local storage
const getInitialTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  return data ? data : [];
};

const TaskList = ({ filter, searchText }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); //show or hide add task modal
  const [tasks, setTasks] = useState(getInitialTasks); //this state is used to store and maintain tasks
  const [editingTask, setEditingTask] = useState(null); //this state is used to edit tasks

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //save to localStorage
  }, [tasks]);

  const hideAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    hideAddTaskModal();
  };

  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    hideAddTaskModal();
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //select task to be updated
  const editTaskAndShowModal = (task) => {
    setEditingTask(task);
    setIsAddTaskModalOpen(true);
  };

  //apply filter and search to tasks
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

  return (
    <>
      {/* show to do list */}
      <div className="flex flex-col justify-center items-center">
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              editTaskAndShowModal={editTaskAndShowModal}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
      <div className="self-end p-10 fixed bottom-4">
        <button
          onClick={() => {
            setIsAddTaskModalOpen(true);
          }}
          className="bg-[#6c63ff] p-3 rounded-full relative group hover:bg-[#534cc2] transition-colors duration-300"
        >
          <span className="absolute inset-0 rounded-full border-[2px] border-[#6c63ff] scale-95 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
          <img src={addIcon} alt="add" className="relative z-10" />
        </button>
      </div>

      {/* add to do*/}
      {isAddTaskModalOpen && (
        <AddTask
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

TaskList.propTypes = {
  isDarkMode: PropTypes.bool,
  filter: PropTypes.string,
  searchText: PropTypes.string,
};