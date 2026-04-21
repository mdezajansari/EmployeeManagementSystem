package com.ems.backend.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String email; // In a real app with JWT, we'd extract email from SecurityContext. For now, pass it explicitly or mock it.
    private String oldPassword;
    private String newPassword;
}
