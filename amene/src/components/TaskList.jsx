import { useState } from "react";
import PropTypes from "prop-types";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import addIcon from "../assets/icons/add.svg";

const TaskList = (props) => {
  //=======================================================================
  //props
  const { isDarkMode, filter, searchText } = props;
  //=======================================================================
  //states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); //show or hide add task modal
  const [tasks, setTasks] = useState([]); //tasks , this state is used to store and maintain tasks
  const [editingTask, setEditingTask] = useState(null); //edit task, this state is used to edit tasks

  //=======================================================================
  //show or hide add task modal
  const showAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };
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
  //edit task
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    hideAddTaskModal(); //hide add task modal
  };

  const editTaskAndShowModal = (task) => {
    setEditingTask(task);
    showAddTaskModal();
  };

  //=======================================================================
  //delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //=======================================================================
  //toggle complete task
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
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
