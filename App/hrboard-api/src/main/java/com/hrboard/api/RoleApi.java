package com.hrboard.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrboard.model.entity.Role;
import com.hrboard.model.service.RoleService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/position")
public class RoleApi {

	@Autowired
	private RoleService service;
	
	@GetMapping
	public List<Role> getAllRole() {
		return service.getAllRole();
	}
	
	@PostMapping("/add")
	public ResponseEntity<Role> addNewRole(@RequestBody Role role) {
		var newRole = service.addNewRole(role);
		return ResponseEntity.status(HttpStatus.CREATED).body(newRole);
	}
	
}
