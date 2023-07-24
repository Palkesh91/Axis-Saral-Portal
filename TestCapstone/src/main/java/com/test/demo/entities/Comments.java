package com.test.demo.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "comments")
public class Comments {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "comment_seq",sequenceName = "comment_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "comment_seq")
	private long c_id;
	
	@ManyToOne
	@JoinColumn(name="news_id")
	private NewsFeed news;
	
	@ManyToOne
	@JoinColumn(name = "emp_id")
	private Employee employee;
	
	private String description;
}
