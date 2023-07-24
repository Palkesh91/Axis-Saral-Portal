package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long>{

}
