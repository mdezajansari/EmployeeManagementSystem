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
public class SalaryHistoryDTO {
    private Long id;
    private Long employeeId;
    private String empName; // Or whatever string you use for empId in frontend
    private Double salary;
    private Double allowance;
    private Double deduction;
    private Double total;
    private LocalDate payDate;
}
