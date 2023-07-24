package com.test.demo.repo;

import java.util.List;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Employee;



@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	@Query("from Employee where emp_id=?1 and role='Hr'")
	public Employee findHr(long id);
	
	@Query("from Employee where emp_id=?1 and role='Manager'")
	public Employee findManager(long id);
	
	@Query("from Employee where role!='Admin'")
	public List<Employee> findAllEmp();
	
	@Query("from Employee where contact=?1")
	public Employee CheckByContact(String contact);
	
	@Query("from Employee where email=?1")
	public Employee CheckByEmail(String email);
	
	@Query("from Employee where email=?1 and role='Admin'")
	public Employee findAdmin(String email);
	
	@Query("from Employee where role='Manager'")
	public List<Employee> findAllManager();
	
	@Query("from Employee where role='Hr'")
	public List<Employee> findAllHr();
	
	@Query("from Employee where name=?1")
	public Employee findByUsername(String username);
	
	@Query("from Employee where email=?1 and workingStatus='Working'")
	public Employee findByUsermail(String username);
	
	@Query("from Employee where name=?1")
	public Employee findByname(String name);
	
	@Query("from Employee where workingStatus=?1")
	public List<Employee> findByStatus(String status);	
}
