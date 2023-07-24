package com.test.demo.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "project_seq",sequenceName = "project_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "project_seq")
	private long proj_id;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false)
	private String description;
	@ManyToOne
	@JoinColumn(name = "manager_id",nullable = false)
	private Employee manager;
	@ManyToOne
	@JoinColumn(name = "hr_id",nullable = false)
	private Employee hr;
	@ManyToOne
	@JoinColumn(name="sh_id",nullable = false)
	private StakeHolder stakeHolder;
	@ManyToOne
	@JoinColumn(name="o_id",nullable = false)
	private Owner owner;
	@Column(nullable = false)
	private LocalDate startDate;
	@Column(nullable = false)
	private LocalDate endDate;
	@Column(nullable = false)
	private String status;
	//@OneToMany
	//private List<Employee> employees;	

}
