package com.test.demo.entities;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.relational.core.sql.TrueCondition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.PackagePrivate;

@Entity
@Table(name="employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
	
    @Id
    @SequenceGenerator(initialValue = 1,name = "employee_seq",sequenceName = "employee_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "employee_seq")
	private long emp_id;
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String role;
    @Column(nullable = false)
    private LocalDate date_of_birth;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private double salary;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false,unique = true)
    private String contact;
    @Column(nullable = false)
    private String workingStatus;
}
