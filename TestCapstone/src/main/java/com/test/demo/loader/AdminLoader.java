package com.test.demo.loader;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.test.demo.entities.Employee;
import com.test.demo.repo.EmployeeRepo;

@Component
public class AdminLoader implements CommandLineRunner {
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public void run(String... args) throws Exception{
		String name="admin";
		String email="admin@gmail.com";
		Employee admin=employeeRepo.findAdmin(email);
		if(admin==null) {
			Employee emp=new Employee();
			emp.setName("Admin");
			emp.setEmail(email);
			emp.setPassword(bCryptPasswordEncoder.encode("admin@123"));
			emp.setRole("Admin");
			emp.setGender("Male");
			emp.setDate_of_birth(LocalDate.of(1980, 1, 1));
			emp.setSalary(0);
			emp.setAddress("Admin Address");
			emp.setContact("1231231231");
			emp.setWorkingStatus("Working");
			employeeRepo.save(emp);
		}
	}

}
