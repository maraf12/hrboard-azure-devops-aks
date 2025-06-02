import React from 'react';
import api from '../services/api';

const EmployeeList = ({ data, onDelete }) => {
  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    onDelete();
  };

  return (
    <ul>
      {data.map(emp => (
        <li key={emp._id}>
          {emp.fullName} - {emp.position} - {emp.department}
          <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;