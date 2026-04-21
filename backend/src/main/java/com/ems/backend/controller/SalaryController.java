package com.ems.backend.controller;

import com.ems.backend.dto.SalaryHistoryDTO;
import com.ems.backend.entity.SalaryHistory;
import com.ems.backend.repository.SalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/salary")
@CrossOrigin(origins = "http://localhost:5173") // Assuming Vite default port
public class SalaryController {

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    @GetMapping
    public ResponseEntity<List<SalaryHistoryDTO>> getSalaryHistory(@RequestParam(required = false) Long employeeId) {
        List<SalaryHistory> history;
        if (employeeId != null) {
            history = salaryHistoryRepository.findByEmployeeId(employeeId);
        } else {
            history = salaryHistoryRepository.findAll();
        }

        List<SalaryHistoryDTO> dtos = history.stream().map(h -> 
            SalaryHistoryDTO.builder()
                .id(h.getId())
                .employeeId(h.getEmployee().getId())
                .empName(h.getEmployee().getName()) // Map to name or a specific format like yousaf222
                .salary(h.getSalary())
                .allowance(h.getAllowance())
                .deduction(h.getDeduction())
                .total(h.getTotal())
                .payDate(h.getPayDate())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<SalaryHistory> addSalary(@RequestBody com.ems.backend.dto.SalaryRequest request) {
        com.ems.backend.entity.Employee employee = new com.ems.backend.entity.Employee();
        employee.setId(request.getEmployeeId()); // Using reference

        Double total = request.getBasicSalary() + request.getAllowances() - request.getDeductions();

        SalaryHistory salaryHistory = SalaryHistory.builder()
                .employee(employee)
                .salary(request.getBasicSalary())
                .allowance(request.getAllowances())
                .deduction(request.getDeductions())
                .total(total)
                .payDate(request.getPayDate())
                .build();

        return ResponseEntity.ok(salaryHistoryRepository.save(salaryHistory));
    }
}
