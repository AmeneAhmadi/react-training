import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import addIcon from "../assets/icons/add.svg";

const TaskList = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, editTask, filter, searchText } =
    useContext(TaskContext);

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
      <div className="flex flex-col justify-center items-center">
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editTaskAndShowModal={editTaskAndShowModal}
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
      {isAddTaskModalOpen && (
        <AddTask
          hideAddTaskModal={() => {
            setIsAddTaskModalOpen(false);
          }}
          onAddTask={(task) => {
            addTask(task);
            setIsAddTaskModalOpen(false);
          }}
          onEditTask={(updateTask) => {
            editTask(updateTask);
            setEditingTask(null);
            setIsAddTaskModalOpen(false);
          }}
          editingTask={editingTask}
        />
      )}
    </>
  );
};
export default TaskList;
