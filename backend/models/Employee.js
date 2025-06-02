const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  hireDate: { type: Date, required: true },
  salary: { type: Number, required: true },
  contractType: {
    type: String,
    enum: ['CDI', 'CDD', 'Freelance', 'Internship'],
    required: true
  },
  performanceNotes: [{
    date: { type: Date, default: Date.now },
    note: String,
    rating: { type: Number, min: 1, max: 5 }
  }]
}, { timestamps: true });
module.exports = mongoose.model('Employee', employeeSchema);