package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.test.demo.entities.JobVacancy;



@Repository
public interface JobVacancyRepo extends JpaRepository<JobVacancy, Long>{

}
