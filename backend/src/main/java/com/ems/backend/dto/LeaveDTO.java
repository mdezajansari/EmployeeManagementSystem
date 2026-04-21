package com.ems.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDTO {
    private Long id;
    private String empId; // Mapped to employee specific identifier
    private String name;
    private String leaveType;
    private String department;
    private Integer days;
    private String status;
}
