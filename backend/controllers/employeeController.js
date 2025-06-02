const Employee = require('../models/Employee');
exports.getAllEmployees = async (req, res, next) => {
  try { const employees = await Employee.find(); res.status(200).json(employees); }
  catch (err) { next(err); }
};
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) { next(err); }
};
exports.createEmployee = async (req, res, next) => {
  try {
    const employee = new Employee(req.body);
    await employee.save(); res.status(201).json(employee);
  } catch (err) { next(err); }
};
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) { next(err); }
};
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) { next(err); }
};