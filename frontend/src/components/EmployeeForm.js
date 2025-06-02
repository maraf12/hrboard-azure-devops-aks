import React, { useState } from 'react';
import api from '../services/api';

const EmployeeForm = ({ onAdd }) => {
  const [form, setForm] = useState({ fullName: '', position: '', department: '', hireDate: '', salary: '', contractType: 'CDI' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/employees', form);
    setForm({ fullName: '', position: '', department: '', hireDate: '', salary: '', contractType: 'CDI' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
      <input name="hireDate" type="date" value={form.hireDate} onChange={handleChange} required />
      <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} required />
      <select name="contractType" value={form.contractType} onChange={handleChange}>
        <option value="CDI">CDI</option>
        <option value="CDD">CDD</option>
        <option value="Freelance">Freelance</option>
        <option value="Internship">Internship</option>
      </select>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;