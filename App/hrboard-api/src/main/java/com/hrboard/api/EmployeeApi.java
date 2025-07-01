package com.hrboard.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrboard.model.dto.input.EmployeeSearch;
import com.hrboard.model.dto.output.EmployeeDetailsDto;
import com.hrboard.model.dto.output.PageInfo;
import com.hrboard.model.entity.Employee;
import com.hrboard.model.service.EmployeeService;

@RestController
@RequestMapping("/api/employee")
public class EmployeeApi {

	@Autowired
	private EmployeeService service;

	@GetMapping("/search")
	public PageInfo<EmployeeDetailsDto> getAllEmployees(EmployeeSearch search,
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "10") int size) {
		System.out.println(search);
		return service.findAllEmployees(search, page, size);
	}

	@GetMapping("/{id}")
	public EmployeeDetailsDto findById(@PathVariable int id) {
		return service.findById(id);
	}

	@PostMapping("/add")
	public ResponseEntity<Employee> addNewEmployee(@RequestBody Employee employee) {
		var entity = service.addNewEmployee(employee);
		return ResponseEntity.status(HttpStatus.CREATED).body(entity);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Map<String, Object>> editEmployee(@PathVariable int id, @RequestBody Employee employee) {
		var entity = service.editEmployee(id, employee);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Employee updated successfully");
		response.put("employeeId", entity.getId());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
		service.deleteEmployee(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
