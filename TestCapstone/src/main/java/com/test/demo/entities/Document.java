package com.test.demo.entities;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="document")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "document_seq",sequenceName = "document_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "document_seq")
	private long doc_id;
	
	@ManyToOne
	@JoinColumn(name="emp_id",nullable = false)
	private Employee employee;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String type;
	
	@Lob
	@Column(length =100000)
	private byte[] data;

}
