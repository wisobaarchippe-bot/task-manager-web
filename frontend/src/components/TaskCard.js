import React from "react";

function TaskCard({ task, onUpdateStatus }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status : {task.status}</p>
      <p>Assigné à : {task.assignedTo ? task.assignedTo.name : "Non assigné"}</p>
      <button onClick={() => onUpdateStatus(task._id, "En cours")}>En cours</button>
      <button onClick={() => onUpdateStatus(task._id, "Terminé")}>Terminé</button>
      <button onClick={() => onUpdateStatus(task._id, "Bloqué")}>Bloqué</button>
    </div>
  );
}

export default TaskCard;
