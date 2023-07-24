package com.test.demo.dto;

import java.time.LocalDate;

import java.util.List;

import com.test.demo.entities.Project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpProjDto {
	
	private List<Long> emp_ids;
	private long proj_id;
}
