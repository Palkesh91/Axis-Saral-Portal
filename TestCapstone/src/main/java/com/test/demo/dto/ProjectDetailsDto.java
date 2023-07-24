package com.test.demo.dto;

import java.time.LocalDate;
import java.util.List;

import com.test.demo.entities.Employee;
import com.test.demo.entities.Project;

import jakarta.annotation.Generated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDetailsDto {
	private Project project;
	private List<Employee> emp_list;

}
