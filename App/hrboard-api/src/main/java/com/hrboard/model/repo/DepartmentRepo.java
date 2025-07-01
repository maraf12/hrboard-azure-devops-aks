package com.hrboard.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrboard.model.entity.Department;
import com.hrboard.model.repo.custom.DepartmentRepoCustom;

public interface DepartmentRepo extends JpaRepository<Department, Integer>, DepartmentRepoCustom {


}
