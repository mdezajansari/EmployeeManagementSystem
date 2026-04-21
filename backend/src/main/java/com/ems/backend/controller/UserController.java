package com.ems.backend.controller;

import com.ems.backend.entity.Employee;
import com.ems.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.ems.backend.entity.User;
import com.ems.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ems.backend.dto.LeaveDTO;
import com.ems.backend.dto.SalaryHistoryDTO;
import com.ems.backend.entity.Leave;
import com.ems.backend.entity.SalaryHistory;
import com.ems.backend.repository.LeaveRepository;
import com.ems.backend.repository.SalaryHistoryRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    private Long getLoggedInEmployeeId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) auth.getPrincipal()).getUsername();
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Optional<Employee> emp = employeeRepository.findByUserId(userOptional.get().getId());
            if (emp.isPresent()) {
                return emp.get().getId();
            }
        }
        return null;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) auth.getPrincipal()).getUsername();
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Optional<Employee> employeeOpt = employeeRepository.findByUserId(userOptional.get().getId());
            if (employeeOpt.isPresent()) {
                return ResponseEntity.ok(employeeOpt.get());
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveDTO>> getUserLeaves() {
        Long empId = getLoggedInEmployeeId();
        if (empId == null) return ResponseEntity.status(403).build();

        List<Leave> leaves = leaveRepository.findByEmployeeId(empId);
        List<LeaveDTO> dtos = leaves.stream().map(l -> {
            int days = (int) ChronoUnit.DAYS.between(l.getFromDate(), l.getToDate()) + 1;
            String deptName = l.getEmployee().getDepartment() != null ? l.getEmployee().getDepartment().getName() : "N/A";
            return LeaveDTO.builder()
                    .id(l.getId())
                    .empId(l.getEmployee().getName() + l.getEmployee().getId())
                    .name(l.getEmployee().getName())
                    .leaveType(l.getLeaveType())
                    .department(deptName)
                    .days(days)
                    .status(l.getStatus())
                    .build();
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/salary")
    public ResponseEntity<List<SalaryHistoryDTO>> getUserSalary() {
        Long empId = getLoggedInEmployeeId();
        if (empId == null) return ResponseEntity.status(403).build();

        List<SalaryHistory> history = salaryHistoryRepository.findByEmployeeId(empId);
        List<SalaryHistoryDTO> dtos = history.stream().map(h -> 
            SalaryHistoryDTO.builder()
                .id(h.getId())
                .employeeId(h.getEmployee().getId())
                .empName(h.getEmployee().getName())
                .salary(h.getSalary())
                .allowance(h.getAllowance())
                .deduction(h.getDeduction())
                .total(h.getTotal())
                .payDate(h.getPayDate())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
