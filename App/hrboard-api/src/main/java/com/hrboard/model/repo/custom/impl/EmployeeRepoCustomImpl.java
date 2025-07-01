package com.hrboard.model.repo.custom.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.hrboard.model.dto.input.EmployeeSearch;
import com.hrboard.model.dto.output.EmployeeDetailsDto;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.entity.Employee_;
import com.hrboard.model.repo.custom.EmployeeRepoCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class EmployeeRepoCustomImpl implements EmployeeRepoCustom {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Page<EmployeeDetailsDto> searchAllEmployeeDetails(EmployeeSearch search, int page, int size) {

		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(EmployeeDetailsDto.class);
		var root = cq.from(Employee.class);

		EmployeeDetailsDto.select(cq, root);
		
		if(null != search) {
			cq.where(search.where(cb, root));
		}
		cq.orderBy(cb.asc(root.get(Employee_.id)));
		var query = em.createQuery(cq);
		query.setFirstResult(page * size);
		query.setMaxResults(size);
		long count = count(search);

		var items = query.getResultList();
		return new PageImpl<EmployeeDetailsDto>(items, PageRequest.of(page, size), count);
	}
	
//	Pagination total item count
	private Long count(EmployeeSearch search) {
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(Long.class);
		var root = cq.from(Employee.class);
		
		cq.select(cb.count(root));
		if(null != search) {
			cq.where(search.where(cb, root));
		}
		return em.createQuery(cq).getSingleResult();
	}

	@Override
	public EmployeeDetailsDto findById(int id) {
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(EmployeeDetailsDto.class);
		var root = cq.from(Employee.class);
		
		EmployeeDetailsDto.select(cq, root);
		cq.where(cb.equal(root.get(Employee_.id), id));
		return em.createQuery(cq).getSingleResult();
	}

}
