package com.hrboard.model.repo.custom.impl;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.hrboard.model.dto.output.DepartmentDto;
import com.hrboard.model.dto.output.EmployeeCountDto;
import com.hrboard.model.entity.Department;
import com.hrboard.model.entity.Department_;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.entity.Employee_;
import com.hrboard.model.repo.custom.DepartmentRepoCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.JoinType;

@Repository
public class DepartmentRepoCustomImpl implements DepartmentRepoCustom {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<DepartmentDto> findAllDepartment() {

		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(DepartmentDto.class);
		var root = cq.from(Department.class);
		
		cq.multiselect(
				root.get(Department_.id),
				root.get(Department_.name)
				);
		
		return em.createQuery(cq).getResultList();
	}

	@Override
	public List<EmployeeCountDto> findEmployeeCountByDepartment(String name) {
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(EmployeeCountDto.class);
		var root = cq.from(Employee.class);
		
		var departmentJoin = root.join(Employee_.department, JoinType.RIGHT);
		
		cq.multiselect(
				departmentJoin.get(Department_.id),
				departmentJoin.get(Department_.name),
				cb.count(root)
		).groupBy(
				departmentJoin.get(Department_.id),
				departmentJoin.get(Department_.name)
		);
		
		if(StringUtils.hasLength(name)) {
			cq.where(cb.like(cb.lower(departmentJoin.get(Department_.name)), "%" + name.toLowerCase() + "%"));
		}
		return em.createQuery(cq).getResultList();
	}

}
