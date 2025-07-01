package com.hrboard.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrboard.model.entity.Role;
import com.hrboard.model.repo.RoleRepo;

@Service
public class RoleService {

	@Autowired
	private RoleRepo repo;
	
	public List<Role> getAllRole() {
		return repo.findAll();
	}

	public Role addNewRole(Role role) {
		return repo.save(role);
	}
}
