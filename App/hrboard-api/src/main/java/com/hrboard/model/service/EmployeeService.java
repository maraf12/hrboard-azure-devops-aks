package com.hrboard.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrboard.model.dto.input.EmployeeSearch;
import com.hrboard.model.dto.output.EmployeeDetailsDto;
import com.hrboard.model.dto.output.PageInfo;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.repo.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepo repo;
	
	public PageInfo<EmployeeDetailsDto> findAllEmployees(EmployeeSearch search, int page, int size) {
		return PageInfo.from(repo.searchAllEmployeeDetails(search, page, size));
	}
	
	public EmployeeDetailsDto findById(int id) {
		return repo.findById(id);
	}

	public Employee addNewEmployee(Employee employee) {
		return repo.save(employee);
	}

	public Employee editEmployee(int id, Employee employee) {
		var employeeUpdate = new Employee();
		employeeUpdate.setId(id);
		employeeUpdate.setName(employee.getName());
		employeeUpdate.setEmail(employee.getEmail());
		employeeUpdate.setPhone(employee.getPhone());
		employeeUpdate.setRole(employee.getRole());
		employeeUpdate.setDepartment(employee.getDepartment());
		return repo.save(employeeUpdate);
	}

	public void deleteEmployee(int id) {
		repo.deleteById(id);
	}
}
