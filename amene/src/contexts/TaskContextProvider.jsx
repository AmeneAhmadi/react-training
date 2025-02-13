import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import PropTypes from "prop-types";

//load from local storage
const getInitialTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  return data ? data : [];
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getInitialTasks); //store and maintain tasks
  const [filter, setFilter] = useState("all"); //filter tasks
  const [searchText, setSearchText] = useState(""); //search tasks

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //save to localStorage
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
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
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleComplete,
        filter,
        handleFilterChange,
        searchText,
        handleSearchChange,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskContextProvider.propTypes = {
  children: PropTypes.node,
};
