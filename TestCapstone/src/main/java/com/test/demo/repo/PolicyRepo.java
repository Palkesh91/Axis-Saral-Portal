package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Policies;

@Repository
public interface PolicyRepo extends JpaRepository<Policies, Long>{

}
