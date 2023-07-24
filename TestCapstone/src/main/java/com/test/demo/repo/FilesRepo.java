package com.test.demo.repo;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Document;


@Repository
public interface FilesRepo extends JpaRepository<Document, Long> {

	
	@Query("from Document where employee.emp_id=?1")
	public List<Document> findByEmpId(long id);
}


