package com.test.demo.dto;

import java.time.LocalDate;

import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
	
	private String title;
	private String description;
	private long m_id;
	private long hr_id;
	private long stakeholder_id;
	private long owner_id;
	private LocalDate startDate;
	private LocalDate endDate;
	private String status;
	
}
