package com.test.demo.repo;

import java.util.List;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.EmployeeProject;



@Repository
public interface EmpProjectRepo extends JpaRepository<EmployeeProject, Long>{

	@Query("from EmployeeProject where proj_id.proj_id=?1")
	public List<EmployeeProject> findEmpByProjId(long id);
	
	@Query("from EmployeeProject where proj_id.owner.name=?1")
	public List<EmployeeProject> findByOwnerName(String name);
	
	@Query("from EmployeeProject where emp_id.emp_id=?1")
	public List<EmployeeProject> findByEmpId(long id);
	
}