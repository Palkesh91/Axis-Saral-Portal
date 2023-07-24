package com.test.demo.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
	
    private String name;
    private String email;
    private String password;   
    private String role;  
    private LocalDate date_of_birth;    
    private String gender;   
    private double salary;  
    private String address;
    private String contact;
}
