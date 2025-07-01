package com.hrboard.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrboard.model.entity.Employee;
import com.hrboard.model.repo.custom.EmployeeRepoCustom;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>, EmployeeRepoCustom {

}
