package com.hrboard.model.dto.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.hrboard.model.entity.Department_;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.entity.Employee_;
import com.hrboard.model.entity.Role_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EmployeeSearch(
		String name,
		String position,
		String department,
		String email
		) {

	public Predicate where(CriteriaBuilder cb, Root<Employee> root) {
		
		var params = new ArrayList<Predicate>();
		
		if(StringUtils.hasLength(name)) {
			params.add(cb.like(cb.lower(root.get(Employee_.name)), "%" + name.toLowerCase() + "%"));
		}
		
		if (StringUtils.hasLength(position)) {
			params.add(cb.like(cb.lower(root.get(Employee_.role).get(Role_.title)), "%" + position.toLowerCase() + "%"));
		}
		
		if(StringUtils.hasLength(department)) {
			params.add(cb.like(cb.lower(root.get(Employee_.department).get(Department_.name)), "%" + department.toLowerCase() + "%"));
		}
		
		if(StringUtils.hasLength(email)) {
			params.add(cb.like(cb.lower(root.get(Employee_.email)),  "%" + email.toLowerCase() + "%"));
		}
		
		if(params.isEmpty()) {
			return cb.conjunction();
		}
		
		return cb.or(params.toArray(size -> new Predicate[size]));
	}

}
