package com.hrboard.model.repo.custom;

import java.util.List;

import com.hrboard.model.dto.output.DepartmentDto;
import com.hrboard.model.dto.output.EmployeeCountDto;

public interface DepartmentRepoCustom  {

	List<DepartmentDto> findAllDepartment();
	
	List<EmployeeCountDto> findEmployeeCountByDepartment(String name);
}
