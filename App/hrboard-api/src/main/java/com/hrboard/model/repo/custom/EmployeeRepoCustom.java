package com.hrboard.model.repo.custom;

import org.springframework.data.domain.Page;

import com.hrboard.model.dto.input.EmployeeSearch;
import com.hrboard.model.dto.output.EmployeeDetailsDto;

public interface EmployeeRepoCustom {
	
	Page<EmployeeDetailsDto> searchAllEmployeeDetails(EmployeeSearch search, int page, int size);
	
	EmployeeDetailsDto findById(int id);
}
