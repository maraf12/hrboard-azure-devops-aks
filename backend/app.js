const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);
module.exports = app;