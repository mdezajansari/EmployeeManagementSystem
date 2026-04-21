package com.ems.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SalaryRequest {
    private Long employeeId;
    private Double basicSalary;
    private Double allowances;
    private Double deductions;
    private LocalDate payDate;
}
