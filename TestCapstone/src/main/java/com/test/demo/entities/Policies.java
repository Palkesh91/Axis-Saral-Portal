package com.test.demo.entities;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Lob;

import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Policies {
	
	@Id
	@SequenceGenerator(initialValue = 1,name = "policy_seq",sequenceName = "policy_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "policy_seq")
	private long py_id;
	
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String type;
	
	@Lob
	@Column(length =100000)
	private byte[] data;

}