package com.ems.backend.controller;

import com.ems.backend.dto.LeaveDTO;
import com.ems.backend.entity.Leave;
import com.ems.backend.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {

    @Autowired
    private LeaveRepository leaveRepository;

    @GetMapping
    public ResponseEntity<List<LeaveDTO>> getAllLeaves(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long employeeId) {
        
        List<Leave> leaves;
        if (status != null && employeeId != null) {
            leaves = leaveRepository.findByStatusAndEmployeeId(status, employeeId);
        } else if (status != null) {
            leaves = leaveRepository.findByStatus(status);
        } else if (employeeId != null) {
            leaves = leaveRepository.findByEmployeeId(employeeId);
        } else {
            leaves = leaveRepository.findAll();
        }

        List<LeaveDTO> dtos = leaves.stream().map(this::mapToDTO).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveDTO> updateLeaveStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Leave> optionalLeave = leaveRepository.findById(id);
        if (optionalLeave.isPresent()) {
            Leave leave = optionalLeave.get();
            leave.setStatus(status);
            Leave updatedLeave = leaveRepository.save(leave);
            return ResponseEntity.ok(mapToDTO(updatedLeave));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private LeaveDTO mapToDTO(Leave l) {
        int days = (int) ChronoUnit.DAYS.between(l.getFromDate(), l.getToDate()) + 1;
        String deptName = l.getEmployee().getDepartment() != null ? l.getEmployee().getDepartment().getName() : "N/A";
        
        return LeaveDTO.builder()
                .id(l.getId())
                .empId(l.getEmployee().getName() + l.getEmployee().getId()) // Mocking specific identifier
                .name(l.getEmployee().getName())
                .leaveType(l.getLeaveType())
                .department(deptName)
                .days(days)
                .status(l.getStatus())
                .build();
    }
}
