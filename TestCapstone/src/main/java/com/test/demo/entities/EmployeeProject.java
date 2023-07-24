package com.test.demo.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Employee_Project")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeProject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@ManyToOne
	@JoinColumn(name = "emp_id")
	private Employee emp_id;
	@ManyToOne
	@JoinColumn(name = "proj_id")
	private Project proj_id;
	private LocalDate startDate;
	private LocalDate endDate;
	private String status;

}
