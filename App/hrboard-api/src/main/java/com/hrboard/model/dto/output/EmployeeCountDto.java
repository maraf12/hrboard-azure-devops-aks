package com.hrboard.model.dto.output;

public record EmployeeCountDto(
		int id,
		String departmentName,
		Long employeeCount) {
}
