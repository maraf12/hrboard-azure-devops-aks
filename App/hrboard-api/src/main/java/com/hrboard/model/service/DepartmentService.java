package com.hrboard.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrboard.model.dto.output.DepartmentDto;
import com.hrboard.model.dto.output.EmployeeCountDto;
import com.hrboard.model.entity.Department;
import com.hrboard.model.repo.DepartmentRepo;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentRepo repo;
	
	public List<DepartmentDto> getDepartmentIDAndName() {
		return repo.findAllDepartment();
	}

	public Department addNewDepartment(Department department) {
		return repo.save(department);
	}

	public Department editDepartment(int id, Department department) {
		var departmentUpdate = new Department();
		departmentUpdate.setId(id);
		departmentUpdate.setName(department.getName());
		return repo.save(departmentUpdate);
	}

	public List<EmployeeCountDto> findEmployeeCountDto(String name) {
		return repo.findEmployeeCountByDepartment(name);
	}

	public void deleteEmployee(int id) {
		repo.deleteById(id);
	}
}
