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
@Table(name = "feedback")
public class Feedback {


		
		@Id
		@SequenceGenerator(initialValue = 1,name = "feedback_seq",sequenceName = "feedback_sequence",allocationSize = 1)
		@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "feedback_seq")
		private long fb_id;
		@Column(name = "type",nullable = false)
		private String type;
		@Column(name = "description",nullable = false)
		private String description;
		@ManyToOne
		@JoinColumn(name = "addedBy",nullable = false)
		private Employee emp;

	
}
