package com.test.demo.entities;

import org.hibernate.validator.constraints.Length;

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
@Table(name = "newsfeed")
public class NewsFeed {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "newsfeed_seq",sequenceName = "newsfeed_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "newsfeed_seq")
	private long n_id;
	@Column(name = "title",nullable = false)
	private String title;
	@Column(name = "description",nullable = false,length = 2000)
	private String description;
	@ManyToOne
	@JoinColumn(name = "addedBy",nullable = false)
	private Employee Hr;

}
