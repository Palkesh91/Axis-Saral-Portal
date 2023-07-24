package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.test.demo.entities.Owner;

@Repository
public interface OwnerRepo extends JpaRepository<Owner, Long>{

}
