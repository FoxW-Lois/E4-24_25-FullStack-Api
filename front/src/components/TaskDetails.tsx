import React, { useEffect, useState } from 'react';
import { fetchTaskById, Task } from '../api/tasks';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const data = await fetchTaskById(id);
        setTask(data);
      }
    };
    loadTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  const handleBack = () => {
    navigate('/tasks');
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Sprint:</strong> {task.sprint}</p>
      <button onClick={handleBack}>Back to Task List</button>
    </div>
  );
};

export default TaskDetails;
