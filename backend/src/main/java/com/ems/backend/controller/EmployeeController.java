package com.ems.backend.controller;

import com.ems.backend.entity.Employee;
import com.ems.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/department/{id}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable Long id) {
        return ResponseEntity.ok(employeeRepository.findByDepartmentId(id));
    }
}
