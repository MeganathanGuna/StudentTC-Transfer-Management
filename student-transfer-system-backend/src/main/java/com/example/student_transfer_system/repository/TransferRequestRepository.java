package com.example.student_transfer_system.repository;

import com.example.student_transfer_system.entity.TransferRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransferRequestRepository extends JpaRepository<TransferRequest, Long> {
    List<TransferRequest> findByTargetSchool(String targetSchool);
    List<TransferRequest> findByCurrentSchoolAndStatus(String currentSchool, String status);
    List<TransferRequest> findByStudentId(Long studentId);
}
