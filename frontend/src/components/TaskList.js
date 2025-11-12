import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdateStatus={updateStatus} />
      ))}
    </div>
  );
}

export default TaskList;
