package com.hrboard.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrboard.model.entity.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

}
