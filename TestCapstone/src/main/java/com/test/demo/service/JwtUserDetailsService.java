package com.test.demo.service;

import org.springframework.beans.factory.annotation.Autowired;





import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.test.demo.dto.EmployeeDto;
import com.test.demo.entities.Employee;
import com.test.demo.exceptions.AlreadyThere;
import com.test.demo.repo.EmployeeRepo;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<SimpleGrantedAuthority> roles = null;
		Employee user = employeeRepo.findByUsermail(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with mail: " + username);
		}
		roles = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));
		System.out.println("Roles : "+roles);
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				roles);
		//return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
			//	new ArrayList<>());
	}
	

	public Employee save(EmployeeDto user) {
		Employee newUser = new Employee();
		Employee emp1=employeeRepo.CheckByContact(user.getContact());
		if(emp1!=null) {
			throw new AlreadyThere();
		}
		Employee emp2=employeeRepo.CheckByEmail(user.getEmail());
		if(emp2!=null) {
			throw new AlreadyThere();
		}
		newUser.setName(user.getName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setRole(user.getRole());
		newUser.setGender(user.getGender());
		newUser.setSalary(user.getSalary());
		newUser.setDate_of_birth(user.getDate_of_birth());
		newUser.setAddress(user.getAddress());
		newUser.setContact(user.getContact());
		newUser.setWorkingStatus("Working");
		employeeRepo.save(newUser);
		return newUser;
	}

}