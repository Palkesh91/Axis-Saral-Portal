package com.test.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.demo.entities.Comments;

@Repository
public interface CommentRepo extends JpaRepository<Comments, Long>{
	
	@Query("from Comments where news.n_id=?1")
	public List<Comments> findByNewsId(long newsId);

}
