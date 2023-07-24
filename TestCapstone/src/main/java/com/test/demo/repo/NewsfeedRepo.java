package com.test.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.test.demo.entities.NewsFeed;

@Repository
public interface NewsfeedRepo extends JpaRepository<NewsFeed, Long>{

}
