package com.test.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="JobVacancy")
@AllArgsConstructor
@NoArgsConstructor
public class JobVacancy {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "jobs_seq",sequenceName = "jobs_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "jobs_seq")
	private long job_id;
	@Column(name="job_role",nullable = false)
	private String jobRole;
	@Column(name="job_desc",nullable = false)
	private String description;
	@Column(name = "vacancies",nullable = false)
	private int vacancies;
	@ManyToOne
	@JoinColumn(name = "addedBy",nullable = false)
	private Employee Hr;


}
