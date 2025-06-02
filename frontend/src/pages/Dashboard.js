import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import api from '../services/api';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <EmployeeForm onAdd={fetchEmployees} />
      <EmployeeList data={employees} onDelete={fetchEmployees} />
    </div>
  );
};

export default Dashboard;