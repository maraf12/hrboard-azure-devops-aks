package com.hrboard.model.dto.output;

import java.math.BigDecimal;

import com.hrboard.model.entity.Department_;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.entity.Employee_;
import com.hrboard.model.entity.Role_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record EmployeeDetailsDto(
		int id,
		String name,
		String position,
		String department,
		String email,
		String phone,
		BigDecimal salary) {

	public static void select(CriteriaQuery<EmployeeDetailsDto> cq, Root<Employee> root) {
		cq.multiselect(
				root.get(Employee_.id),
				root.get(Employee_.name),
				root.get(Employee_.role).get(Role_.title),
				root.get(Employee_.department).get(Department_.name),
				root.get(Employee_.email),
				root.get(Employee_.phone),
				root.get(Employee_.role).get(Role_.salary)
				);
	}
}
