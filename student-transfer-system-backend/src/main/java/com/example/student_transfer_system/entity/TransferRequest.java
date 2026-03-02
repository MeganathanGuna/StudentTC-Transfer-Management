package com.example.student_transfer_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Data
public class TransferRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long studentId;
    private String currentSchool;
    private String targetSchool;
    private String reason;
    private String status = "PENDING"; // PENDING, INSPECT, APPROVED, REJECTED
    private String remarks;

    @Transient
    private String studentName;

    @Transient
    private String regId;
}
