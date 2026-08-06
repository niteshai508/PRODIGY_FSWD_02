const express = require('express');
const Employee = require('../models/Employee');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// GET all employees (Admin only)
router.get('/', isAdmin, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// GET single employee
router.get('/:id', isAuth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found!' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// CREATE employee (Admin only)
router.post('/', isAdmin, async (req, res) => {
  const { name, email, phone, department, position, salary, joinDate } = req.body;
  try {
    const employee = await Employee.create({ name, email, phone, department, position, salary, joinDate });
    res.status(201).json({ message: 'Employee created!', employee });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists!' });
  }
});

// UPDATE employee (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found!' });
    await employee.update(req.body);
    res.json({ message: 'Employee updated!', employee });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// DELETE employee (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found!' });
    await employee.destroy();
    res.json({ message: 'Employee deleted!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = router;