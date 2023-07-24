package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.test.demo.entities.StakeHolder;



@Repository
public interface StakeHolderRepo extends JpaRepository<StakeHolder, Long> {

}
