package com.test.demo.repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Project;


@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {

	@Query("from Project where status=?1")
	public List<Project> findProjByStatus(String status);
	
}
